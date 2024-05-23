use std::str::FromStr;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Debug, Default)]
pub struct Cell {
    pub row: u32,
    pub column: u32,

    #[wasm_bindgen(getter_with_clone)]
    pub sheet: Option<String>,
}

impl PartialEq for Cell {
    fn eq(&self, other: &Self) -> bool {
        self.row == other.row && self.column == other.column
    }
}

// impl FromStr for Cell {
//     fn from_str(s: &str) -> Result<Self, Self::Err> {
//         const SHEET_DIVIDE: &str = "!";

//         if s.contains(SHEET_DIVIDE) {
//             // Parse address with sheet
//             let addr_component: Vec<&str> = s.split(SHEET_DIVIDE).collect();

//             // Create cells
//             // let mut cell =
//         }
//     }
// }
