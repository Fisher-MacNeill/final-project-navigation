document.querySelector(".scan");

function scan() {
  navigator.mediaDevices.getUserMedia(video);
}

document.querySelector(".scan").addEventListener("click", scan);

async function startMedia() {
  // Define what media types you want to request
  const constraints = {
    video: true,
    audio: false,
  };

  try {
    // Request permission and get the stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    // Find your HTML video element and link the stream
    const videoElement = document.getElementById("webcamPreview");
    videoElement.srcObject = stream;
  } catch (error) {
    // Handle permissions denial or missing hardware
    console.error("Error accessing media devices:", error);
  }
}

// Call the function (usually triggered by a button click event)
startMedia();

// WE NEED TO GET THIS TO WORK TOMORROW OR SCRAP THE IDEA COMPLETELY AND MOVE TO NUMBAS
