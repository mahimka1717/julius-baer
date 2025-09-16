import "lazysizes";
import "./image-helper.js";


const words = [
    `tomorrow`,
    `passion`,
    `succession`,
    `capital` 
]

const heroImages = [
    `hero_1`,
    `hero_2`,
    `hero_3`,
    `hero_4`
]

const timer = 3000
const enterTransition = 'transform 0.8s cubic-bezier(0.25, 1.25, 0.5, 1), opacity 0.6s ease-out'
const exitTransition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.6, 1), opacity 0.5s ease-out'


const startAnimation = () => {
    const hero = document.querySelector('.hero');
    const titleLines = document.querySelectorAll('.hero__title-line');
    const heroImageContainer = document.querySelector('.hero__image .image-container');
    const scrollPrompt = document.querySelector('.hero__scroll-prompt');
    const heroIntro = document.querySelector('.hero__intro');
    
    if (titleLines.length === 0 || !heroImageContainer || !scrollPrompt) {
        console.warn('Элементы для стартовой анимации не найдены');
        slideShow();
        return;
    }
    
    // Устанавливаем начальные состояния
    titleLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
    });
    
    heroImageContainer.style.opacity = '0';
    heroImageContainer.style.transform = 'scale(1.05) translateY(15px)';
    
    scrollPrompt.style.opacity = '0';
    
    if (heroIntro) {
        heroIntro.style.opacity = '0';
        heroIntro.style.transform = 'translateX(50px)';
    }


    if (hero) {
        hero.style.opacity = '1';
    }

    const startDelay = 200
    
    // Запускаем анимацию заголовков с паузой 0.5s
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.transition = 'opacity 1.2s cubic-bezier(0.25, 1.25, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1.25, 0.5, 1)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, startDelay + index * 150);
    });
    
    // Анимация изображения (синхронно с первым заголовком)
    setTimeout(() => {
        heroImageContainer.style.transition = 'opacity 1.3s cubic-bezier(0.25, 1.25, 0.5, 1), transform 1.3s cubic-bezier(0.25, 1.25, 0.5, 1)';
        heroImageContainer.style.opacity = '1';
        heroImageContainer.style.transform = 'scale(1) translateY(0)';
    }, startDelay);
    
    // Анимация hero__intro (после последнего заголовка)
    if (heroIntro) {
        setTimeout(() => {
            heroIntro.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.25, 1.25, 0.5, 1)';
            heroIntro.style.opacity = '1';
            heroIntro.style.transform = 'translateX(0)';
        }, startDelay + titleLines.length * 150 + 100);
    }
    
    // Анимация scroll prompt
    setTimeout(() => {
        scrollPrompt.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.25, 1.25, 0.5, 1)';
        scrollPrompt.style.opacity = '1';
        scrollPrompt.style.transform = 'translateY(0)';
        
        // Запускаем slideShow после завершения стартовой анимации
        setTimeout(() => {
            slideShow();
        }, 600);
    }, startDelay + titleLines.length * 150 + 200);
};

const slideShow = () => {
    const titleLines = document.querySelectorAll('.hero__title-line');
    if (titleLines.length === 0) {
        console.warn('Элементы .hero__title-line не найдены');
        return;
    }
    const heroImageContainer = document.querySelector('.hero__image .image-container');
    if (!heroImageContainer) {
        console.warn('Контейнер изображения в .hero__image не найден');
        return;
    }
    
    const heroImg = heroImageContainer.querySelector('img');
    if (!heroImg) {
        console.warn('Изображение в hero контейнере не найдено');
        return;
    }
    

    const lastTitleLine = titleLines[titleLines.length - 1];
    let currentIndex = 1;
    
    const changeContent = () => {
        const currentWord = words[currentIndex];
        const currentImage = heroImages[currentIndex];
        
        const currentSpans = lastTitleLine.querySelectorAll('em span');
        
        // Анимация исчезновения текущих букв слева направо
        currentSpans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transition = 'opacity 0.3s cubic-bezier(0.4, 0.0, 1, 1)';
                span.style.opacity = '0';
            }, index * 50);
        });
        
        // Ждем завершения анимации исчезновения всех букв
        const hideAnimationDuration = (currentSpans.length - 1) * 50 + 300;
        
        setTimeout(() => {
            // Заменяем слово
            const letters = currentWord.toUpperCase().split('').map(letter => `<span style="opacity: 0">${letter}</span>`).join('');
            lastTitleLine.innerHTML = `<em>${letters}</em>`;
            
            const newSpans = lastTitleLine.querySelectorAll('em span');
            
            // Анимация появления новых букв слева направо
            newSpans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.transition = 'opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    span.style.opacity = '1';
                }, index * 50);
            });
        }, hideAnimationDuration);
        
        heroImageContainer.style.transition = exitTransition;
        heroImageContainer.style.transformOrigin = 'center center';
        heroImageContainer.style.transform = 'scale(0.99) translateY(-10px)';
        heroImageContainer.style.opacity = '0';
        
        setTimeout(() => {
            heroImg.setAttribute('data-src', `/images/${currentImage}.jpg`);
            heroImg.setAttribute('data-srcset', 
                `/images/${currentImage}_400.jpg 400w, /images/${currentImage}_600.jpg 600w, /images/${currentImage}.jpg 800w`
            );
            heroImg.setAttribute('alt', `hero ${currentIndex + 1}`);
            
            if (heroImg.src) {
                heroImg.src = `/images/${currentImage}.jpg`;
                heroImg.srcset = `/images/${currentImage}_400.jpg 400w, /images/${currentImage}_600.jpg 600w, /images/${currentImage}.jpg 800w`;
            }
            
            heroImageContainer.style.transition = 'none'
            heroImageContainer.style.transform = 'scale(1.05) translateY(15px)';
            
            setTimeout(() => {
                heroImageContainer.style.transition = enterTransition;
                heroImageContainer.style.transform = 'scale(1) translateY(0)';
                heroImageContainer.style.opacity = '1';
            }, 20);
        }, 600);
        
        currentIndex = (currentIndex + 1) % words.length;
    };
    
    const intervalId = setInterval(changeContent, timer);
    
    return () => clearInterval(intervalId);
}



// Функция для ожидания загрузки конкретных Adobe шрифтов
const waitForFonts = async () => {
    try {
        // Список шрифтов, которые нужно дождаться
        const requiredFonts = [
            { family: 'adobe-kis', weight: '400' },
            { family: 'miller-banner-compressed', weight: '400' }
        ];
        
        // Проверяем доступность каждого шрифта
        const fontPromises = requiredFonts.map(font => {
            return document.fonts.load(`${font.weight} 16px "${font.family}"`);
        });
        
        // Ждем загрузки всех нужных шрифтов
        await Promise.all(fontPromises);
        console.log('Adobe шрифты загружены:', requiredFonts.map(f => f.family));
        return true;
    } catch (error) {
        console.warn('Ошибка при загрузке Adobe шрифтов:', error);
        // Если есть ошибка, все равно запускаем анимацию через 3 секунды
        return new Promise(resolve => setTimeout(() => resolve(true), 3000));
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    // Ждем загрузки шрифтов перед запуском анимации
    await waitForFonts();
    startAnimation();
});