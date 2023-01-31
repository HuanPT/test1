import "@assets/css/index.css";
import "@assets/css/responsiveIndex.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import { isEmail } from "./common";
// import { getDocs, collection } from "firebase/firestore";

// const productCollection = collection(db, "products");

// const products = await getDocs(productCollection);

// console.log(products.docs.map((item) => ({

// })));

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
    item.addEventListener("click", () => {
      item.closest(".form").classList.add("d-none");
    });
  });
};

window.onload = () => {
  hasText();
  closeBtn();
  inputEmail();
};
