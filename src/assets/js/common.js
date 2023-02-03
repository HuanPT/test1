export const navSearchDesktop = () => {
  const inputDesktop = document.querySelector("#search__desktop");
  console.log(inputDesktop);
  inputDesktop.addEventListener("change", (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(e.keycode);
    if (e.target.value !== "") {
      window.location.href = `./search.html?q=${e.target.value}`;
    }
  });
};

export const navSearchMobile = () => {
  const inputMobile = document.querySelector("#search__mobile");
  inputMobile.addEventListener("blur", (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value !== "") {
      window.location.href = `./search.html?q=${e.target.value}`;
    }
  });
};

export const navMobile = () => {
  const btnNav = document.querySelector(".btn__navbars");
  const nav = document.querySelector(".navbars__mobile-detail");
  const overlay = nav.querySelector(".overlay");
  btnNav.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
  overlay.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
};

export function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function getURLparams() {
  let params = {};
  let query = location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}

export function isEmail(value, message) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(value) ? undefined : message || "Trường này phải là email";
}

