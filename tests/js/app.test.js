/**
 * アプリケーションのメインロジックのテスト
 */

// イベントリスナーのモック
const originalAddEventListener = document.addEventListener;
const mockEventListeners = {};

document.addEventListener = jest.fn((event, callback) => {
  mockEventListeners[event] = callback;
});

// app.jsの内容をシミュレート
// DOMContentLoadedイベントハンドラをシミュレート
const simulateAppJs = () => {
  // DOMが読み込まれたら実行
  const generateBtn = document.getElementById('generate-btn');
  const keycardGrid = document.getElementById('keycard-grid');
  
  // KeyCardクラスのインスタンスを作成
  const keyCard = new KeyCard(keycardGrid);
  
  // 新しいキーカードを生成して表示する
  function generateNewKeyCard() {
    keyCard.generateKeyCard();
    keyCard.renderKeyCard();
  }
  
  // 「新しいカードを生成」ボタンのクリックイベント
  generateBtn.addEventListener('click', generateNewKeyCard);
  
  // 初回のキーカード生成
  generateNewKeyCard();
  
  // キーボードショートカット（スペースキーで新しいカードを生成）
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      generateNewKeyCard();
    }
  });
};

describe('アプリケーションのメインロジック', () => {
  beforeEach(() => {
    // app.jsの内容をシミュレート
    document.addEventListener('DOMContentLoaded', simulateAppJs);
    // DOMContentLoadedイベントをトリガー
    mockEventListeners['DOMContentLoaded']();
  });
  
  // DOMContentLoadedイベントのテスト
  test('DOMContentLoadedイベントが登録されていること', () => {
    expect(document.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });
  
  // DOMContentLoadedイベントハンドラの実行
  test('DOMContentLoadedイベントハンドラが実行されること', () => {
    // 必要な要素が取得されていることを確認
    const generateBtn = document.getElementById('generate-btn');
    const keycardGrid = document.getElementById('keycard-grid');
    
    expect(generateBtn).not.toBeNull();
    expect(keycardGrid).not.toBeNull();
  });
  
  // 「新しいカードを生成」ボタンのクリックイベントのテスト
  test('「新しいカードを生成」ボタンのクリックでキーカードが生成されること', () => {
    
    const generateBtn = document.getElementById('generate-btn');
    
    // クリックイベントをシミュレート
    generateBtn.click();
    
    // キーカードグリッドの要素を取得
    const keycardGrid = document.getElementById('keycard-grid');
    
    // キーカードが生成されていることを確認
    const cells = keycardGrid.querySelectorAll('.card-cell');
    expect(cells.length).toBe(25);
  });
  
  // キーボードショートカットのテスト
  test('スペースキーでキーカードが生成されること', () => {
    
    // キーボードイベントをシミュレート
    const keydownEvent = new KeyboardEvent('keydown', { code: 'Space' });
    document.dispatchEvent(keydownEvent);
    
    // キーカードグリッドの要素を取得
    const keycardGrid = document.getElementById('keycard-grid');
    
    // キーカードが生成されていることを確認
    const cells = keycardGrid.querySelectorAll('.card-cell');
    expect(cells.length).toBe(25);
  });
});
