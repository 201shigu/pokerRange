document.getElementById('resetButton').addEventListener('click', () => {
    document.querySelectorAll('.colored').forEach(cell => cell.classList.remove('colored'));
    updateComboTable(); // コンボテーブルの更新
  });
  