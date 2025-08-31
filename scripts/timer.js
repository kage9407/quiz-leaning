// timer.js

// timer_start: タイマーを開始する関数
// Intervalで1sで更新
function timer_start() {
    minute = 0;
    second = 0; 
    setInterval(() => {
        minute = Math.floor(second / 60);
        second = second % 60;
        $("#minute").text(minute);
        $("#second").text(second); 
        second++; 
    }, 1000);
}

// timer_stop: タイマーを停止する関数
// clearIntervalを使用してタイマーを停止
function timer_stop() {
    clearInterval();
}
