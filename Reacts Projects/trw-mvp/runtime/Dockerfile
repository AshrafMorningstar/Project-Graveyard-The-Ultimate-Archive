FROM rust:1.70 as builder
WORKDIR /workspace
COPY . .
RUN cargo build --release -p runtime_core

FROM debian:bookworm-slim
COPY --from=builder /workspace/target/release/libruntime_core.so /usr/local/lib/
CMD ["/bin/bash"]
