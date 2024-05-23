use crate::cell;

pub fn address_to_r1c1(addr: &str) {
    let chars = addr.chars();
    let mut column = 0isize;
    let mut row = 0isize;

    // Cell address contains 2 parts
    for c in chars {
        if c.is_ascii_digit() {
            row = row * 10 + (c as usize - '0' as usize) as isize;
        } else if c.is_ascii_alphabetic() {
            column = column * 26 + (c.to_ascii_uppercase() as usize - 'A' as usize) as isize + 1;
        }
    }

    if row - 1 < 0 || column - 1 < 0 {
        // Error
    }
}

pub fn r1c1_to_address(row: u32, col: u32) {}
