const BRIDGE_URL = "https://coollearningtw.github.io/"; // 替換為網站 A 的網域

function requestSync() {
    const iframe = document.getElementById('data-bridge');
    if (iframe.contentWindow) {
        // 發送簡訊給網站 A 的 bridge.html
        iframe.contentWindow.postMessage({ action: "GET", key: "english_mistakes" }, BRIDGE_URL);
    }
}

// 接收來自網站 A 的簡訊
window.addEventListener("message", (event) => {
    if (event.origin !== BRIDGE_URL) return;

    if (event.data.action === "RECEIVE") {
        console.log("同步成功:", event.data.key);
        localStorage.setItem(event.data.key, event.data.value);
        // 通知 App 更新介面
        window.dispatchEvent(new Event('sync-complete'));
    }
});

// 每 30 秒自動同步一次
setInterval(requestSync, 30000);