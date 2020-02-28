const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('input[type="range"]');
const fullscreenButton = player.querySelector('.fullscreen');

function playVideo() {
  video.paused ? video.play() : video.pause();
}

function toggleButton() {
  this.paused ? toggle.textContent = '►' : toggle.textContent = '❚ ❚';
}

function skipSeconds() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange() {
  video[this.name] = this.value;
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = percent + '%';
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullScreen() {
  video.requestFullscreen();
}


video.addEventListener('click', playVideo);
video.addEventListener('pause', toggleButton);
video.addEventListener('play', toggleButton);
video.addEventListener('timeupdate', updateProgress);

toggle.addEventListener('click', playVideo);
skipButtons.forEach(skip => skip.addEventListener('click', skipSeconds))
ranges.forEach(range => range.addEventListener('input', updateRange))

let barClicked = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => barClicked && scrub(e));
progress.addEventListener('mousedown', () => barClicked = true);
progress.addEventListener('mouseup', () => barClicked = false);

fullscreenButton.addEventListener('click', handleFullScreen);