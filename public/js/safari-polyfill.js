// Полифилл для Intl.Segmenter для старых версий Safari (iOS 14)
if (!window.Intl || !window.Intl.Segmenter) {
  window.Intl = window.Intl || {};
  window.Intl.Segmenter = function () {
    return {
      segment: function (text) {
        return {
          [Symbol.iterator]: function () {
            return {
              next: function () {
                if (this._done) return { done: true };
                this._done = true;
                return {
                  done: false,
                  value: { segment: text },
                };
              },
              _done: false,
            };
          },
        };
      },
    };
  };
}

// Полифилл для регулярных выражений с Unicode Property Escapes
// Перехватываем создание регулярных выражений с Unicode свойствами и заменяем их безопасной альтернативой
(function () {
  // Делаем полифилл для всех браузеров, чтобы точно применить его
  // console.log("Safari polyfill script loaded");

  // Всегда применяем полифилл, чтобы быть уверенными, что он работает
  // console.log("Applying RegExp polyfill for Safari");

  // Оригинальный конструктор RegExp
  var OriginalRegExp = window.RegExp;

  // Переопределяем конструктор RegExp
  window.RegExp = function (pattern, flags) {
    try {
      // console.log("RegExp constructor called with pattern:", typeof pattern);

      // Экспериментальное решение: просто перехватываем любые регулярные выражения с Unicode свойствами
      // и заменяем их на простое регулярное выражение, которое работает во всех браузерах
      if (pattern && typeof pattern === "string") {
        // Если это строка, то пробуем заменить все сложные конструкции
        if (pattern.includes("\\p{") || pattern.includes("\\u{")) {
          // console.log("Found Unicode pattern:", pattern);

          // Заменяем любое Unicode регулярное выражение на простое
          // которое просто разбивает текст на отдельные символы
          pattern = "(.|\r|\n)";

          // Удаляем флаг 'u', который вызывает проблемы
          if (flags && flags.includes("u")) {
            flags = flags.replace("u", "");
          }

          // console.log("Using replacement pattern:", pattern);
          return new OriginalRegExp(pattern, flags);
        } else {
          // Для других регулярных выражений с Unicode свойствами применяем стандартные замены
          pattern = pattern
            // Заменяем Unicode Property Escapes упрощённым выражением - используем старый синтаксис для Unicode
            .replace(/\\p{RI}\\p{RI}/g, "[\uD83C\uDDE6-\uD83C\uDDFF]{2}")
            .replace(
              /\\p{Emoji}/g,
              "[\uD83C\uDF00-\uD83D\uDDFF\uD83D\uDE00-\uD83D\uDEFF\u2600-\u26FF\u2700-\u27BF]"
            )
            .replace(/\\p{EMod}/g, "[\uD83C\uDFFB-\uD83C\uDFFF]")
            // Также заменяем unicode code point escapes
            .replace(/\\u\{([0-9A-F]+)\}/g, function (match, codePoint) {
              return String.fromCodePoint(parseInt(codePoint, 16));
            });
        }

        // Удаляем флаг 'u', если присутствует, т.к. он может вызывать проблемы
        if (flags && flags.includes("u")) {
          flags = flags.replace("u", "");
        }
      }

      // Вызываем оригинальный конструктор с обработанным шаблоном
      return new OriginalRegExp(pattern, flags);
    } catch (e) {
      // В случае ошибки в модификации регулярного выражения,
      // пробуем создать максимально простое рабочее регулярное выражение
      console.warn("Error in RegExp polyfill", e);
      return new OriginalRegExp(".*");
    }
  };

  // Копируем статические свойства и методы
  for (var prop in OriginalRegExp) {
    if (OriginalRegExp.hasOwnProperty(prop)) {
      window.RegExp[prop] = OriginalRegExp[prop];
    }
  }

  window.RegExp.prototype = OriginalRegExp.prototype;
  window.RegExp.prototype.constructor = window.RegExp;
})();
