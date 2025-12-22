/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# TITAN Reality Weaver — MVP Scaffold (Runnable)

This archive contains a runnable scaffold for the TITAN Reality Weaver MVP.

Contents:
- `runtime/` — Rust workspace with `runtime_core` (wasmtime stub) and `py_bindings` (pyo3), maturin-ready.
- `server/` — FastAPI OpenAPI server implementing the API spec with stubs. Includes Dockerfile.
- `.github/workflows/ci.yml` — GitHub Actions workflow to build Rust + Python wheel and run tests.
- `frontend/` — Three.js viewer starter.
- `openapi.yaml` — The OpenAPI spec used by the FastAPI server.

How to use (local dev):
1. Build Python bindings (requires Rust toolchain and maturin):
   ```bash
   cd runtime/py_bindings
   ./../../scripts/build_wheel.sh
   pip install target/wheels/*.whl
   ```

2. Run the FastAPI server (Python 3.10+ recommended):
   ```bash
   cd server
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn server.main:app --reload --port 8080
   ```

3. Open frontend:
   ```bash
   cd frontend
   npx http-server -c-1 .
   # then visit http://localhost:8080 (or open index.html directly)
   ```

This scaffold is intended for rapid prototyping. Replace stubs with production-grade logic as needed.
