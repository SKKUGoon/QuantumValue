# REXCEL

Creating Excel's Utility API with Rust + WASM

## 1. How to use it in project?

The following will create a `./pkg` directory with `*.wasm` build file.

```bash
wasm-pack build --target web
wasm-pack test --node
```

1. Copy the entire `./pkg` file into your project's directory tree
  * For example, if you are using svelte-kit copy the whole `pkg` directory into `./src/lib` folder.
2. Call the wasm by using `import * as wasm from $lib/pkg` script.

## 2. WASM support pages

* Regarding `wasm-test`. [Testing](https://rustwasm.github.io/wasm-bindgen/wasm-bindgen-test/usage.html).
  * Test wasm functions uing `wasm-pack test --node`.

* Regarding JsValues for Vec and Arrays in Rust. [JsValue](https://docs.rs/wasm-bindgen/latest/wasm_bindgen/struct.JsValue.html#method.from_serde).

* How to handle not-Copyable data types. [Cloning](https://rustwasm.github.io/wasm-bindgen/reference/attributes/on-rust-exports/getter_with_clone.html).