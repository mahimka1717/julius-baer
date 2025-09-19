// YouTube Player API для cover поведения видео

let player;
let isPlayerReady = false;

// Функция вызывается когда YouTube API готов
function onYouTubeIframeAPIReady() {
    // console.log('YouTube API готов к инициализации');
    
    const targetElement = document.getElementById('youtube-player');
    if (!targetElement) {
        console.error('Элемент #youtube-player не найден!');
        return;
    }
    
    // console.log('Инициализация YouTube Player...');
    
    player = new YT.Player('youtube-player', {
        videoId: 'ZBfwzZDrrNo', // ID видео
        width: '100%',
        height: '100%',
        playerVars: {
            'controls': 0,
            'mute': 0,
            'modestbranding': 1,
            'iv_load_policy': 3,
            'rel': 0,
            'showinfo': 0,
            'fs': 1,
            'cc_load_policy': 0,
            'playsinline': 1,
            'autoplay': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    console.log('YouTube Player готов!');
    isPlayerReady = true;
    adjustPlayerSize();
    
    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', adjustPlayerSize);
}

function onPlayerStateChange(event) {
    console.log('Состояние плеера изменилось:', event.data);
}

function onPlayerError(event) {
    console.error('Ошибка YouTube Player:', event.data);
}

function adjustPlayerSize() {
    if (!isPlayerReady || !player) {
        console.log('Player не готов для изменения размера');
        return;
    }
    
    const container = document.querySelector('.videohero');
    if (!container) {
        console.log('Контейнер .videohero не найден');
        return;
    }
    
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const containerRatio = containerWidth / containerHeight;
    
    console.log(`Размеры контейнера: ${containerWidth}x${containerHeight}, ratio: ${containerRatio}`);
    
    // Соотношение сторон оригинального видео (примерно 16:9)
    const videoRatio = 16 / 9;
    
    // Проверяем, достигнута ли максимальная высота
    const maxHeight = window.innerHeight - 106 + 10;
    const isHeightConstrained = containerHeight >= maxHeight;
    
    console.log(`Max height: ${maxHeight}, constrained: ${isHeightConstrained}`);
    
    if (isHeightConstrained && containerRatio < videoRatio) {
        // Контейнер уже или выше чем видео - нужно cover поведение
        // Увеличиваем плеер чтобы заполнить контейнер по ширине
        const newWidth = containerHeight * videoRatio;
        const newHeight = containerHeight;
        const leftOffset = (containerWidth - newWidth) / 2;
        
        console.log(`Применяем cover: ${newWidth}x${newHeight}, offset: ${leftOffset}`);
        
        const iframe = container.querySelector('iframe');
        if (iframe) {
            iframe.style.width = newWidth + 'px';
            iframe.style.height = newHeight + 'px';
            iframe.style.left = leftOffset + 'px';
            iframe.style.top = '0px';
        }
    } else {
        // Обычное поведение - заполняем весь контейнер
        console.log('Применяем обычное поведение');
        const iframe = container.querySelector('iframe');
        if (iframe) {
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.left = '0px';
            iframe.style.top = '0px';
        }
    }
}

// Проверяем загружен ли уже YouTube API
if (window.YT && window.YT.Player) {
    console.log('YouTube API уже загружен');
    onYouTubeIframeAPIReady();
} else {
    console.log('Ожидаем загрузки YouTube API...');
    // Делаем функцию глобальной для YouTube API
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
}

// Дополнительная проверка через таймер
setTimeout(() => {
    if (!isPlayerReady) {
        console.error('YouTube Player не инициализировался в течение 5 секунд');
        const container = document.querySelector('#youtube-player');
        if (container) {
            container.innerHTML = '<p style="color: red; padding: 20px;">Ошибка загрузки YouTube Player</p>';
        }
    }
}, 5000);