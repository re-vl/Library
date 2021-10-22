import $ from "./lib/lib";

// инициализация модального окна скриптом
$("#trigger").click(() =>
   $("#trigger").createModal({
      text: {
         title: "Modal title #1",
         body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum minus doloremque nesciunt enim rem quam corporis? Dolorem pariatur magnam distinctio perferendis. Ratione dolorem voluptates iusto facilis odit veritatis, suscipit voluptatibus!",
      },
      btns: {
         settings: [
            ["Close", ["btn-danger", "mr-10"], true],
            [
               "Save changes",
               ["btn-success"],
               false,
               () => {
                  alert("Данные сохранены");
               },
            ],
            [
               "Another btn",
               ["btn-warning", "ml-10"],
               false,
               () => {
                  alert("Another alert");
               },
            ],
         ],
      },
   })
);

// инициализация карусели скриптом
$("#exampleCarousel2")
   .createCarousel({
      width: 850,
      height: 450,
      slides: [
         {
            src: "https://tushlar.ru/wp-content/uploads/2021/02/tushda-mashina-1.jpg",
            alt: "white-car",
         },
         {
            src: "https://img1.goodfon.ru/original/1280x720/6/a1/lamborghini-aventador-1634.jpg",
            alt: "red-car",
         },
         {
            src: "https://img2.goodfon.ru/original/1280x720/7/99/lamborghini-murcielago-5124.jpg",
            alt: "yellow-car",
         },
      ],
   })
   .carousel(8000);
