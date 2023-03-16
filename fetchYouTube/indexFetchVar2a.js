

// variant with two event handlers in the player constructor function`s options object

const videoId = "RBrZsgy4-SQ"
const apiKey = "AIzaSyBmtsCpADlXcvRebg5MktuAfWhnAo-RGZM"

const rootElement = document.getElementById("root")

// div for the title
const descriptElement = document.createElement("div")
descriptElement.id = "descriptDiv"
document.body.appendChild(descriptElement)
const description = document.getElementById("descriptDiv")

// container for the player:
const playerContainer = document.createElement("div")
playerContainer.id = "playerContainDiv"
rootElement.appendChild(playerContainer)

// necessary script-elements in the head-element to load the player:
const headElement = document.createElement("script")
headElement.src = "https://www.youtube.com/iframe_api"
const firstScriptElement = document.getElementsByTagName("script")[0]
firstScriptElement.parentNode.insertBefore(headElement, firstScriptElement)

// start the player when the API is loaded
// 
let player
function onYouTubeIframeAPIReady() {
  player = new YT.Player("playerContainDiv", {
    height: "638",
    width: "1134",
    videoId: videoId,
    playerVars: {
      "autoplay": 1,
      "controls": 1,
      "rel": 0,
      "modestbranding": 1,
      "showinfo": 0
    },
    events: {
      "onReady": respondToPlayerReady,
      "onStateChange": onPlayerStateChange
    }
  });
}

// Play the video when the player is ready
function respondToPlayerReady(event) {
  event.target.loadVideoById(videoId)
}

function onPlayerStateChange(event) {
  switch(event.data) {
    case YT.PlayerState.PLAYING:
      // video is playing
      break;
    case YT.PlayerState.PAUSED:
      // video is paused
      break;
    case YT.PlayerState.ENDED:
      // video has ended
      break;
    case YT.PlayerState.BUFFERING:
      // video is buffering
      break;
    case YT.PlayerState.CUED:
      // video is cued
      break;
    default:
      break;
  }
}

/* "events" is a key in the options object passed to the YT.Player constructor function.
It's not an event listener like an inline HTML "onready" event listener,
but it specifies the event handlers that the player should use for various events,
such as when the player is ready to play, when playback starts, when playback ends, etc.

The "events" key is used to specify a set of event handler functions
that will be called by the player when specific events occur.
These functions are typically defined separately from the options object,
and are passed by reference as properties of the options object. */

// fetch of the title data

fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`)
  .then(response => response.json())
  .then(data => {
    
    console.log(data);
    console.log(description)    

    const pageContent = `<h1>${data.items[0].snippet.title}</h1>`;
    description.insertAdjacentHTML("beforeend", pageContent);

  })
  .catch(error => console.error(error));


