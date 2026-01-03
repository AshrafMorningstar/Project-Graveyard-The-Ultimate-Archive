#!/usr/bin/env bash
/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

set -e
cd "$(dirname "$0")/../runtime/py_bindings"
maturin build --release -o target/wheels
