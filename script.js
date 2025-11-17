document.addEventListener("DOMContentLoaded", () => {

  const video = document.querySelector('.player__video');
  const toggle = document.querySelector('.toggle');
  const volumeSlider = document.querySelector('input[name="volume"]');
  const speedSlider = document.querySelector('input[name="playbackSpeed"]');
  const skipButtons = document.querySelectorAll('[data-skip]');
  const progress = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress__filled');

  // PLAY / PAUSE
  function togglePlay() {
    if (video.paused) {
      video.play();
      toggle.textContent = "❚ ❚";
    } else {
      video.pause();
      toggle.textContent = "►";
    }
  }

  // UPDATE PROGRESS BAR
  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + "%";
  }

  // SCRUB
  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  // VOLUME
  volumeSlider.addEventListener("input", () => {
    video.volume = volumeSlider.value;
  });

  // PLAYBACK SPEED
  speedSlider.addEventListener("input", () => {
    video.playbackRate = speedSlider.value;
  });

  // SKIP BUTTONS (rewind + forward)
  skipButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      video.currentTime += parseFloat(btn.dataset.skip);
    });
  });

  toggle.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay);
  video.addEventListener("timeupdate", handleProgress);
  progress.addEventListener("click", scrub);

});
