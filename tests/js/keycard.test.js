/**
 * KeyCardクラスのテスト
 */

describe('KeyCardクラス', () => {
  let keyCard;
  let gridElement;
  
  // 各テストの前に実行
  beforeEach(() => {
    // テスト用のDOM要素を取得
    gridElement = document.getElementById('keycard-grid');
    
    // KeyCardクラスのインスタンスを作成
    keyCard = new KeyCard(gridElement);
  });
  
  // コンストラクタのテスト
  test('コンストラクタが正しく初期化されること', () => {
    expect(keyCard.gridElement).toBe(gridElement);
    expect(keyCard.grid).toEqual([]);
    expect(keyCard.cellTypes).toHaveProperty('BLUE');
    expect(keyCard.cellTypes).toHaveProperty('RED');
    expect(keyCard.cellTypes).toHaveProperty('NEUTRAL');
    expect(keyCard.cellTypes).toHaveProperty('ASSASSIN');
  });
  
  // generateKeyCardメソッドのテスト
  test('generateKeyCardメソッドが5x5のグリッドを生成すること', () => {
    const grid = keyCard.generateKeyCard();
    
    // グリッドが5x5であることを確認
    expect(grid.length).toBe(5);
    grid.forEach(row => {
      expect(row.length).toBe(5);
    });
    
    // 各セルタイプの数が正しいことを確認
    const flatGrid = grid.flat();
    const counts = {
      BLUE: 0,
      RED: 0,
      NEUTRAL: 0,
      ASSASSIN: 0
    };
    
    flatGrid.forEach(cell => {
      counts[cell]++;
    });
    
    expect(counts.BLUE).toBe(8);
    expect(counts.RED).toBe(9);
    expect(counts.NEUTRAL).toBe(7);
    expect(counts.ASSASSIN).toBe(1);
  });
  
  // shuffleArrayメソッドのテスト
  test('shuffleArrayメソッドが配列をシャッフルすること', () => {
    // テスト用の配列
    const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arrayCopy = [...originalArray];
    
    // シャッフル
    const shuffledArray = keyCard.shuffleArray(arrayCopy);
    
    // 配列の長さが同じであることを確認
    expect(shuffledArray.length).toBe(originalArray.length);
    
    // 配列の内容が同じであることを確認（順序は異なる）
    expect(shuffledArray.sort()).toEqual(originalArray.sort());
    
    // シャッフル後の配列が元の配列と異なる可能性が高いことを確認
    // 注: 確率的にはシャッフル後も同じ順序になる可能性があるため、完全な保証はできない
    const isSame = shuffledArray.every((value, index) => value === originalArray[index]);
    expect(isSame).toBeFalsy();
  });
  
  // renderKeyCardメソッドのテスト
  test('renderKeyCardメソッドがDOMにグリッドを描画すること', () => {
    // グリッドを生成
    keyCard.generateKeyCard();
    
    // グリッドを描画
    keyCard.renderKeyCard();
    
    // DOM要素が生成されていることを確認
    const cells = gridElement.querySelectorAll('.card-cell');
    expect(cells.length).toBe(25);
    
    // 各セルタイプのクラスが正しく設定されていることを確認
    const blueTeamCells = gridElement.querySelectorAll('.blue-team');
    const redTeamCells = gridElement.querySelectorAll('.red-team');
    const neutralCells = gridElement.querySelectorAll('.neutral');
    const assassinCells = gridElement.querySelectorAll('.assassin');
    
    expect(blueTeamCells.length).toBe(8);
    expect(redTeamCells.length).toBe(9);
    expect(neutralCells.length).toBe(7);
    expect(assassinCells.length).toBe(1);
  });
});
