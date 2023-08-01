const boxContainer = document.getElementById("word");

const historyContainer = document.getElementById("history");

const autoSearchContainer = document.getElementById("auto-search");
const autoSearchForm = document.getElementById("auto-search-form");
const autoCloseTabs = document.getElementById("auto-close-tabs");
const processingTabs = document.getElementById("processing-tabs");
const closeTabsBtn = document.getElementById("close-tabs-btn");

let history = [];

// This is to make history and auto search buttons in navbar work. Also, for the close button that appears when any of these buttons are clicked.
function displayHistory() {
  mappedHistory = history.map((word) => `<li>${word}</li>`);
  historyContainer.innerHTML = `<ol>${mappedHistory.join(" ")}</ol>`;
  historyContainer.style.display = "flex";
  closeSection();
}

//handling the submit of auto-search form
function displayProcessingTabs() {
  autoSearchForm.style.display = "none";
  processingTabs.style.display = "flex";
}

function hideProcessingTabs() {
  autoSearchForm.style.display = "flex";
  processingTabs.style.display = "none";
  displayCloseTabsBtn();
}

async function getWord() {
  // Making Https request (Documentation for API: https://random-word-api.herokuapp.com/home)
  try {
    const result = await fetch(`https://random-word-api.herokuapp.com/word`);
    const data = await result.json();
    // console.log(data); // Log the response to console
    let word = data[0];
    word = word[0].toUpperCase() + word.slice(1);

    history.push(word);
    return word;
  } catch (err) {
    console.log("not found", err);
  }
}
getWord();

// Auto Search Section Code
let tabsCount = 0;
let setTabMaker;

function getSearchInterval() {
  return document.getElementById("search-interval").value;
}

function autoSearch() {
  let searchInterval = getSearchInterval();
  displayProcessingTabs();
  setTabMaker = setInterval(createTabs, searchInterval * 1000);
}

let createdTabsList = [];

async function search() {
  word = await getWord();
  url = `https://www.bing.com/search?q=${word}`;
  let tab = window.open(url, "_blank");
  createdTabsList.push(tab);
  if (autoCloseTabs.checked && createdTabsList.length > 5) closeTabs(2);
}

// These are called so the content in processing-tabs can be updated as the tabs are generated
const numTabsCreated = document.getElementById("tabs-created");
const numTabsLeft = document.getElementById("tabs-left");
const estimatedTimeLeft = document.getElementById("estimated-time-left");

async function createTabs() {
  await search();

  tabsCount++;

  let numOfSearches = document.getElementById("num-of-searches").value;
  let searchInterval = getSearchInterval();

  if (numOfSearches > 30) numOfSearches = 30;
  else if (numOfSearches < 2) numOfSearches = 2;

  // calculation for numbers that will be displayed in processing-tabs
  numTabsCreated.textContent = tabsCount;
  numTabsLeft.textContent = numOfSearches - tabsCount;
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
  numTabsCreated.textContent = "_-_";
  numTabsLeft.textContent = "_-_";
  estimatedTimeLeft.textContent = "_-_";

  if (autoCloseTabs.checked) setTimeout(closeTabs, 5000);
}

// Here we calculate the estimated time and the points inside auto-search
const totalPoints = document.getElementById("total-points");
const numOfTabs = document.getElementById("num-of-tabs");
const estimatedTime = document.getElementById("estimated-time");

function calculatePoints() {
  let tabs = document.getElementById("num-of-searches").value;
  let searchInterval = getSearchInterval();

  if (tabs > 30) tabs = 30;
  else if (tabs < 2) tabs = 2;

  totalPoints.textContent = tabs * 3;
  numOfTabs.textContent = tabs;
  estimatedTime.textContent = tabs * searchInterval;
}
calculatePoints();

function closeTabs(num) {
  if (!num) num = createdTabsList.length;

  for (let i = 0; i < num; i++) {
    createdTabsList[0].close();
    createdTabsList.shift();
  }
  displayCloseTabsBtn();
}

function displayCloseTabsBtn() {
  if (createdTabsList.length != 0) {
    closeTabsBtn.style.display = "inline";
  } else {
    closeTabsBtn.style.display = "none";
  }
}
