import data from "./assets/Fitness-video-data.js";

const playVideoBtn = document.getElementById("play-video-btn");
const videoPlayingSection = document.getElementById("video-playing");
const playVideoContent = document.getElementById("play-video-content");
const stopVideo = document.getElementById("stop-video");
const estimatedVideoLeft = document.getElementById("estimated-video-left");
const videoDuration = document.getElementById("video-duration");
const vidoesWatched = document.getElementById("videos-watched");
let currentId;

playVideoBtn.addEventListener("click", createVideoTab);
stopVideo.addEventListener("click", stopVideoTimeOut);

sessionStorage.setItem("videosPlayed", 0);
let videosPlayed = sessionStorage.getItem("videosPlayed");
let count = 0;

let setCounter;
let setVideoTimeOut;

function checkLocalStorage() {
  if (localStorage.hasOwnProperty("currentId")) {
    currentId = localStorage.getItem("currentId");
    videoDuration.textContent = data[currentId].duration;
  } else {
    localStorage.setItem("currentId", 0);
    checkLocalStorage();
  }
}
checkLocalStorage();

function createVideoTab() {
  displayVideoPlayingSection();

  let { duration, url } = data[currentId];
  videoDuration.textContent = duration;

  window.open(`https://www.msn.com/en-us/health/fitnessworkoutvideo/${url}`, "_blank");
  // console.log(currentId); // -------------------------------------

  setCounter = setInterval(counter, 1000);
  setVideoTimeOut = setTimeout(videoEnded, (duration + 5) * 1000);
  count = duration + 5;
}

function displayVideoPlayingSection() {
  videoPlayingSection.style.display = "flex";
  playVideoContent.style.display = "none";
}
function hideVideoPlayingSection() {
  videoPlayingSection.style.display = "none";
  playVideoContent.style.display = "flex";
}

function reachedLimitWarning() {
  vidoesWatched.parentElement.textContent = `You have reached the limit of videos you can watch each day.`;
  playVideoBtn.textContent = "Play Anyway";
}

function videoEnded() {
  sessionStorage.setItem("videosPlayed", videosPlayed++);
  vidoesWatched.textContent = videosPlayed;
  if (videosPlayed == 2) reachedLimitWarning();

  currentId++;
  if (currentId >= data.length) currentId = 0;
  console.log(currentId);

  localStorage.setItem("currentId", currentId);
  stopVideoTimeOut();
}

function stopVideoTimeOut() {
  count = 0;
  clearInterval(setCounter);
  clearTimeout(setVideoTimeOut);
  hideVideoPlayingSection();
  estimatedVideoLeft.textContent = "_-_";
}

function counter() {
  estimatedVideoLeft.textContent = count;
  count--;
}
