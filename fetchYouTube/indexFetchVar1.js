// variant using a separate (unfetchable) videoUrl
// fetch is used for title data only

const videoId = "RBrZsgy4-SQ"
const apiKey = "AIzaSyBmtsCpADlXcvRebg5MktuAfWhnAo-RGZM"
let rootElement = document.getElementById("root")
fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`)
  .then(response => response.json())
  .then(data => {
    
    console.log(data);

    const videoUrl = `https://www.youtube.com/embed/RBrZsgy4-SQ`
    const playerElement = `<iframe id="ytplayer" type="text/html" height="638" width="1134" src="${videoUrl}"?autoplay=1 frameborder="0"></iframe>`;

    const elementsToDisplay = `
      <h1>${data.items[0].snippet.title}</h1>
      ${playerElement}
    `;

       
    rootElement.insertAdjacentHTML('beforeend', elementsToDisplay)

  })
  .catch(error => console.error(error))

