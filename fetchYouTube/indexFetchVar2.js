
const videoId = "RBrZsgy4-SQ"
const apiKey = "AIzaSyBmtsCpADlXcvRebg5MktuAfWhnAo-RGZM"

const rootElement = document.getElementById("root")

// div for the title:
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

// making the player ready as soon as the API is loaded:
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
      "onReady": respondToPlayerReady
    }
  })
}

// playing the video when the player is ready
function respondToPlayerReady(event) {
  event.target.loadVideoById(videoId)
}


// fetch of the title data

fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`)
  .then(response => response.json())
  .then(data => {
    
    console.log(data);
    console.log(description)    

    const elementsToDisplay = `<h1>${data.items[0].snippet.title}</h1>`
    description.insertAdjacentHTML("beforeend", elementsToDisplay)

  })
  .catch(error => console.error(error))


