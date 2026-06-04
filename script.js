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
          // window.location.replace(>?>
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

  if (roomNmbrs == "300-308") {
    html = `    <div class="mapflex">
    <img src="img/TopFloor.PNG" class="floorplan"/>
    <select name="dropdown" id="maps" class="dropdownbox">
    <option disabled selected>Chose a hallway</option>
      <option value="324-329">324-329</option>
      <option value="330-338">330-338</option>
      <option value="339-343">339-343</option>
    </select>
    </div>`;
  } else if (roomNmbrs == "324-329") {
    html = `    <div class="mapflex">
    <img src="img/TopFloor.PNG" class="floorplan"/>
    <select name="dropdown" id="maps" class="dropdownbox">
    <option disabled selected>Chose a hallway</option>
    <option value="300-308">300-308</option>
      <option value="330-338">330-338</option>
      <option value="339-343">339-343</option>
    </select>
    </div>`;
  } else if (roomNmbrs == "330-338") {
    html = `    <div class="mapflex">
    <img src="img/TopFloor.PNG" class="floorplan"/>
    <select name="dropdown" id="maps" class="dropdownbox">
    <option disabled selected>Chose a hallway</option>
    <option value="300-308">300-308</option>
    <option value="324-329">324-329</option>
      <option value="339-343">339-343</option>
    </select>
    </div>`;
  } else if (roomNmbrs == "339-343") {
    html = `    <div class="mapflex">
    <img src="img/TopFloor.PNG" class="floorplan"/>
    <select name="dropdown" id="maps" class="dropdownbox">
    <option disabled selected>Chose a hallway</option>
    <option value="300-308">300-308</option>
    <option value="324-329">324-329</option>
    <option value="330-338">330-338</option>
    </select>
    </div>`;
  }

  insertNewHTML.insertAdjacentHTML("afterend", html);
  document.querySelector(".dropdownbox").addEventListener("change", directions);
}

function directions() {
  let floorplan = document.querySelector(".floorplan");
  let selectedHallway = document.querySelector(".dropdownbox").value;
  console.log(selectedHallway);
  if (roomNmbrs == "300-308") {
    if (selectedHallway == "324-329") {
      floorplan.src = "floorplans/300-324.png";
    } else if (selectedHallway == "339-343") {
      floorplan.src = "floorplans/300-339.png";
    } else if (selectedHallway == "330-338") {
      floorplan.src = "floorplans/300-330.png";
    } else if (selectedHallway == "324-329") {
      floorplan.src = "floorplans/300-324.png";
    }
  } else if (roomNmbrs == "324-329") {
    if (selectedHallway == "300-308") {
      floorplan.src = "floorplans/324-300.png";
    } else if (selectedHallway == "330-339") {
      floorplan.src = "floorplans/324-339.png";
      // } else if (selectedHallway == "")
    }
  }
}
