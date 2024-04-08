// コンボ数と割合の計算と表示
function updateComboTable() {
    const combos = { offSuit: 0, suit: 0, pocketPair: 0 };
    document.querySelectorAll('.colored').forEach(cell => {
      if (cell.textContent.endsWith('o')) combos.offSuit++;
      else if (cell.textContent.endsWith('s')) combos.suit++;
      else if (/^\w\w$/.test(cell.textContent)) combos.pocketPair++;
    });
  
    const comboFactors = { offSuit: 12, suit: 4, pocketPair: 6 };
    const comboCounts = {
      offSuit: combos.offSuit * comboFactors.offSuit,
      suit: combos.suit * comboFactors.suit,
      pocketPair: combos.pocketPair * comboFactors.pocketPair
    };
    const totalCombos = comboCounts.offSuit + comboCounts.suit + comboCounts.pocketPair;
  
    // テーブルの生成
    const comboTableContainer = document.getElementById('comboTableContainer');
    comboTableContainer.innerHTML = ''; // 古いテーブルのクリア
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    ['タイプ', 'コンボ数', '割合'].forEach(text => {
      const cell = headerRow.insertCell();
      cell.textContent = text;
    });
  
    Object.keys(comboCounts).forEach(key => {
      const row = table.insertRow();
      const nameCell = row.insertCell();
      nameCell.textContent = key === 'offSuit' ? 'オフスーツ' : key === 'suit' ? 'スーツ' : 'ポケットペア';
      const countCell = row.insertCell();
      countCell.textContent = comboCounts[key];
      const ratioCell = row.insertCell();
      ratioCell.textContent = totalCombos ? ((comboCounts[key] / totalCombos) * 100).toFixed(2) + '%' : '0%';
    });
  
    comboTableContainer.appendChild(table);
  }
  
  // ページ読み込み時に表を初期状態で表示
  document.addEventListener('DOMContentLoaded', () => {
    updateComboTable();
  });
  