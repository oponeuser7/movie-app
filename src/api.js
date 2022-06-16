import axios from 'axios';

const API = axios.create({
  baseURL: "//127.0.0.1:8080/movie/movie-server/",
  headers: {
    "Content-Type": "application/json",
  }
});

const APIQS = axios.create({
  baseURL: "//127.0.0.1:8080/movie/movie-server/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
});

const objToList = (obj) => {
  let temp = [];
  for(const key in obj) temp.push(Object.values(obj[key]));
  return temp;
};

export { API, APIQS, objToList };
