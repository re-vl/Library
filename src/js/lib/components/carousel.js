import $ from "../core";

// управление каруселью с заранее заданной разметкой
$.prototype.carousel = function (autoPlayDur = 0) {
   let paused;

   for (let i = 0; i < this.length; i++) {
      const width = window.getComputedStyle(
            this[i].querySelector(".carousel-inner")
         ).width,
         slidesField = this[i].querySelector(".carousel-slides"),
         slides = [...this[i].getElementsByClassName("carousel-item")],
         dots = [...this[i].getElementsByTagName("li")];

      let offset = 0,
         slideIndex = 0;

      // вычесление и установка ширины поля слайдов
      slidesField.style.width = 100 * slides.length + "%";
      slides.forEach((slide) => {
         slide.style.width = width;
      });

      const changeSlide = () => {
         slidesField.style.transform = `translateX(${-offset}px)`;
         $(slidesField).fadeOut(400, () => {
            $(slidesField).fadeIn(400, "flex");
         });

         dots.forEach((dot) => dot.classList.remove("active"));
         dots[slideIndex].classList.add("active");
      };

      $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
         e.preventDefault();

         if (offset == 0) {
            offset = +width.replace(/\D/g, "") * (slides.length - 1);
            slideIndex = slides.length - 1;
         } else {
            offset -= +width.replace(/\D/g, "");
            slideIndex--;
         }
         changeSlide();
      });

      $(this[i].querySelector('[data-slide="next"]')).click((e) => {
         e.preventDefault();

         if (offset == +width.replace(/\D/g, "") * (slides.length - 1)) {
            offset = 0;
            slideIndex = 0;
         } else {
            offset += +width.replace(/\D/g, "");
            slideIndex++;
         }
         changeSlide();
      });

      // перебор точек
      const sliderId = this[i].getAttribute("id");
      $(`#${sliderId} .carousel-indicators li`).click((e) => {
         const slideTo = e.target.getAttribute("data-slide-to");

         slideIndex = slideTo;
         offset = +width.replace(/\D/g, "") * slideTo;

         changeSlide();
      });

      const activateAnimation = () => {
         if (autoPlayDur) {
            paused = setInterval(function () {
               let event = new Event("click");

               document
                  .querySelector(`#${sliderId} > a.carousel-next`)
                  .dispatchEvent(event);
            }, autoPlayDur);
         }
      };
      activateAnimation();

      this[0].addEventListener("mouseenter", () => {
         clearInterval(paused);
      });
      this[0].addEventListener("mouseleave", () => {
         activateAnimation();
      });
   }
};

$("#example").carousel(9000);

// Формирование карусели программно, в разметке должно быть <div class="carousel" id="example-2"></div>
//setCaourusel = { width, height, slides: [{ src: "", alt: "" }] }
$.prototype.createCarousel = function (setCarousel) {
   for (let i = 0; i < this.length; i++) {
      const countSlides = setCarousel.slides.length;

      this[i].style.width = setCarousel.width + "px";
      this[i].style.height = setCarousel.height + "px";

      this[i].innerHTML = `
         <ol class="carousel-indicators"></ol>
         <div class="carousel-inner">
            <div class="carousel-slides"></div>
         </div>
         <a href="#" class="carousel-prev" data-slide="prev">
            <span class="carousel-prev-icon">&lt;</span>
         </a>
         <a href="#" class="carousel-next" data-slide="next">
            <span class="carousel-next-icon">&gt;</span>
         </a>
      `;

      for (let j = 0; j < countSlides; j++) {
         const dotItem = document.createElement("li"),
            slideItem = document.createElement("div"),
            slideImg = document.createElement("img");

         dotItem.setAttribute("data-slide-to", `${j}`);
         this[i].querySelector(".carousel-indicators").appendChild(dotItem);

         if (j == 0) {
            dotItem.classList.add("active");
         }

         this[i].querySelector(".carousel-slides").appendChild(slideItem);
         slideItem.classList.add("carousel-item");
         slideItem.style.width = this[i].style.width;
         slideItem.appendChild(slideImg);
         slideImg.setAttribute("src", setCarousel.slides[j]["src"]);
         slideImg.setAttribute("alt", setCarousel.slides[j]["alt"]);
      }
   }
   return this;
};
