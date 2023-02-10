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

export const loading = () => {
  setTimeout(() => {
    document.querySelector(".loading").style.display = "none";
  }, 1000);
};

export function headerOnTop() {
  const header = document.querySelector("header");
  let height = 0,
    currentHeight;

  window.addEventListener("scroll", () => {
    currentHeight = document.documentElement.scrollTop;
    if (height < currentHeight) {
      header.style.top = "-70px";
      height = currentHeight;
    } else {
      header.style.top = "0";

      currentHeight == 80
        ? (header.style.background = "transparent")
        : (header.style.background = "#131313");

      height = currentHeight;
    }
    if (currentHeight == 0) {
      header.style.top = "0";
      header.style.background = "transparent";
    }
  });
}

export function getURLparams() {
  let params = {};
  let query = location.search.substring(1);
  console.log(query);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair.length === 1) {
      params[pair[0]] = "";
    } else {
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
  }
  return params;
}

export const selectedHash = () => {
  let hash = location.hash.substring(1);
  console.log(hash);
  const getHash = document.getElementById(hash);
  getHash.click();
  backToTop();
};

export function isEmail(value, message) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(value) ? undefined : message || "Trường này phải là email";
}
