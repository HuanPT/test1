import "@assets/css/index.css";
import "@assets/css/movie.css";
import "@assets/css/search.css";
import "@assets/css/person.css";

import "@fortawesome/fontawesome-free/js/all.min.js";

import "bootstrap/dist/js/bootstrap.min.js";

import * as api from "./api.js";

import {
  navSearchDesktop,
  navSearchMobile,
  navMobile,
  headerOnTop,
  selectedHash,
} from "./common.js";

window.onload = () => {
  navSearchDesktop();
  navSearchMobile();
  navMobile();
  headerOnTop();
  selectedHash();
};
