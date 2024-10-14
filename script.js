// Получаем элементы кнопки и навигации
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const popupMenu = document.createElement('div'); // Создаём контейнер для всплывающего меню

// Функция для создания всплывающего меню
function createPopupMenu() {
    popupMenu.id = 'popup-menu';
    popupMenu.innerHTML = `
        <button id="close-popup" style="background: none; border: none; color: white; font-size: 30px; position: absolute; top: 20px; right: 20px;">&times;</button>
        <h2 style="text-align: center;">Меню</h2>
        <ul>
            <li><a href="#home">Главная</a></li>
            <li><a href="#about">О компании</a></li>
            <li><a href="#services">Услуги</a></li>
            <li><a href="#projects">Проекты</a></li>
            <li><a href="#clients">Наши заказчики</a></li>
            <li><a href="#contact">Контакты</a></li>
        </ul>
    `;
    document.body.appendChild(popupMenu);
    
    // Добавляем обработчик события для закрытия меню
    document.getElementById('close-popup').addEventListener('click', function() {
        popupMenu.style.display = 'none'; // Скрываем меню
    });
}

// Добавляем обработчик события для кнопки
menuToggle.addEventListener('click', function() {
    if (popupMenu.style.display === 'block') {
        popupMenu.style.display = 'none'; // Скрыть меню
    } else {
        popupMenu.style.display = 'block'; // Показать меню
    }
});

// Закрываем меню, если кликнули вне его
document.addEventListener('click', function(event) {
    if (!menuToggle.contains(event.target) && !navbar.contains(event.target) && !popupMenu.contains(event.target)) {
        popupMenu.style.display = 'none'; // Скрыть меню
    }
});

// Инициализируем всплывающее меню
createPopupMenu();
