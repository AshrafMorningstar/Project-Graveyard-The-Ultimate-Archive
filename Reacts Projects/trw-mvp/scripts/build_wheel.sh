#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/../runtime/py_bindings"
maturin build --release -o target/wheels
