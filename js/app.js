/**
 * コードネーム キーカードアプリ
 * メインアプリケーションロジック
 */

// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
  // 必要な要素の取得
  const generateBtn = document.getElementById('generate-btn');
  const keycardGrid = document.getElementById('keycard-grid');
  
  // KeyCardクラスのインスタンスを作成
  const keyCard = new KeyCard(keycardGrid);
  
  /**
   * 新しいキーカードを生成して表示する
   */
  function generateNewKeyCard() {
    keyCard.generateKeyCard();
    keyCard.renderKeyCard();
    
    // アニメーション効果
    keycardGrid.classList.add('fade-in');
    setTimeout(() => {
      keycardGrid.classList.remove('fade-in');
    }, 500);
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
  
  // 画面サイズ変更時にグリッドのサイズを調整
  window.addEventListener('resize', () => {
    // グリッドのサイズ調整が必要な場合はここに処理を追加
  });
  
  // PWAインストールプロンプトの処理
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // インストールプロンプトを表示せずに保存
    e.preventDefault();
    deferredPrompt = e;
    
    // 必要に応じてインストールボタンを表示する処理をここに追加
  });
});

// CSSのフェードイン効果を追加
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);
