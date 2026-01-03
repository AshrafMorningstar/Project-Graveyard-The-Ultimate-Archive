/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

use pyo3::prelude::*;
use runtime_core::WasmModel;
use anyhow::Result;

/// Python bindings exposing a minimal API
#[pymodule]
fn trw_runtime(_py: Python, m: &PyModule) -> PyResult<()> {
    #[pyfn(m, "load_model")]
    fn load_model_py(_py: Python, wasm_bytes: Vec<u8>) -> PyResult<usize> {
        // In production you would manage model handles; here return a dummy handle
        // For demo, we would store model in global registry (omitted)
        Ok(1usize)
    }

    #[pyfn(m, "infer")]
    fn infer_py(_py: Python, model_handle: usize, input: Vec<f32>) -> PyResult<Vec<f32>> {
        // lookup model by handle...
        // For scaffold: instantiate a WasmModel directly (not efficient)
        let model = WasmModel::new(&[]).map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(format!("{}", e)))?;
        let out = model.infer(&input).map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(format!("{}", e)))?;
        Ok(out)
    }

    #[pyfn(m, "compute_gradients")]
    fn compute_gradients_py(_py: Python, model_handle: usize, input: Vec<f32>, loss_string: String) -> PyResult<Vec<f32>> {
        let model = WasmModel::new(&[]).map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(format!("{}", e)))?;
        let grads = model.compute_gradients(&input, &loss_string).map_err(|e| pyo3::exceptions::PyRuntimeError::new_err(format!("{}", e)))?;
        Ok(grads)
    }

    Ok(())
}
