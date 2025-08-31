// main.js

window.onload = init(); //読み込み時に初期化処理

// Variables
let quests =[]; // 問題リスト
let now = 0; //現在の問題番号
let correct_count = 0; //正解数
let quest_type = "ストラテジ"; //問題タイプ
let goal_minute = 10; //目標時間
let minute = 0; // 現在分
let second = 0; // 現在秒

// Utilities

// getRandomInt: 0からmax未満のランダム整数を取得 
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// clear: Content内の子要素を全削除
function clear(){
    $("#content").children().remove();
}

// clearQuest: Quest内の子要素を全削除
function clearQuest(){
    $("#quest").children().remove();
}

// add: Contentに要素を追加
function add(text){
    $("#content").append(text);
}

// addQuest: Questに要素を追加
function addQuest(text){
    $("#quest").append(text);
}
// 初期化＆メニュー表示
function init(){
    clear();
    add("<div class='menu-msg'>分野を選択してください</div>");
    add("<input type='button' value='ストラテジ' class='menu-button' onclick='load_str()'>");
    add("<input type='button' value='マネジメント' class='menu-button' onclick='load_mng()'>");
    add("<input type='button' value='テクノロジ' class='menu-button' onclick='load_tec()'>");
}

// 開始画面
function start_screen(){
    clear();
    add("<div class='quest-text'>"+ quest_type +"<br>目標時間: "+ goal_minute +"分<br>総問題数: "+quests.length+"</div>");
    add("<input type='button' value='スタート！' class='menu-button' onclick='start()'>");
}

// クエスト開始処理
function start(){
    clear();
    if (quests.length === 0) { // 問題が読み込まれなかった時のエラーハンドリング
        add("<div class='error-msg'>クエストが読み込まれていません。分野を選択してください。</div>");
        return;
    }
    quests = quests.sort(() => Math.random() - 0.5); // 問題の順番をシャッフル
    add("<div class='quest-status'>問題数: <span id='quest-now'>1</span> / "+ quests.length + "</div>");
    add("<div class='quest-status'>経過時間: <span id='minute'>0</span>分<span id='second'>0</span>秒");
    add("<div class='quest' id='quest'></div>");
    now = 0; //問題数をリセット
    timer_start(); // タイマー開始
    next(); // 問題を表示する処理
}
// 次へ問題へ推移する処理
function next(){
    clearQuest();
    $("#quest-now").text(now + 1); // 現在の問題番号を更新
    if (now+1 > quests.length) { // もしすべての問題を解いたらendingを表示
        ending();
        return;
    }
    addQuest("<div class='quest-text'>" + quests[now].text + "</div>");
    // 問題の選択肢をランダムに配置
    correct_num = getRandomInt(4);
    opt = 0;
    for (let j = 0; j < 4; j++) {
        if (j === correct_num) {
            addQuest("<input type='button' value='" + quests[now].answer + "' class='answer-button' onclick='correct()'>");
        } else {
            addQuest("<input type='button' value='" + quests[now].option[opt] + "' class='answer-button' onclick='incorrect()'>");
            opt++;
        }
    }
}

// 問題解説
function description(){
    $("#quest-now").text(now + 1);
    addQuest("<div class='quest-text'>" + quests[now].text + "</div>");
    addQuest("<div class='quest-description'>解説<br>" + quests[now].description + "</div>");
    if (now + 1 == quests.length) {
        addQuest("<input type='button' value='結果発表へ' class='next-button' onclick='next()'>");
    }else{
        addQuest("<input type='button' value='次の問題へ' class='next-button' onclick='next()'>");
    }
    now++;
}

// 終了画面
function ending(){
  timer_stop();

  const rate = quests.length ? (correct_count / quests.length) : 0;

  const percent = (rate * 100).toFixed(1); 

  clear();

  if (rate >= 0.6){
    add("<div class='quest-coi quest-correct'>合格！</div>");
  } else {
    add("<div class='quest-coi quest-incorrect'>不合格...</div>");
    add("<div class='quest-description'>解説をよく読んで、もう一度挑戦しよう！</div>");
  }

  add("<div class='quest-text'>正答率: " + percent + "%<br>時間: " + minute + "分" + second + "秒</div>");
  add("<input type='button' value='もう一度挑戦' class='next-button' onclick='window.location.reload()'>");
}

// 正解と不正解の処理
function correct(){
    clearQuest();
    correct_count++;
    $("#correct").text(correct_count);
    addQuest("<div class='quest-coi quest-correct'>正解！</div>");
    description();
}

function incorrect(){
    clearQuest();
    addQuest("<div class='quest-coi quest-incorrect'>不正解...</div>");
    description();
}

// 問題ローダー
function load_str(){
    quest_type = "ストラテジ";
    goal_minute = 10;
    quests = str_quests;
    start_screen();
}

function load_mng(){
    quest_type = "マネジメント";
    goal_minute = 15;
    quests = mng_quests;
    start_screen();
}

function load_tec(){
    quest_type = "テクノロジ";
    goal_minute = 20;
    quests = tec_quests;
    start_screen();
}