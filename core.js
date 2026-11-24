import { Table, RowLength, Numbers, getRanIndex, shuffle, drawTable } from "./shered.js";

console.time('filled');

const Available = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set(Numbers)));

function fillTable() {
    rebuildAvailable();

    const pos = minPosition();

    // Вся сетка заполнена
    if (pos === undefined) return true;

    // Есть пустая клетка без кандидатов = тупик
    if (pos === null) return false;

    const { row, col } = pos;
    const nums = shuffle(Available[row][col]);

    for (const num of nums) {
        Table[row][col] = num;

        if (fillTable()) return true;

        Table[row][col] = 0;
    }

    rebuildAvailable();
    return false;
}

function rebuildAvailable() {
    for (let row = 0; row < RowLength; row++) {
        for (let col = 0; col < RowLength; col++) {
            if (Table[row][col] !== 0) {
                Available[row][col] = new Set();
                continue;
            }

            Available[row][col] = new Set(
                Numbers.filter((num) => isValid(row, col, num))
            );
        }
    }
}

function isValid(row, col, num) {
    for (let i = 0; i < RowLength; i++) {
        if (Table[row][i] === num || Table[i][col] === num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (Table[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function minPosition() {
    const candidates = filterCandidates();

    if (!candidates) return null;

    const minIndex = candidates.findIndex((group) => group.length > 0);

    if (minIndex === -1) return undefined;

    const shortest = candidates[minIndex];
    return shortest[getRanIndex(shortest.length)];
}

function filterCandidates() {
    const candidates = Array.from({ length: 9 }, () => []);

    for (let row = 0; row < Available.length; row++) {
        for (let col = 0; col < Available[row].length; col++) {
            if (Table[row][col] !== 0) continue;

            const size = Available[row][col].size;

            // Пустая клетка без вариантов = тупик
            if (size === 0) return null;

            candidates[size - 1].push({ row, col });
        }
    }

    return candidates;
}

fillTable();

console.timeEnd('filled');

drawTable();