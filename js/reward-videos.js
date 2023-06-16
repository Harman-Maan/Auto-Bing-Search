import data from "../assets/Fitness-video-data.js";

const playVideoBtn = document.getElementById("play-video-btn");
const videoPlayingSection = document.getElementById("video-playing");
const playVideoContent = document.getElementById("play-video-content");
const stopVideo = document.getElementById("stop-video");
const estimatedVideoLeft = document.getElementById("estimated-video-left");
const videoDuration = document.getElementById("video-duration");
const videosWatched = document.getElementById("videos-watched");
let currentId;

playVideoBtn.addEventListener("click", createVideoTab);
stopVideo.addEventListener("click", stopVideoTimeOut);

let date = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`;
let videosPlayed;
let count = 0;

let setCounter;
let setVideoTimeOut;

function checkLocalStorage() {
  if (localStorage.hasOwnProperty("currentId")) {
    currentId = localStorage.getItem("currentId");
    videoDuration.textContent = data[currentId].duration;
    videosPlayed = localStorage.getItem("videosPlayed");

    let oldDate = localStorage.getItem("date");
    if (date != oldDate) {
      localStorage.setItem("date", date);
      localStorage.setItem("videosPlayed", 0);
    } else if (videosPlayed >= 2) {
      reachedLimitWarning();
    }
  } else {
    localStorage.setItem("currentId", 0);
    localStorage.setItem("videosPlayed", 0);
    localStorage.setItem("date", date);
    checkLocalStorage();
  }
}
checkLocalStorage();

function createVideoTab() {
  function counter() {
    estimatedVideoLeft.textContent = count;
    count--;
  }

  displayVideoPlayingSection();

  let { duration, url } = data[currentId];
  videoDuration.textContent = duration;

  window.open(`https://www.msn.com/en-us/health/fitnessworkoutvideo/${url}`, "_blank");
  // console.log(currentId);

  count = duration + 5;
  setCounter = setInterval(counter, 1000);
  setVideoTimeOut = setTimeout(videoEnded, (duration + 5) * 1000);
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
  videosWatched.parentElement.textContent = `You have reached the limit of videos you can watch each day.`;
  playVideoBtn.textContent = "Play Anyway";
}

function videoEnded() {
  videosPlayed++;
  localStorage.setItem("videosPlayed", videosPlayed);
  if (videosPlayed >= 2) reachedLimitWarning();
  else videosWatched.textContent = videosPlayed;

  currentId++;
  if (currentId >= data.length) currentId = 0;

  localStorage.setItem("currentId", currentId);
  videoDuration.textContent = data[currentId].duration;
  stopVideoTimeOut();
}

function stopVideoTimeOut() {
  count = 0;
  clearInterval(setCounter);
  clearTimeout(setVideoTimeOut);
  hideVideoPlayingSection();
  estimatedVideoLeft.textContent = "_-_";
}
