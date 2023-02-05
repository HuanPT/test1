import "@assets/css/index.css";
import "@assets/css/movie.css";
import "@assets/css/person.css";
import "@assets/css/search.css";
import "@assets/css/responsiveIndex.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as api from "./api.js";
import {
  navSearchDesktop,
  navSearchMobile,
  backToTop,
  headerOnTop,
} from "./common";

let keyword = decodeURI(location.search);

let genresId = location.search.replace("?with_genres=", "");

const searchTrendingDay = () => {
  fetch(
    api.trendingDay +
      new URLSearchParams({
        api_key: api.api_key,
        page: page,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      configPrevBtn(data);
      configNextBtn(data);
      renderListSearch(data);
    });
};

const searchTrendingWeek = () => {
  fetch(
    api.trendingWeek +
      new URLSearchParams({
        api_key: api.api_key,
        page: page,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      configPrevBtn(data);
      configNextBtn(data);
      renderListSearch(data);
    });
};

let page = 1;

const searchGenresId = (genresId) => {
  fetch(
    api.movieGenresLink +
      new URLSearchParams({
        api_key: api.api_key,
        with_genres: genresId,
        page: page,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      configPrevBtn(data);
      configNextBtn(data);
      renderListSearch(data);
    });
};

const searchKeyword = () => {
  fetch(
    api.searchMovie +
      new URLSearchParams({
        api_key: api.api_key,
      }) +
      api.language +
      "&page=" +
      page +
      `&query=${keyword.replace("?q=", "")}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      configPrevBtn(data);
      configNextBtn(data);
      renderListSearch(data);
    });
};

const renderListSearch = (data) => {
  const items = data.results;
  const list = document.querySelector(".list__film");
  list.innerHTML = "";
  items.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }
    list.innerHTML += `
        <li class="card__movie">
            <a href="./movie.html?${item.id}" class="d-block d-md-none" title="${item.title}">
                <img src="${api.imgUrlW533}${item.backdrop_path}"
                    alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                    <i class="fa-solid fa-play"></i>
                </div>
            </a>
            <a href="./movie.html?${item.id}" class="d-none d-md-block" title="${item.title}">
                <img src="${api.imgUrlW220}${item.poster_path}" alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                    <i class="fa-solid fa-play"></i>
                </div>
            </a>
        </li>
        `;
  });
  keyWord(data);
};

const keyWord = (data) => {
  const title = document.querySelector(".search__title");

  if (isKeyword) {
    title.innerHTML = `Danh sách ${genresId.toLowerCase()}`;
  }
  if (isQuery) {
    if (data.results == 0) {
      title.innerHTML = `Không có kết quả cho từ khóa: ${keyword.replace(
        "?q=",
        ""
      )}`;
    } else {
      title.innerHTML = `Từ khóa: ${keyword.replace("?q=", "")}`;
    }
  }
  if (isDay) {
    title.innerHTML = `Danh sách phim HOT hôm nay:`;
  }
  if (isWeek) {
    title.innerHTML = `Danh sách phim HOT tuần này:`;
  }
};

const fetchFilterGenres = () => {
  fetch(
    api.genresList +
      new URLSearchParams({
        api_key: api.api_key,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      listGenres(data);
    });
};

const listGenres = (data) => {
  console.log(data);
  const genres = document.querySelector("#filter__item-genres");
  console.log(genres);
  genres.innerHTML += `
      <option value> -- Thể loại -- </option>
      `;
  data.genres.forEach((item, i) => {
    if (item.id == genresId) {
      genresId = item.name;
    }
    if (i <= 14) {
      genres.innerHTML += `
        <option value="${item.id}" href="/search.html?with_genres=${item.id}">${item.name}</option>
      `;
    }
  });
};

fetch(
  api.countryList +
    new URLSearchParams({
      api_key: api.api_key,
    }) +
    api.language
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    filterCountry(data);
  });

const filterCountry = (data) => {
  const country = document.querySelector("#filter__item-country");
  console.log(country);
  country.innerHTML += `
    <option value> -- Quốc gia -- </option>
  `;
  data.filter((item) => {
    const codeItem = item.iso_3166_1;
    if (
      codeItem == "JP" ||
      codeItem == "CN" ||
      codeItem == "US" ||
      codeItem == "KR" ||
      codeItem == "GB" ||
      codeItem == "IN" ||
      codeItem == "TH" ||
      codeItem == "TW"
    ) {
      console.log(item);
      country.innerHTML += `
        <option value="${codeItem}">${item.native_name}</option>
      `;
    }
  });
};

const filterYear = () => {
  const year = document.querySelector("#filter__item-years");
  for (let i = 2023; i > 2011; i--) {
    if (i == 2023) {
      year.innerHTML += `
      <option value> -- Năm -- </option>
      `;
    } else if (i < 2023 && i > 2012) {
      year.innerHTML += `
       <option value="${i}">${i}</option>
      `;
    } else {
      year.innerHTML += `
       <option value="${i}">trước ${i}</option>
      `;
    }
  }
};

const isKeyword = keyword.includes("?with_genres=");
const isDay = keyword.includes("?day");
const isQuery = keyword.includes("?q=");
const isWeek = keyword.includes("?week");

const checkSearch = () => {
  if (isKeyword) return searchGenresId(genresId);
  if (isDay) return searchTrendingDay();
  if (isQuery) return searchKeyword();
  if (isWeek) return searchTrendingWeek();
};

const prevBtn = () => {
  const currentPage = document.querySelector(".current-page");
  const prevBtn = document.querySelector(".previous-page");
  prevBtn.addEventListener("click", () => {
    page--;
    currentPage.innerHTML = page;
    backToTop();
    checkSearch();
  });
};

const nextBtn = () => {
  const currentPage = document.querySelector(".current-page");
  const nextBtn = document.querySelector(".next-page");
  nextBtn.addEventListener("click", () => {
    page++;
    currentPage.innerHTML = page;
    backToTop();
    checkSearch();
  });
};

const configNextBtn = (data) => {
  const prevBtn = document.querySelector(".previous-page");
  const parentPrevBtn = prevBtn.closest("li");
  const nextBtn = document.querySelector(".next-page");
  const parentNextBtn = nextBtn.closest("li");

  if (page > 1) {
    parentPrevBtn.classList.remove("disabled");
    parentPrevBtn.style.cursor = "pointer";
  }
  if (page == data.total_pages) {
    parentNextBtn.classList.add("disabled");
    parentNextBtn.style.cursor = "no-drop";
  }
};

const configPrevBtn = (data) => {
  const prevBtn = document.querySelector(".previous-page");
  const parentPrevBtn = prevBtn.closest("li");
  const nextBtn = document.querySelector(".next-page");
  const parentNextBtn = nextBtn.closest("li");

  if (page == 1) {
    parentPrevBtn.classList.add("disabled");
    parentPrevBtn.style.cursor = "no-drop";
  }
  if (page < data.total_pages) {
    parentNextBtn.classList.remove("disabled");
    parentNextBtn.style.cursor = "pointer";
  }
};

const pagination = () => {
  prevBtn();
  nextBtn();
};

window.onload = () => {
  fetchFilterGenres();
  checkSearch();
  pagination();
  filterYear();
  navSearchDesktop();
  navSearchMobile();
  headerOnTop();
};
