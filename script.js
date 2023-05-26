const boxContainer = document.getElementById("word");
const historyContainer = document.getElementById("history");
const historyBtn = document.getElementById("history-nav-btn");
const autoSearchContainer = document.getElementById("auto-search");
const autoSearchBtn = document.getElementById("auto-search-nav-btn");
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
      console.log(data);
      displayWord(data[0]);
      //   search();
    })
    .catch((err) => console.log("not found", err));
}
getWord();

function diplayHistory() {
  mappedHistory = history.map((word) => `<li>${word}</li>`);

  if (history) {
    historyContainer.innerHTML = `<ol>${mappedHistory.join(" ")}</ol>`;
  } else {
    historyContainer.textContent = "Empty";
  }

  if (historyBtn.textContent == "History") {
    historyContainer.style.display = "flex";
  } else {
    historyBtn.textContent = "History";
  }
  closeSection();
}

function diplayAutoSearch() {
  if (autoSearchBtn.textContent == "Auto Search") {
    autoSearchContainer.style.display = "flex";
  } else {
    autoSearchContainer.style.display = "none";
    autoSearchBtn.textContent = "Auto Search";
  }
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

// Auto Search Section Code
let tabsCount = 0;
let setTabMaker;

function autoSearch() {
  setTabMaker = setInterval(createTabs, 5000);
}

function createTabs() {
  url = `https://www.bing.com/search?q=${history[history.length - 1]}`;
  window.open(url, "_blank");
  getWord();

  tabsCount++;

  const numOfTabs = document.getElementById("num-of-searches").value;
  if (tabsCount >= numOfTabs) {
    clearInterval(setTabMaker);
    tabsCount = 0;
  }
}
