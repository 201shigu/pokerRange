document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('cardsTable');
    const ranks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    const rankValues = {'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2};
  
    // 表の先頭にヘッダ行を追加
    const headerRow = table.insertRow();
    const emptyTopLeftCell = headerRow.insertCell(); // 左上の空セル
    emptyTopLeftCell.style.backgroundColor = 'lightgrey';
    ranks.forEach(rank => {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = rank;
      headerCell.style.backgroundColor = 'lightgrey';
    });
  
    ranks.forEach((rowRank, rowIndex) => {
      const row = table.insertRow();
      const headerCell = row.insertCell(); // 各行の先頭にインデックスを追加
      headerCell.textContent = rowRank;
      headerCell.style.backgroundColor = 'lightgrey';
  
      ranks.forEach((colRank, colIndex) => {
        const cell = row.insertCell();
        const rowValue = rankValues[rowRank];
        const colValue = rankValues[colRank];
        let cellText = '';
  
        if (rowValue > colValue) {
          cellText = `${rowRank}${colRank}s`;
        } else if (rowValue < colValue) {
          cellText = `${colRank}${rowRank}o`;
        } else {
          cellText = `${rowRank}${colRank}`;
        }
  
        cell.textContent = cellText;
        cell.dataset.position = `${rowIndex}-${colIndex}`;
        cell.addEventListener('click', () => {
          if (cell.style.backgroundColor !== 'lightgrey') { // インデックスセルはクリック不可
            cell.classList.toggle('colored');
            updateComboTable(); // コンボテーブルの更新
          }
        });
      });
    });
  });
  