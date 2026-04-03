// 1. 智慧今日卡片 & 2. 今日行程流
function renderDashboard() {
    const timetable = Storage.get('timetable');
    const list = document.getElementById('timeline-list');
    list.innerHTML = "";

    timetable.forEach(item => {
        const div = document.createElement('div');
        div.className = "timeline-item";
        div.innerHTML = `<strong>${item.start}</strong> - ${item.name} <small>(${item.room})</small>`;
        list.appendChild(div);
    });

    // 簡單邏輯：顯示第一堂為現在課程
    document.getElementById('current-class-name').innerText = timetable[0].name;
    document.getElementById('next-class-info').innerText = "下一堂：" + timetable[1].name;
}

// 5. 大考倒數
function renderCountdown() {
    const target = new Date("2024-05-20"); // 換成你的段考日期
    const diff = Math.ceil((target - new Date()) / (1000 * 60 * 60 * 24));
    document.getElementById('countdown-days').innerText = diff > 0 ? diff : 0;
}

// 讀取同步過來的常錯單字
function renderMistakes() {
    const raw = localStorage.getItem('english_mistakes');
    const container = document.getElementById('mistake-container');
    if (!raw) {
        container.innerText = "暫無同步資料";
        return;
    }
    const mistakes = JSON.parse(raw); // 假設格式是 ["apple", "banana"]
    container.innerHTML = mistakes.map(w => `<span class="tag">${w}</span>`).join('');
}

// 彈窗控制 (週課表與待辦)
function openWeeklyGrid() {
    const modal = document.getElementById('full-screen-modal');
    document.getElementById('modal-title').innerText = "週課表概覽";
    document.getElementById('modal-content').innerHTML = "<p>這裡放 5x8 的 Table 介面...</p>";
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('full-screen-modal').classList.remove('show');
}

// 監聽同步事件
window.addEventListener('sync-complete', renderMistakes);

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    renderCountdown();
    renderMistakes();
    setTimeout(requestSync, 2000); // 啟動後 2 秒嘗試第一次同步
});