let html5QrCode;

document.getElementById("scanBtn").addEventListener("click", async () => {
  document.getElementById("error").innerText = "";

  try {
    const devices = await Html5Qrcode.getCameras();

    if (devices && devices.length) {
      const cameraId = devices[0].id;

      html5QrCode = new Html5Qrcode("reader");

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 750,
        },
        (decodedText) => {
          document.getElementById("result").innerText =
            "QR Code: " + decodedText;
          // window.location.href = "map1.html";
          window.location.replace(
            "https://fisher-macneill.github.io/final-project-navigation/map1.html"
          );

          // html5QrCode.stop();
        },
        (errorMessage) => {}
      );
    } else {
      document.getElementById("error").innerText = "No cameras found.";
    }
  } catch (err) {
    console.error(err);

    document.getElementById("error").innerText = "Scanner failed:\n\n" + err;
  }
});
