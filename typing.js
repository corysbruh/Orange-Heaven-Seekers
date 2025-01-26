const headerText = "Search for heaven near you!";
let index = 0;
const element = document.getElementById("typedText");

function typeWriter() {
  if (index < headerText.length) {
    element.innerHTML += headerText.charAt(index);
    index++;
    setTimeout(typeWriter, 100); // Adjust typing speed here
  }
}

typeWriter();

const video = document.getElementById("background-video");

video.addEventListener("ended", function () {
  video.playbackRate = -1;
  video.play();
});

video.addEventListener("play", function () {
  if (video.playbackRate < 0) {
    video.playbackRate = 1; 
  }
});