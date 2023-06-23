"use strict";

const dailyEl = document.querySelector(".daily");
const weeklyEl = document.querySelector(".weekly");
const monthlyEl = document.querySelector(".monthly");
const detialEls = document.querySelectorAll(".main-card__detail");
let descEls = document.querySelectorAll(".description");
let taskDurationCurrentEls = document.querySelectorAll(
  ".card__task-duration-current"
);

let prevEls = document.querySelectorAll(".total-hrs");

let result;

fetch("./src/data.json")
  .then((res) => res.json())
  .then((data) => {
    result = data;
  });

function toggleCurrent(data, query) {
  return data.map((item) => {
    return item.timeframes[query];
  });
}

function hrsToggle(e) {
  let clicked = e.target.textContent.toLowerCase();
  toggleStyle(detialEls);
  e.target.classList.add("active");

  let miniData = toggleCurrent(result, clicked);
  let current = miniData.map((item) => item.current);
  let previous = miniData.map((item) => item.previous);
  descEls.forEach((el) => {
    el.textContent =
      clicked === "daily" ? "Day" : clicked === "weekly" ? "Week" : "Month";
  });
  taskDurationCurrentEls.forEach((el, id) => {
    el.textContent = `${current[id]}hrs`;
  });

  prevEls.forEach((el, id) => {
    el.textContent = `${previous[id]}hrs`;
  });
}

function toggleStyle(els) {
  els.forEach((el) => {
    el.classList.remove("active");
  });
}

document.addEventListener("click", hrsToggle);
