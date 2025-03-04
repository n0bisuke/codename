/**
 * テスト環境のセットアップ
 */

// DOMのモック
document.body.innerHTML = `
  <header>
    <h1>コードネーム キーカード</h1>
    <button id="generate-btn">新しいカードを生成</button>
  </header>
  <main>
    <div id="keycard-container">
      <div id="keycard-grid"></div>
    </div>
  </main>
`;

// KeyCardクラスのモック
global.KeyCard = class {
  constructor(gridElement) {
    this.gridElement = gridElement;
    this.grid = [];
    this.cellTypes = {
      BLUE: { count: 8, className: 'blue-team', label: '' },
      RED: { count: 9, className: 'red-team', label: '' },
      NEUTRAL: { count: 7, className: 'neutral', label: '' },
      ASSASSIN: { count: 1, className: 'assassin', label: '' }
    };
  }
  
  generateKeyCard() {
    this.grid = [];
    const cells = [];
    
    // 各セルタイプを必要な数だけ配列に追加
    for (const type in this.cellTypes) {
      for (let i = 0; i < this.cellTypes[type].count; i++) {
        cells.push(type);
      }
    }
    
    // 5x5のグリッドに配置
    for (let row = 0; row < 5; row++) {
      const rowArray = [];
      for (let col = 0; col < 5; col++) {
        const index = row * 5 + col;
        rowArray.push(cells[index]);
      }
      this.grid.push(rowArray);
    }
    
    return this.grid;
  }
  
  shuffleArray(array) {
    return array;
  }
  
  renderKeyCard() {
    this.gridElement.innerHTML = '';
    
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const cellType = this.grid[row][col];
        const cell = document.createElement('div');
        
        cell.className = `card-cell ${this.cellTypes[cellType].className}`;
        
        if (cellType === 'ASSASSIN') {
          cell.innerHTML = '&#x2620;';
        } else {
          cell.textContent = this.cellTypes[cellType].label;
        }
        
        this.gridElement.appendChild(cell);
      }
    }
  }
};
