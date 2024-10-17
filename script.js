// Слайдер
let currentSlide = 0; // Индекс текущего слайда
const slides = document.querySelectorAll('.slide'); // Получаем все слайды

// Функция для отображения слайда по индексу
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active'); // Убираем класс активного слайда
        if (i === index) {
            slide.classList.add('active'); // Добавляем класс активного слайда
        }
    });
}

// Функция для перехода к следующему слайду
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Переходим к следующему слайду
    showSlide(currentSlide);
}

// Функция для перехода к предыдущему слайду
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Переходим к предыдущему слайду
    showSlide(currentSlide);
}

// Показываем первый слайд изначально
showSlide(currentSlide);

// Переход к следующему слайду каждые 5 секунд
setInterval(nextSlide, 5000);

// Обработчики событий для стрелок
document.querySelector('.left-arrow').addEventListener('click', prevSlide);
document.querySelector('.right-arrow').addEventListener('click', nextSlide);

// Всплывающее меню
const popupMenus = document.querySelectorAll('.popup-menu');
const menuItems = document.querySelectorAll('.menu-item');
const closeButtons = document.querySelectorAll('.close-button');
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

// Функция для открытия всплывающего окна
function openPopup(popupId) {
    closePopup(); // Закрываем все всплывающие окна перед открытием нового
    const popup = document.getElementById(popupId);
    popup.classList.add('active');
}

// Функция для закрытия всплывающего окна
function closePopup() {
    popupMenus.forEach(popup => popup.classList.remove('active'));
}

// Обработчики событий для пунктов меню
menuItems.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault(); // Предотвращаем переход по якорной ссылке
        const targetId = event.target.getAttribute('href').substring(1) + '-popup';
        openPopup(targetId);

        // Закрываем мобильное меню после выбора пункта меню
        if (window.innerWidth <= 768) {
            navbar.style.display = 'none';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Меняем кнопку на иконку меню
        }
    });
});

// Обработчики событий для кнопок закрытия
closeButtons.forEach(button => {
    button.addEventListener('click', closePopup);
});

// Закрытие всплывающего окна при клике вне его области
document.addEventListener('click', event => {
    popupMenus.forEach(popup => {
        if (popup.classList.contains('active') && !popup.contains(event.target) && !event.target.classList.contains('menu-item')) {
            closePopup();
        }
    });
});

// Обработчик для кнопки меню
menuToggle.addEventListener('click', () => {
    if (navbar.style.display === 'flex') {
        navbar.style.display = 'none';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Меняем кнопку на иконку меню
    } else {
        navbar.style.display = 'flex';
        menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Меняем кнопку на иконку крестика
    }
});

// Обработчик для пункта "Главная"
const contactMenuItem = document.querySelector('.menu-item[href="#contact"]');
contactMenuItem.addEventListener('click', event => {
    event.preventDefault(); // Предотвращаем переход по якорной ссылке
    openPopup('contact-popup'); // Открываем всплывающее окно с контактами
});

// Обработка отправки формы
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
    alert('Ваше сообщение отправлено!'); // Здесь можно добавить логику для отправки данных
    closePopup(); // Закрываем всплывающее окно
});

// Закрытие меню при нажатии пункта "Главная"
const mainMenuItem = document.querySelector('.menu-item[href="#home"]');
mainMenuItem.addEventListener('click', event => {
    navbar.style.display = 'none';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Меняем кнопку на иконку меню
});
