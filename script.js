// Получаем элементы кнопки и навигации
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

// Добавляем обработчик события для кнопки
menuToggle.addEventListener('click', function() {
    // Переключаем отображение навигации
    if (navbar.style.display === 'block' || navbar.style.display === '') {
        navbar.style.display = 'none'; // Скрыть меню
    } else {
        navbar.style.display = 'block'; // Показать меню
    }
});

// Закрываем меню, если кликнули вне его
document.addEventListener('click', function(event) {
    if (!menuToggle.contains(event.target) && !navbar.contains(event.target)) {
        navbar.style.display = 'none'; // Скрыть меню
    }
});
