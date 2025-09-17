import "lazysizes";
import "./image-helper.js";
import "./youtube-player.js";

// Функция для инициализации анимации появления элементов в .copy
function initCopyElementsFadeInAnimation() {
    const copyElements = document.querySelectorAll('.copy p, .copy h2');
    
    // Устанавливаем начальные стили
    copyElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(5px)';
        element.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Функция для проверки видимости элемента
    function isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Проверяем, что верх элемента достиг 100px от низа вьюпорта
        return rect.top <= windowHeight - 100;
    }
    
    // Функция для анимации элемента
    function animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }
    
    // Функция для обработки скролла
    function handleScroll() {
        copyElements.forEach(element => {
            if (!element.dataset.animated && isElementVisible(element)) {
                animateElement(element);
                element.dataset.animated = 'true';
            }
        });
    }
    
    // Добавляем обработчик события скролла
    window.addEventListener('scroll', handleScroll);
    
    // Проверяем элементы при загрузке страницы
    handleScroll();
}


function initParallaxImages() {
    // Выбираем изображения для параллакс эффекта
    const parallaxImages = document.querySelectorAll('.image[data-id="legacy-2"], .image[data-id="family-2"]');
    
    if (parallaxImages.length === 0) return;
    
    // Функция для обновления позиции изображения
    function updateParallaxPosition() {
        parallaxImages.forEach(imageContainer => {
            const img = imageContainer.querySelector('img');
            if (!img) return;
            
            const rect = imageContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Вычисляем прогресс: 0 когда верх появляется во вьюпорте, 1 когда низ исчезает
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const elementHeight = rect.height;
            
            // Когда верх элемента достигает низа вьюпорта - прогресс 0
            // Когда низ элемента достигает верха вьюпорта - прогресс 1
            const totalScrollDistance = windowHeight + elementHeight;
            const currentScroll = windowHeight - elementTop;
            
            let progress = currentScroll / totalScrollDistance;
            progress = Math.max(0, Math.min(1, progress)); // Ограничиваем от 0 до 1

            // Преобразуем прогресс в object-position (80% до 40% по Y)
            const yPosition = 80 - (progress * 40); // 80% - (progress * 40%) = от 80% до 40%

            img.style.objectPosition = `center ${yPosition}%`;
        });
    }
    
    // Добавляем обработчик скролла с throttling
    let parallaxTimeout;
    function throttledParallaxScroll() {
        if (!parallaxTimeout) {
            parallaxTimeout = requestAnimationFrame(() => {
                updateParallaxPosition();
                parallaxTimeout = null;
            });
        }
    }
    
    window.addEventListener('scroll', throttledParallaxScroll);
    
    // Инициализируем позиции при загрузке
    updateParallaxPosition();
}

function initImageAnimation() {
    // Выбираем только изображения с нужными data-id
    const images = document.querySelectorAll('.image[data-id="legacy-1"], .image[data-id="legacy-3"], .image[data-id="family-1"], .image[data-id="family-3"]');
    
    if (images.length === 0) return;
    
    // Устанавливаем начальные стили для анимации
    images.forEach(image => {
        image.style.transformOrigin = '50% 50%';
        image.style.opacity = '0';
        image.style.transform = 'translateY(40px) scale(0.95)';
        image.style.filter = 'brightness(0.3)';
        image.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1), filter 1s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Функция для проверки видимости изображения
    function isImageVisible(image) {
        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        return rect.top <= windowHeight - 100;
    }
    
    // Функция для анимации изображения
    function animateImage(image, index) {
        setTimeout(() => {
            image.style.opacity = '1';
            image.style.transform = 'translateY(0) scale(1)';
            image.style.filter = 'brightness(1)';
            
            // // Добавляем небольшой "bounce" эффект после основной анимации
            // setTimeout(() => {
            //     image.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            //     image.style.transform = 'translateY(-8px) scale(1.02)';
                
            //     setTimeout(() => {
            //         image.style.transition = 'transform 0.4s ease-out';
            //         image.style.transform = 'translateY(0) scale(1)';
            //     }, 300);
            // }, 800);
            
        }, index * 200);
    }
    
    // Функция для обработки скролла
    function handleImageScroll() {
        images.forEach((image, index) => {
            if (!image.dataset.imageAnimated && isImageVisible(image)) {
                animateImage(image, index);
                image.dataset.imageAnimated = 'true';
            }
        });
    }
    
    // Добавляем обработчик события скролла
    window.addEventListener('scroll', handleImageScroll);
    
    // Проверяем изображения при загрузке страницы
    handleImageScroll();
}

function initQuoteAnimation() {
    // Выбираем все цитаты
    const quotes = document.querySelectorAll('.quote');
    
    if (quotes.length === 0) return;
    
    // Устанавливаем начальные стили для анимации
    quotes.forEach(quote => {
        quote.style.opacity = '0';
        quote.style.transform = 'translateY(40px) scale(0.98)';
        quote.style.filter = 'brightness(0.8)';
        quote.style.transition = 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    // Функция для проверки видимости цитаты
    function isQuoteVisible(quote) {
        const rect = quote.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        return rect.top <= windowHeight - 100;
    }
    
    // Функция для анимации цитаты
    function animateQuote(quote, index) {
        setTimeout(() => {
            quote.style.opacity = '1';
            quote.style.transform = 'translateY(0) scale(1)';
            quote.style.filter = 'brightness(1)';
            
            // Добавляем небольшой "glow" эффект после основной анимации
            setTimeout(() => {
                quote.style.transition = 'transform 0.4s ease-out, filter 0.4s ease-out';
                quote.style.transform = 'translateY(-3px) scale(1.01)';
                quote.style.filter = 'brightness(1.05)';
                
                setTimeout(() => {
                    quote.style.transition = 'transform 0.5s ease-out, filter 0.5s ease-out';
                    quote.style.transform = 'translateY(0) scale(1)';
                    quote.style.filter = 'brightness(1)';
                }, 400);
            }, 600);
            
        }, index * 300); // Больше задержки между цитатами для плавности
    }
    
    // Функция для обработки скролла
    function handleQuoteScroll() {
        quotes.forEach((quote, index) => {
            if (!quote.dataset.quoteAnimated && isQuoteVisible(quote)) {
                animateQuote(quote, index);
                quote.dataset.quoteAnimated = 'true';
            }
        });
    }
    
    // Добавляем обработчик события скролла
    window.addEventListener('scroll', handleQuoteScroll);
    
    // Проверяем цитаты при загрузке страницы
    handleQuoteScroll();
}


document.addEventListener("DOMContentLoaded", async () => {
    initCopyElementsFadeInAnimation();
    initImageAnimation();
    initParallaxImages();
    initQuoteAnimation();
});