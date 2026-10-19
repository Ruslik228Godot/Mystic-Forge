// Посты лежат в файле posts.json в этом же репозитории.
// Новые записи добавляйте В НАЧАЛО списка — они покажутся первыми.
const POSTS_URL = "posts.json";

const container = document.getElementById("revision-container");

function showMessage(text, className = "") {
    container.innerHTML = "";
    const p = document.createElement("p");
    p.textContent = text;
    if (className) p.className = className;
    container.append(p);
}

function createCard({ date, title, description, image }) {
    const article = document.createElement("article");
    article.className = "update";

    const time = document.createElement("time");
    time.textContent = date ?? "";

    const h3 = document.createElement("h3");
    h3.textContent = title ?? "";

    const p = document.createElement("p");
    p.textContent = description ?? "";

    article.append(time, h3, p);

    if (image) {
        const img = document.createElement("img");
        img.src = image;
        img.alt = title ?? "";
        img.loading = "lazy";
        article.append(img);
    }

    return article;
}

async function loadPosts() {
    try {
        const response = await fetch(POSTS_URL, { cache: "no-cache" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const posts = await response.json();

        if (!posts.length) {
            showMessage("Доработок пока нет, но они скоро появятся!");
            return;
        }

        container.innerHTML = "";
        container.append(...posts.map(createCard));
    } catch (error) {
        console.error("Ошибка загрузки постов:", error);
        showMessage("Не удалось загрузить доработки. Проверьте файл posts.json.", "error");
    }
}

loadPosts();
