// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-container');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    // Функция открытия/закрытия меню
    function toggleMenu() {
        const isOpen = menuToggle.classList.contains('active');
        
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        header.classList.toggle('menu-open');
        
        // Блокировка прокрутки при открытом меню
        body.style.overflow = isOpen ? '' : 'hidden';
    }

    // Обработчик кнопки меню
    menuToggle.addEventListener('click', toggleMenu);

    // Закрытие меню при клике на пункт меню
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleMenu();
            
            // Удаляем активный класс у всех пунктов и добавляем к текущему
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Закрытие меню при клике на оверлей
    menuOverlay.addEventListener('click', toggleMenu);

    // Обработка прокрутки страницы
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Скрытие/показ шапки при прокрутке
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;

        // Активный пункт меню при прокрутке
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});
// Инициализация слайдера
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        // Основные параметры
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'fade',
        speed: 1000,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        
        // Добавляем стрелки навигации
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Добавляем пагинацию
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Эффекты
        fadeEffect: {
            crossFade: true
        },

        // События
        on: {
            init: function() {
                activateSlideContent(this.slides[this.activeIndex]);
            },
            slideChange: function() {
                activateSlideContent(this.slides[this.activeIndex]);
            }
        }
    });

    // Функция для активации анимации контента слайда
    function activateSlideContent(slide) {
        // Сначала сбрасываем все анимации
        document.querySelectorAll('.slide-content [data-aos]').forEach(element => {
            element.classList.remove('aos-animate');
        });

        // Активируем анимации для текущего слайда
        slide.querySelectorAll('[data-aos]').forEach(element => {
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, 10);
        });
    }
});
// Анимация карточек услуг
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS для карточек услуг
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Анимация при наведении на карточки
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon i');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'all 0.5s ease';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Плавный скролл при клике на ссылки
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
// Анимация секции заказчиков
document.addEventListener('DOMContentLoaded', function() {
    const clientCards = document.querySelectorAll('.client-card');
    
    // Функция проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Анимация при скролле
    function handleScroll() {
        clientCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.classList.add('animate');
            }
        });
    }

    // Обработчик скролла с throttle для оптимизации производительности
    let timeout;
    window.addEventListener('scroll', () => {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(() => {
            handleScroll();
        });
    });

    // Инициализация Masonry для выравнивания карточек
    const grid = document.querySelector('.clients-grid');
    imagesLoaded(grid, function() {
        new Masonry(grid, {
            itemSelector: '.client-card',
            columnWidth: '.client-card',
            percentPosition: true
        });
    });

    // Обработка ошибок загрузки изображений
    document.querySelectorAll('.client-logo img').forEach(img => {
        img.onerror = function() {
            this.src = 'images/placeholder-logo.png'; // Заглушка при ошибке загрузки
            this.alt = 'Логотип компании';
        };
    });
});
// Обработка формы контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successNotification = document.getElementById('successNotification');

    if (contactForm) {
        // Маска для телефона
        const phoneInput = document.getElementById('phone');
        IMask(phoneInput, {
            mask: '+{7}(000)000-00-00'
        });

        // Обработка отправки формы
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.submit-button');
            const buttonText = submitButton.querySelector('.button-text');
            const originalText = buttonText.textContent;
            
            // Изменение состояния кнопки
            submitButton.disabled = true;
            buttonText.textContent = 'Отправка...';
            
            try {
                // Здесь должен быть код отправки формы на сервер
                await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация отправки
                
                // Показываем уведомление об успехе
                showNotification(successNotification);
                
                // Очищаем форму
                contactForm.reset();
                
                // Сбрасываем состояния полей
                document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
                    field.classList.remove('filled');
                });
                
            } catch (error) {
                console.error('Ошибка отправки формы:', error);
                // Можно добавить показ уведомления об ошибке
            } finally {
                // Возвращаем кнопку в исходное состояние
                submitButton.disabled = false;
                buttonText.textContent = originalText;
            }
        });

        // Обработка полей формы
        const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.add('filled');
                } else {
                    this.classList.remove('filled');
                }
            });
        });
    }
});

