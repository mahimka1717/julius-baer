import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для создания адаптивных версий изображений
async function generateResponsiveImages() {
  const imagesDir = path.join(__dirname, 'public', 'images');
  const allFiles = fs.readdirSync(imagesDir);
  console.log('📁 Все файлы в папке images:', allFiles);
  
  const files = allFiles.filter(file => {
    const isJpg = file.endsWith('.jpg');
    const hasSizePrefix = file.includes('_400') || file.includes('_600') || file.includes('_800');
    
    console.log(`🔍 Проверяем ${file}:`, { isJpg, hasSizePrefix });
    
    return isJpg && !hasSizePrefix;
  });
  console.log('🎯 Найденные файлы для обработки:', files);

  console.log('🖼️  Проверка адаптивных версий изображений...');

  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const filename = path.parse(file).name;
    
    const output400 = path.join(imagesDir, `${filename}_400.jpg`);
    const output600 = path.join(imagesDir, `${filename}_600.jpg`);
    
    // Проверяем, существуют ли уже файлы
    if (fs.existsSync(output400) && fs.existsSync(output600)) {
      console.log(`✅ Пропускаем ${file} - версии уже существуют`);
      continue;
    }

    console.log(`📸 Обрабатываем: ${file}`);

    try {
      // Создаем версию 400px (мобильные)
      if (!fs.existsSync(output400)) {
        await sharp(inputPath)
          .resize(400, 400, { 
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: 85 })
          .toFile(output400);
      }

      // Создаем версию 600px (планшеты)
      if (!fs.existsSync(output600)) {
        await sharp(inputPath)
          .resize(600, 600, { 
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: 90 })
          .toFile(output600);
      }

      // Создаем версию 800px для Retina мобильных
      const output800 = path.join(imagesDir, `${filename}_800.jpg`);
      if (!fs.existsSync(output800)) {
        await sharp(inputPath)
          .resize(800, 800, { 
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: 90 })
          .toFile(output800);
      }

      console.log(`✅ Созданы: ${filename}_400.jpg, ${filename}_600.jpg, ${filename}_800.jpg`);
    } catch (error) {
      console.error(`❌ Ошибка обработки ${file}:`, error);
    }
  }

  console.log('🎉 Готово! Проверка адаптивных версий завершена');
}

// Запускаем генерацию
generateResponsiveImages().catch(console.error);
