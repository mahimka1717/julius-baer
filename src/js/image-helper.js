// Автоматическая генерация responsive изображений
export function createResponsiveImage(imagePath, alt = '') {
  // Извлекаем название файла без расширения
  const fileName = imagePath.replace('.jpg', '');
  
  // Генерируем srcset
  const srcset = [
    `${fileName}_400.jpg 400w`,
    `${fileName}_600.jpg 600w`, 
    `${fileName}.jpg 800w`
  ].join(', ');
  
  // Оптимальные sizes для большинства случаев
  const sizes = "(max-width: 767px) 400px, (max-width: 1199px) 600px, 800px";
  
  return `
    <img 
      class="lazyload"
      data-src="${imagePath}"
      data-srcset="${srcset}"
      data-sizes="${sizes}"
      alt="${alt}"
    />
  `.trim();
}

// Функция для использования в JavaScript
window.responsiveImage = createResponsiveImage;
