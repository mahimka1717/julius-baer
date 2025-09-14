// SplitText патч для старых версий Safari
// Этот файл заменяет проблемное регулярное выражение в SplitText GSAP

(function () {
  // Проверяем, нужен ли патч для Safari (старые версии)
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const needsPolyfill =
    isSafari && !/Version\/1[4-9]/i.test(navigator.userAgent);

  if (needsPolyfill) {
    console.log("SplitText patch for old Safari loaded");

    // Глобальная переменная для хранения оригинального RegExp
    window.__gsapOriginalRegExp = window.RegExp;

    // Переопределяем конструктор RegExp для специальной обработки SplitText
    window.RegExp = function (pattern, flags) {
      // Проверяем на конкретный паттерн из SplitText
      if (
        typeof pattern === "string" &&
        pattern.includes("\\p{RI}\\p{RI}|\\p{Emoji}") &&
        flags === "gu"
      ) {
        console.log("Intercepted SplitText RegExp creation");
        pattern = "(.|\r|\n)"; // Заменяем на простое выражение
        flags = "g"; // Удаляем флаг 'u'
      }

      // Вызываем оригинальный конструктор
      return new window.__gsapOriginalRegExp(pattern, flags);
    };

    // Копируем свойства оригинального RegExp
    for (let prop in window.__gsapOriginalRegExp) {
      if (window.__gsapOriginalRegExp.hasOwnProperty(prop)) {
        window.RegExp[prop] = window.__gsapOriginalRegExp[prop];
      }
    }

    // Устанавливаем правильный прототип
    window.RegExp.prototype = window.__gsapOriginalRegExp.prototype;

    // Переопределяем метод test для специальной обработки Unicode регулярных выражений
    const originalTest = RegExp.prototype.test;
    RegExp.prototype.test = function (str) {
      if (this.toString().includes("\\p{") && this.toString().includes("u")) {
        // Для Unicode регулярных выражений возвращаем безопасный результат
        return true; // Упрощённая логика для SplitText
      }
      return originalTest.call(this, str);
    };

    // Переопределяем метод exec для специальной обработки Unicode регулярных выражений
    const originalExec = RegExp.prototype.exec;
    RegExp.prototype.exec = function (str) {
      if (this.toString().includes("\\p{") && this.toString().includes("u")) {
        // Возвращаем простой результат для Unicode регулярных выражений
        if (!str || typeof str !== "string" || str.length === 0) return null;
        const result = [str[0]];
        result.index = 0;
        result.input = str;
        return result;
      }
      return originalExec.call(this, str);
    };
  }
})();
