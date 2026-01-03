/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

FROM rust:1.70 as builder
WORKDIR /workspace
COPY . .
RUN cargo build --release -p runtime_core

FROM debian:bookworm-slim
COPY --from=builder /workspace/target/release/libruntime_core.so /usr/local/lib/
CMD ["/bin/bash"]
