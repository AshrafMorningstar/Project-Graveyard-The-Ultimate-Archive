/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Composition DSL — YAML + validation rules

This DSL (called `twin-compose`) wires modules into a digital twin instance. It is intentionally declarative and small.

```yaml
# twin-compose v1.0
twin_id: "plant-001:conveyor-cell-A"
description: "Conveyor subsystem + motor + camera sensor"
version: "1.0.0"
metadata:
  owner: "manufacturing-sme@acme.example"
  environment: "staging"

# global runtime options
runtime:
  backend: gpu # gpu | cpu | wasm
  precision: mixed # fp32 | fp16 | mixed
  max_latency_ms: 100

# data sources and alignment
sources:
  - id: "motor01_ts"
    type: timeseries
    connector: "kafka://telemetry/motor01"
    schema: "telemetry.timeseries.v1"
    transforms:
      - filter: { type: "lowpass", cutoff_hz: 50 }
      - resample: { rate_hz: 200 }
  - id: "belt_cam"
    type: video
    connector: "rtsp://edgecam-7/stream"
    schema: "telemetry.video.v1"
    transforms:
      - frame_skip: 2

# model graph: nodes executed in order, can be differentiable
graph:
  - id: "motor_model"
    type: model
    model_ref: "oci://registry.example/models/motor_surrogate:1.2.0"
    inputs: ["motor01_ts"]
    outputs: ["motor_state"]
    constraints:
      - safety: { max_temp_c: 90 }
  - id: "vision_pose"
    type: model
    model_ref: "oci://registry.example/models/pose_estimator:latest"
    inputs: ["belt_cam"]
    outputs: ["pose"]
  - id: "system_integrator"
    type: integrator
    impl: "twincore/integrator:0.1.0"
    inputs: ["motor_state", "pose"]
    outputs: ["estimated_load"]
  - id: "controller"
    type: controller
    impl: "oci://registry.example/controllers/mpc:3.0.0"
    inputs: ["estimated_load"]
    outputs: ["control_signal"]
    deployment:
      rollout_strategy: "shadow"
      shadow_duration_minutes: 60
      safety_thresholds:
        max_deviation_pct: 5

# monitoring & metrics
monitoring:
  traces: true
  metrics:
    - name: "throughput"
      expression: "count(passed_items, 1m)"
  alerts:
    - name: "high_temp"
      condition: "motor_state.temperature > 85"
      severity: critical

# provenance & signing
provenance:
  require_signatures: true
  allowed_signers:
    - "org:acme"
    - "team:control-systems"

# runtime policies
policies:
  isolation: wasm # use wasm sandbox for third-party models
  resource_budget:
    gpu_mem_mb: 4096
    cpu_cores: 2
```

### Basic validation rules (implementable quickly)

- `twin_id`: required, must match regex `^[a-z0-9\-_:]+$`.
- Every `sources[].id` must be unique.
- All `graph[].inputs` must reference an existing `sources[].id` or `graph[].outputs` defined earlier.
- `runtime.backend` must be one of `{gpu,cpu,wasm}`.
- If `provenance.require_signatures: true`, `provenance.allowed_signers` must be non-empty.
- `policies.resource_budget` must be within cluster maximums (to be validated at deploy time).
