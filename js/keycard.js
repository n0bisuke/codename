/**
 * コードネーム キーカード生成クラス
 * 5x5のキーカードを生成し、管理するクラス
 */
class KeyCard {
  /**
   * KeyCardクラスのコンストラクタ
   * @param {HTMLElement} gridElement - キーカードを表示するDOM要素
   */
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

  /**
   * キーカードを生成する
   * 5x5のグリッドに青、赤、白、黒のマスをランダムに配置
   */
  generateKeyCard() {
    // グリッドの初期化
    this.grid = [];
    
    // 各セルタイプの配列を作成
    const cells = [];
    
    // 各セルタイプを必要な数だけ配列に追加
    for (const type in this.cellTypes) {
      for (let i = 0; i < this.cellTypes[type].count; i++) {
        cells.push(type);
      }
    }
    
    // 配列をシャッフル
    this.shuffleArray(cells);
    
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

  /**
   * 配列をシャッフルする（Fisher-Yatesアルゴリズム）
   * @param {Array} array - シャッフルする配列
   */
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * 生成したキーカードをDOMに描画する
   */
  renderKeyCard() {
    // グリッド要素をクリア
    this.gridElement.innerHTML = '';
    
    // グリッドの各セルを描画
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const cellType = this.grid[row][col];
        const cell = document.createElement('div');
        
        // セルのクラスとスタイルを設定
        cell.className = `card-cell ${this.cellTypes[cellType].className}`;
        
        // 黒マス（アサシン）の場合は髑髏アイコンを表示
        if (cellType === 'ASSASSIN') {
          // Unicode文字で髑髏を表示（SVGが読み込めない場合の代替手段）
          cell.innerHTML = '&#x2620;';
          cell.style.fontSize = '2rem';
        } else {
          // その他のセルはラベルを表示（空白）
          cell.textContent = this.cellTypes[cellType].label;
        }
        
        this.gridElement.appendChild(cell);
      }
    }
  }
}
