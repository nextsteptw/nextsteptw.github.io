const Storage = {
    save: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => JSON.parse(localStorage.getItem(key)) || null,
    // 預設課表資料 (如果本地沒資料)
    initDefault: () => {
        if(!localStorage.getItem('timetable')) {
            Storage.save('timetable', [
                { name: "數學", room: "301", start: "08:10", day: 1 },
                { name: "英文", room: "205", start: "09:10", day: 1 }
            ]);
        }
    }
};
Storage.initDefault();