// Функция показа уведомления
function showNotification(notification) {
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Анимация иконок в контактной информации
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.info-header i');
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'all 0.5s ease';
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.info-header i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});
// Обновление года в копирайте
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Плавная прокрутка для ссылок в подвале
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Анимация социальных иконок
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'rotate(360deg) scale(1.2)';
            this.querySelector('i').style.transition = 'all 0.3s ease';
        });

        link.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'rotate(0) scale(1)';
        });
    });
});
// Обработка модального окна О компании
document.addEventListener('DOMContentLoaded', function() {
    const aboutModal = document.getElementById('about-popup');
    const modalClose = aboutModal.querySelector('.modal-close');
    const aboutLink = document.querySelector('a[href="#about"]');

    // Открытие модального окна
    function openModal() {
        aboutModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Анимация появления элементов
        setTimeout(() => {
            const elements = aboutModal.querySelectorAll('.advantage-item, .step');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('fade-in');
                }, index * 100);
            });
        }, 300);
    }

    // Закрытие модального окна
    function closeModal() {
        aboutModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Обработчики событий
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });

    modalClose.addEventListener('click', closeModal);

    // Закрытие по клику вне модального окна
    aboutModal.addEventListener('click', function(e) {
        if (e.target === aboutModal) {
            closeModal();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Анимация иконок при наведении
    const advantageItems = document.querySelectorAll('.advantage-item');
    advantageItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.advantage-icon i');
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'all 0.5s ease';
        });

        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.advantage-icon i');
            icon.style.transformicon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Анимация шагов при скролле
    function animateOnScroll() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.75) {
                setTimeout(() => {
                    step.classList.add('animate');
                }, index * 200);
            }
        });
    }

    // Плавный скролл внутри модального окна
    aboutModal.querySelector('.modal-content').addEventListener('scroll', function() {
        animateOnScroll();
    });

    // Анимация чисел в шагах
    function animateNumbers() {
        const stepNumbers = document.querySelectorAll('.step-number');
        stepNumbers.forEach((number) => {
            const value = number.textContent;
            let start = 0;
            const duration = 1000;
            const increment = parseInt(value) / (duration / 16);
            
            const animate = () => {
                start += increment;
                if (start < parseInt(value)) {
                    number.textContent = Math.floor(start).toString().padStart(2, '0');
                    requestAnimationFrame(animate);
                } else {
                    number.textContent = value.padStart(2, '0');
                }
            };
            
            animate();
        });
    }

    // Отслеживание видимости секций для анимации
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('approach-steps')) {
                    animateNumbers();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Добавляем элементы для отслеживания
    const sections = aboutModal.querySelectorAll('.about-section');
    sections.forEach(section => observer.observe(section));

    // Анимация сертификатов
    const certificateItems = document.querySelectorAll('.certificate-text li');
    certificateItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });

    // Добавление эффекта при наведении на заголовки
    const sectionHeaders = aboutModal.querySelectorAll('.about-section h3');
    sectionHeaders.forEach(header => {
        header.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = 'var(--primary-color)';
            this.style.transition = 'all 0.3s ease';
        });

        header.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = 'var(--text-dark)';
        });
    });

    // Добавление эффекта пульсации для иконок сертификатов
    const certificateIcon = document.querySelector('.certificate-icon');
    if (certificateIcon) {
        setInterval(() => {
            certificateIcon.classList.add('pulse');
            setTimeout(() => {
                certificateIcon.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }

    // Добавление анимации для преимуществ
    function animateAdvantages() {
        const advantages = document.querySelectorAll('.advantage-item');
        advantages.forEach((advantage, index) => {
            setTimeout(() => {
                advantage.classList.add('fade-in');
                advantage.style.transform = 'translateY(0)';
                advantage.style.opacity = '1';
            }, index * 200);
        });
    }

    // Инициализация всех анимаций при открытии модального окна
    function initModalAnimations() {
        animateAdvantages();
        animateNumbers();
        
        // Сброс анимаций при закрытии
        aboutModal.addEventListener('hidden.bs.modal', function() {
            const animatedElements = this.querySelectorAll('.fade-in, .animate, .visible');
            animatedElements.forEach(el => {
                el.classList.remove('fade-in', 'animate', 'visible');
            });
        });
    }

    // Добавляем слушатель для инициализации анимаций
    aboutModal.addEventListener('shown.bs.modal', initModalAnimations);

    // Предварительная загрузка изображений
    function preloadImages() {
        const images = document.querySelectorAll('.advantage-icon img');
        images.forEach(img => {
            const preloadImage = new Image();
            preloadImage.src = img.src;
        });
    }

    // Вызываем предварительную загрузку
    preloadImages();
});

// Добавляем CSS-анимации
const styles = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    .pulse {
        animation: pulse 1s ease;
    }

    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .advantage-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
`;

// Добавляем стили в head
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);