// 状態の保存と復元
document.getElementById('saveButton').addEventListener('click', () => {
    const highlightedCells = [...document.querySelectorAll('.colored')].map(cell => cell.dataset.position);
    const name = document.getElementById('saveName').value.trim() || 'default';
    localStorage.setItem(name, JSON.stringify(highlightedCells));
  
    // ファイルとしてダウンロード（Blobを使用）
    const dataStr = JSON.stringify(highlightedCells);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", url);
    downloadAnchorNode.setAttribute("download", name + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    document.body.removeChild(downloadAnchorNode);
    URL.revokeObjectURL(url);
  
    updateRestoreButtons();
  });
  
  document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('fileUpload').click();
  });
  
  document.getElementById('fileUpload').addEventListener('change', (event) => {
    const files = event.target.files;
    if (!files.length) return;
  
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const highlightedCells = JSON.parse(e.target.result);
        const name = file.name.replace('.json', '');
        localStorage.setItem(name, JSON.stringify(highlightedCells));
  
        updateRestoreButtons();
      };
      reader.readAsText(file);
    });
  });
  
  function updateRestoreButtons() {
    const restoreButtons = document.getElementById('restoreButtons');
    restoreButtons.innerHTML = ''; // 既存のボタンをクリア
    Object.keys(localStorage).forEach(key => {
      const button = document.createElement('button');
      button.textContent = key;
      button.addEventListener('click', () => restoreState(key));
      restoreButtons.appendChild(button);
    });
  }
  
  function restoreState(name) {
    const highlightedCells = JSON.parse(localStorage.getItem(name));
    // 全てのセルのハイライトをクリア
    document.querySelectorAll('.colored').forEach(cell => cell.classList.remove('colored'));
    // 保存されたセルのハイライトを復元
    highlightedCells.forEach(position => {
      const [rowIndex, colIndex] = position.split('-').map(Number);
      const row = document.getElementById('cardsTable').rows[rowIndex];
    const cell = row && row.cells[colIndex];
    if (cell) {
      cell.classList.add('colored');
    }
  });
  updateComboTable(); // コンボテーブルの更新
}
