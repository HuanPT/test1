import "@assets/css/index.css";
import "@assets/css/responsiveIndex.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import { isEmail } from "./common";

import { headerOnTop } from "./common";
// import { getDocs, collection } from "firebase/firestore";

// const productCollection = collection(db, "products");

// const products = await getDocs(productCollection);

// console.log(products.docs.map((item) => ({

// })));

const btn = document.querySelector(".header__login");
const login = document.querySelector(".login");
const formList = document.querySelector(".form__list");
const formLogin = document.querySelector(".login__form");
const formForget = document.querySelector(".forget__form");
const formConfirm = document.querySelector(".confirm__form");
const createPassword = document.querySelector(".createPassword__form");
const successPassword = document.querySelector(".successPassword__form");

const hasText = () => {
  const input = document.querySelectorAll(".input-tag");
  input.forEach((item) => {
    item.addEventListener("change", (e) => {
      const parent = item.closest(".label__input");
      if (e.target.value !== "") parent.classList.add("has-txt");
      else parent.classList.remove("has-txt");
    });
  });
};

const inputEmail = () => {
  const input = document.querySelectorAll(".input-tag");
  input.forEach((item) => {
    if (item.type == "email") {
      item.addEventListener("change", (e) => {});
    }
  });
};

const closeBtn = () => {
  const close = document.querySelectorAll(".close-btn");
  close.forEach((item) => {
    const parent = item.closest(".login");
    item.addEventListener("click", () => {
      item.closest(".form").classList.add("d-none");
    });
  });
};

const faqQuestions = () => {
  const toggles = document.querySelectorAll(".faq-question");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const child = toggle.querySelector(".icon-plus");
      const parse = toggle.closest("li");
      const answer = parse.querySelector(".answers");

      // check icon & answers
      const isRotateIcon = child.classList.contains("rotate-icon");
      const isOpenAnswers = answer.classList.contains("open-answers");

      // loop remove classList
      toggles.forEach((toggle) => {
        const child = toggle.querySelector(".icon-plus");
        const parse = toggle.closest("li");
        const answer = parse.querySelector(".answers");
        child.classList.remove("rotate-icon");
        answer.classList.remove("open-answers");
      });

      // toggle if !check
      child.classList.toggle("rotate-icon", !isRotateIcon);
      answer.classList.toggle("open-answers", !isOpenAnswers);
    });
  });
};

console.log(formList);

// const btnLogin = () => {
//   toggleLogin();
//   closeBtn();
//   btnForgot();
// };


window.onload = () => {
  hasText();
  // btnLogin();
  inputEmail();
  faqQuestions();
  headerOnTop();
};
