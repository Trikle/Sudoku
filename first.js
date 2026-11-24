import {Table, RowLength, Numbers, shuffle, drawTable} from "./shered.js";

console.time('filled');

// Уже использованные числа в строках / столбцах / блоках 3×3
const Rows = Array.from({ length: RowLength }, () => new Set());
const Cols = Array.from({ length: RowLength }, () => new Set());
const Cells3x3 = Array.from({ length: RowLength }, () => new Set());

function boxIndex(row, col) {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

function availableNumbers(row, col, cell) {
    return Numbers.filter(
        (num) =>
            !Rows[row].has(num) &&
            !Cols[col].has(num) &&
            !Cells3x3[cell].has(num)
    );
}

function addNum(row, col, cell, num) {
    Table[row][col] = num;
    Rows[row].add(num);
    Cols[col].add(num);
    Cells3x3[cell].add(num);
}

function removeNum(row, col, cell, num) {
    Table[row][col] = 0;
    Rows[row].delete(num);
    Cols[col].delete(num);
    Cells3x3[cell].delete(num);
}

// Заполнение слева направо, сверху вниз + откат при тупике
function fillTable(row = 0, col = 0) {
    if (row === RowLength) return true;

    const nextRow = col === RowLength - 1 ? row + 1 : row;
    const nextCol = col === RowLength - 1 ? 0 : col + 1;
    const cell = boxIndex(row, col);
    const candidates = shuffle(availableNumbers(row, col, cell));

    for (const num of candidates) {
        addNum(row, col, cell, num);

        if (fillTable(nextRow, nextCol)) return true;

        removeNum(row, col, cell, num);
    }

    return false;
}

fillTable();

console.log('Table:', Table);
console.timeEnd('filled');

drawTable();
