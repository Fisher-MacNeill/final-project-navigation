let html5QrCode;
let roomNumbers;
let html;

const dropdown = document.querySelector("dropdownbox");

document.getElementById("scanBtn")?.addEventListener("click", async () => {
  document.getElementById("error").innerText = "";

  try {
    const devices = await Html5Qrcode.getCameras();

    if (devices && devices.length) {
      const cameraId = devices[0].id;
      console.log(cameraId);

      html5QrCode = new Html5Qrcode("reader");

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 750,
        },
        (decodedText) => {
          // document.getElementById("result").innerText =
          //   "QR Code: " + decodedText;
          roomNumbers = decodedText;
          window.location.href = `map1.html?room=${encodeURIComponent(
            decodedText
          )}`;
          // window.location.replace(
          //   "https://fisher-macneill.github.io/final-project-navigation/map1.html"
          // );

          html5QrCode.stop();
          return roomNumbers;
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    } else {
      document.getElementById("error").innerText = "No cameras found.";
    }
  } catch (err) {
    console.error(err);

    document.getElementById("error").innerText = "Scanner failed:\n\n" + err;
  }
});

const urlParams = new URLSearchParams(window.location.search);
const roomNmbrs = urlParams.get("room");

function insertHTML() {
  let insertNewHTML = document.querySelector(".mapflex");
  console.log(roomNumbers);

  html = `    <div class="mapflex">
<img src="img/TopFloor.PNG" />
<select name="dropdown" id="maps" class="dropdownbox">
  <option value="300-308">300-308</option>
  <option value="324-329">324-329</option>
  <option value="330-338">330-338</option>
  <option value="339-343">339-343</option>
</select>
</div>`;

  if (roomNmbrs == "300-308") {
    insertNewHTML.insertAdjacentHTML("afterend", html);
    document
      .querySelector(".dropdownbox")
      .addEventListener("change", directions);
  }
}

function directions() {
  let selectedHallway = document.querySelector(".dropdownbox").value;
  console.log(selectedHallway);
  if (selectedHallway == "300-308") {
  }
}
