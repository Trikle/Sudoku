import {Table, RowLength, Numbers, shuffle, drawTable} from "./shered.js";

console.time('filled');

// Числа, которые ещё нужно поставить в каждый блок 3×3
const Cells3x3 = Array.from({ length: RowLength }, () => new Set(Numbers));

function sameInRow(row, num) {
    return Table[row].some((val) => val === num);
}

function sameInCol(col, num) {
    return Table.some((row) => row[col] === num);
}

function boxCells(boxIndex) {
    const startRow = Math.floor(boxIndex / 3) * 3;
    const startCol = (boxIndex % 3) * 3;
    const cells = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            cells.push({ row: startRow + i, col: startCol + j });
        }
    }

    return cells;
}

// Свободные клетки блока, куда можно поставить num
function freeCellsForNum(boxIndex, num) {
    return boxCells(boxIndex).filter(
        ({ row, col }) =>
            Table[row][col] === 0 &&
            !sameInRow(row, num) &&
            !sameInCol(col, num)
    );
}

function place(row, col, boxIndex, num) {
    Table[row][col] = num;
    Cells3x3[boxIndex].delete(num);
}

function unplace(row, col, boxIndex, num) {
    Table[row][col] = 0;
    Cells3x3[boxIndex].add(num);
}

// Для каждой цифры 1..9 ставим её по одному разу в каждый блок 3×3
function fillTable(numIndex = 0, boxIndex = 0) {
    if (numIndex === RowLength) return true;

    if (boxIndex === RowLength) {
        return fillTable(numIndex + 1, 0);
    }

    const num = Numbers[numIndex];
    const cells = shuffle(freeCellsForNum(boxIndex, num));

    for (const { row, col } of cells) {
        place(row, col, boxIndex, num);

        if (fillTable(numIndex, boxIndex + 1)) return true;

        unplace(row, col, boxIndex, num);
    }

    return false;
}

fillTable();

console.log('Table:', Table);

console.timeEnd('filled');

drawTable();
