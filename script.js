const boxContainer = document.getElementById("word");

const historyContainer = document.getElementById("history");
const historyBtn = document.getElementById("history-nav-btn");

const autoSearchContainer = document.getElementById("auto-search");
const autoSearchBtn = document.getElementById("auto-search-nav-btn");
const autoSearchForm = document.getElementById("auto-search-form");
const processingTabs = document.getElementById("processing-tabs");

const closeBtn = document.getElementById("close-btn");

let history = [];

function displayWord(word) {
  word = word[0].toUpperCase() + word.slice(1);
  history.push(word);
  boxContainer.textContent = word;
}

function search() {
  url = `https://www.bing.com/search?q=${history[history.length - 1]}`;
  window.open(url, "_blank");
}

function getWord() {
  // Making Https request (Documentation for API: https://random-word-api.herokuapp.com/home)
  fetch(`https://random-word-api.herokuapp.com/word`)
    .then((result) => result.json())
    .then((data) => {
      // console.log(data); // Log the response to console
      displayWord(data[0]);
    })
    .catch((err) => console.log("not found", err));
}
getWord();

// This is to make history and auto search buttons in navbar work. Also, for the close button that appears when any of these buttons are clicked.
function diplayHistory() {
  mappedHistory = history.map((word) => `<li>${word}</li>`);

  historyContainer.innerHTML = `<ol>${mappedHistory.join(" ")}</ol>`;

  historyContainer.style.display = "flex";

  closeSection();
}

function diplayAutoSearch() {
  autoSearchContainer.style.display = "flex";
  closeSection();
}

function closeSection() {
  if (closeBtn.style.display == "block") {
    closeBtn.style.display = "none";
    autoSearchContainer.style.display = "none";
    historyContainer.style.display = "none";
  } else {
    closeBtn.style.display = "block";
  }
}

//handling the submit of auto-search form
function diplayProcessingTabs() {
  autoSearchForm.style.display = "none";
  processingTabs.style.display = "flex";
}

function hideProcessingTabs() {
  autoSearchForm.style.display = "flex";
  processingTabs.style.display = "none";
}

// Auto Search Section Code
let tabsCount = 0;
let setTabMaker;
const searchInterval = document.getElementById("search-interval").value;

function autoSearch() {
  diplayProcessingTabs();
  setTabMaker = setInterval(createTabs, searchInterval * 1000);
  // createTabs(); // So the the funtion is executed immediately, instead of waiting for setInterval
}

// These are called so the content in processing-tabs can be updated as the tabs are generated
const tabsCreated = document.getElementById("tabs-created");
const tabsLeft = document.getElementById("tabs-left");
const estimatedTimeLeft = document.getElementById("estimated-time-left");

function createTabs() {
  url = `https://www.bing.com/search?q=${history[history.length - 1]}`;
  window.open(url, "_blank");
  getWord();

  tabsCount++;

  let numOfSearches = document.getElementById("num-of-searches").value;

  if (numOfSearches > 30) numOfSearches = 30;
  else if (numOfSearches < 2) numOfSearches = 2;

  // calculation for numbers that will be displayed in processing-tabs
  tabsCreated.textContent = tabsCount;
  tabsLeft.textContent = numOfSearches - tabsCount;
  estimatedTimeLeft.textContent = (numOfSearches - tabsCount) * searchInterval;

  if (tabsCount >= numOfSearches) {
    stopAutoSearch();
  }
}

function stopAutoSearch() {
  clearInterval(setTabMaker);
  tabsCount = 0;
  hideProcessingTabs();

  // Reseting the values
  tabsCreated.textContent = "_-_";
  tabsLeft.textContent = "_-_";
  estimatedTimeLeft.textContent = "_-_";
}

// Here we calculate the estimated time and the points inside auto-search
const totalPoints = document.getElementById("total-points");
const numOfTabs = document.getElementById("num-of-tabs");
const estimatedTime = document.getElementById("estimated-time");

function calculatePoints() {
  let tabs = document.getElementById("num-of-searches").value;

  if (tabs > 30) tabs = 30;
  else if (tabs < 2) tabs = 2;

  totalPoints.textContent = tabs * 3;
  numOfTabs.textContent = tabs;
  estimatedTime.textContent = tabs * searchInterval;
}
calculatePoints();
