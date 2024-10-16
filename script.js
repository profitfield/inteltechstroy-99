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
