import $ from "../core";
import maskPhone from "../services/maskPhone";
import JustValidate from "../services/just-validate.js";

$.prototype.forms = function () {
   for (let i = 0; i < this.length; i++) {
      const form = this[i],
         inputTel = form.querySelectorAll(".form_input.tel");

      maskPhone(inputTel);

      const changeCaption = () => {
         let fileInput = form.querySelector(".file_input");

         fileInput
            .closest(".form_grup")
            .querySelector(".form_label").textContent = "Прикрепить файл";

         fileInput.addEventListener("change", (e) => {
            let files = e.currentTarget.files,
               len = files.length;

            console.log(files);

            if (len) {
               fileInput
                  .closest(".form_grup")
                  .querySelector(
                     ".form_label"
                  ).textContent = `Прикреплено файлов ${len}`;
            }
         });
      };

      let validateForms = function (selector, rules, successModal, yaGoal) {
         changeCaption(selector);
         new window.JustValidate(selector, {
            rules: rules,
            submitHandler: function (form) {
               let formData = new FormData(form);

               let xhr = new XMLHttpRequest();

               xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4) {
                     if (xhr.status === 200) {
                        console.log("Отправлено");
                     }
                  }
               };

               xhr.open("POST", "PHPMailer/mail.php", true);
               xhr.send(formData);

               form.reset();

               changeCaption(selector);
            },
         });
      };
      validateForms(
         form,
         { email: { required: true, email: true }, tel: { required: true } },
         ".thanks-popup",
         "send goal"
      );
   }
};

$(".form").forms();
