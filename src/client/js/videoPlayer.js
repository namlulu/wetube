const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('volume');
const timeline = document.getElementById('timeline');
const fullScreenBtn = document.getElementById('fullScreen');
const videoContainer = document.getElementById('videoContainer');

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtn.innerText = video.paused ? 'Play' : 'Pause';
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  muteBtn.innerText = video.muted ? 'Unmuted' : 'Muted';
  volumeRange.value = video.muted ? 0 : 1;
};

const handleVolumnChange = (e) => {
  const {
    target: { value },
  } = e;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = 'Mute';
  }

  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeupdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleFullscreenClick = (e) => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = 'Enter Full Screen';
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = ' Exit Full Screen';
  }
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumnChange);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeupdate);
timeline.addEventListener('input', handleTimelineChange);
fullScreenBtn.addEventListener('click', handleFullscreenClick);
