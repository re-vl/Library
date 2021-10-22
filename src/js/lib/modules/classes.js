import $ from "../core";

//формат вызова $("selector").addClass("class1", "class2", …)
// Добавление классов
$.prototype.addClass = function (...classNames) {
   for (let i = 0; i < this.length; i++) {
      if (classNames.length === 0) {
         continue;
      }
      this[i].classList.add(...classNames);
   }

   return this;
};

//Удаление классов
$.prototype.removeClass = function (...classNames) {
   for (let i = 0; i < this.length; i++) {
      if (!this[i].classList.contains(classNames)) {
         continue;
      }
      this[i].classList.remove(...classNames);
   }

   return this;
};

// Переключение классов
$.prototype.toggleClass = function (className) {
   for (let i = 0; i < this.length; i++) {
      if (!className) {
         continue;
      }
      this[i].classList.toggle(className);
   }

   return this;
};
