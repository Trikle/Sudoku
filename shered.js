export const RowLength = 9;
export const Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Таблица судоку
export const Table = Array.from({ length: RowLength }, () => Array(RowLength).fill(0));

export function getRanIndex(max) {
    return Math.floor(Math.random() * max);
}

export function shuffle(list) {
    const items = [...list];

    for (let i = items.length - 1; i > 0; i--) {
        const j = getRanIndex(i + 1);
        [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
}

export function drawTable() {
    const table = document.querySelector('#sudoku');

    for (let row = 0; row < RowLength; row++) {
        const tr = document.createElement('tr');

        for (let col = 0; col < RowLength; col++) {
            const td = document.createElement('td');

            td.textContent = Table[row][col] + '';

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}