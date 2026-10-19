// Ссылка на вашу таблицу в Stein (замените ВАШ_УНИКАЛЬНЫЙ_ID на свой)
const API_URL = "https://stein.ef.r.appspot.com/api/v1/storage/ВАШ_УНИКАЛЬНЫЙ_ID/Sheet1";

const container = document.getElementById("revision-container");

function showMessage(text, className = "") {
    container.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = text;
    if (className) p.className = className;
    container.append(p);
}

function createCard({ date, title, description }) {
    const article = document.createElement("article");
    article.className = "update";

    const time = document.createElement("time");
    time.textContent = date ?? "";

    const h3 = document.createElement("h3");
    h3.textContent = title ?? "";

    const p = document.createElement("p");
    p.textContent = description ?? "";

    article.append(time, h3, p);
    return article;
}

async function loadUpdates() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        if (!data.length) {
            showMessage("Доработок пока нет, но они скоро появятся!");
            return;
        }

        // Новые записи (снизу таблицы) показываем сверху
        container.innerHTML = "";
        container.append(...data.reverse().map(createCard));
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        showMessage("Не удалось загрузить свежие доработки. Попробуйте позже.", "error");
    }
}

loadUpdates();
