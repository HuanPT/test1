import "@assets/css/index.css";
import "@assets/css/home.css";

import * as api from "./api.js";
import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";
import * as customCarousel from "./customCarousel.js";

import { navSearchDesktop, navSearchMobile, navMobile } from "./common";
const header = document.querySelector("header");
const main = document.querySelector(".main");
const mainContainer = main.querySelector(".container");
const mainRow = mainContainer.querySelector(".row");

// const callAPI = (id) => {
//   fetch(
//     api.genresList +
//       new URLSearchParams({
//         api_key: api.api_key,
//         with_genres: id,
//       }) +
//       api.language
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data.genres);
//       data.genres.forEach((item, i) => {
//         if (i < 11 && i !== 5 && i !== 6) {
//           console.log(item.name, i);
//           if (i % 2 == 0) {
//             fetchMoviesListByGenres(item.id, item.name);
//           } else {
//             fetchMoviesListByCardBig(item.id, item.name);
//           }
//         }
//         if (i == 14) {
//           fetchMoviesListByCardBig(item.id, item.name);
//         }
//       });
//     });
// };

const callAPI = async (id) => {
  const response = await fetch(
    api.genresList +
      new URLSearchParams({
        api_key: api.api_key,
        with_genres: id,
      }) +
      api.language
  );
  const data = await response.json();

  let ids = [];
  data.genres.forEach((item, i) => {
    if (i < 11 && i !== 5 && i !== 6) {
      ids.push(item.id);
    }
    if (i == 14) {
      ids.push(item.id);
    }
  });

  for (let i = 0; i < ids.length; i++) {
    const genre = data.genres.find((genre) => genre.id === ids[i]);
    console.log(genre.name, i);
    if (i % 2 === 0) {
      await fetchMoviesListByGenres(genre.id, genre.name);
    } else {
      await fetchMoviesListByCardBig(genre.id, genre.name);
    }
  }
};

const fetchMoviesListByCardBig = (id, genres) => {
  fetch(
    api.movieGenresLink +
      new URLSearchParams({
        api_key: api.api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      setTimeout(makeCategoryElementBig(genres, data.results, id), 400);
    })
    .catch((err) => console.log("err"));
};

const makeCategoryElementBig = (category, data, id) => {
  mainRow.innerHTML += `
    <div class="col-12">
      <div class="section__movie-list">
        <div class="movie-category">
          <h1>${category}</h1>
          <a href="/search.html?with_genres=${id}" class="view-all">
            Xem tất cả
            <i class="fa-solid fa-angles-right"></i>
          </a>
        </div>
        <div class="movie__container">
          <div id="${category}" class="row gy-2">
          
          </div>
        </div>
      </div>
  `;
  makeCardsBig(category, data);
};

const makeCardsBig = (id, data) => {
  const movieContainer = document.getElementById(id);

  const colMd5 = document.createElement("div");
  colMd5.classList.add("col-12", "col-md-5");

  const colMd7 = document.createElement("div");
  colMd7.classList.add("col-md-7");
  const rowG2 = document.createElement("div");
  rowG2.classList.add("row", "gy-2");
  colMd7.appendChild(rowG2);

  movieContainer.append(colMd5, colMd7);

  // console.log(data);
  data.forEach((item, i) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }
    if (i < 11) {
      if (i == 0) {
        colMd5.innerHTML += `
          <div class="card__movie card__movie-big">
          <a href="/movie.html?${item.id}" title="${item.title}">
            <img src="${api.imgOriginalUrl}${item.backdrop_path}" alt="${item.title}">
            <p class="movie-title">${item.title}</p>
            <div class="icon-play">
              <i class="fa-solid fa-play"></i>
            </div>
          </a>
        </div>
        `;
      }
      if (i > 0 && i < 7) {
        rowG2.innerHTML += `
          <div class="col-6 col-md-4">
            <div class="card__movie">
              <a href="/movie.html?${item.id}" title="${item.title}">
                <img src="${api.imgUrlW533}${item.backdrop_path}" alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                  <i class="fa-solid fa-play"></i>
                </div>
              </a>
            </div>
          </div>
        `;
      }
      if (i > 6 && i <= 10) {
        movieContainer.innerHTML += `
          <div class="col-6 col-md-3">
            <div class="card__movie">
              <a href="/movie.html?${item.id}" title="${item.title}">
                <img src="${api.imgUrlW533}${item.backdrop_path}" alt="${item.title}">
                <p class="movie-title">${item.title}</p>
                <div class="icon-play">
                  <i class="fa-solid fa-play"></i>
                </div>
              </a>
            </div>
          </div>
        `;
      }
    }
  });
};

const fetchMoviesListByGenres = (id, genres) => {
  fetch(
    api.movieGenresLink +
      new URLSearchParams({
        api_key: api.api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1,
      }) +
      api.language
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setTimeout(makeCategoryElementSlide(genres, data.results, id), 400);
    })
    .then((data) => {
      customCarousel.carousel(data);
    })
    .catch((err) => console.log("err"));
};

const makeCategoryElementSlide = (category, data, id) => {
  mainRow.innerHTML += `
    <div class="col-12">
      <div class="section__movie-list">
        <div class="movie-category">
          <h1>${category}</h1>
          <a href="/search.html?with_genres=${id}" class="view-all">
            Xem tất cả
            <i class="fa-solid fa-angles-right"></i>
          </a>
        </div>
        <div class="movie__container">
          <div id="${category}" class="owl-carousel owl-theme nominated-slide">
          
          </div>
        </div>
      </div>
  `;
  makeCardsSlide(category, data);
};

const makeCardsSlide = (id, data) => {
  const movieContainer = document.getElementById(id);
  data.forEach((item) => {
    if (item.backdrop_path == null) {
      item.backdrop_path = item.poster_path;
      if (item.backdrop_path == null) {
        return;
      }
    }
    movieContainer.innerHTML += `
      <div class="item">
        <div class="card__movie">
          <a href="/movie.html?${item.id}" title="${item.title}">
            <img src="${api.imgUrlW533}${item.backdrop_path}" alt="${item.title}">
            <p class="movie-title">${item.title}</p>
            <div class="icon-play">
              <i class="fa-solid fa-play"></i>
            </div>
          </a>
        </div>
      </div>
    `;
  });
};

window.onload = () => {
  callAPI();
  navSearchMobile();
  navSearchDesktop();
  navMobile();
};
