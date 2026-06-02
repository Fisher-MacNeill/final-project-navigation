let html5QrCode;

document.getElementById("scanBtn").addEventListener("click", async () => {
  document.getElementById("error").innerText = "";

  try {
    // Check camera permissions
    const devices = await Html5Qrcode.getCameras();

    if (devices && devices.length) {
      const cameraId = devices[0].id;

      html5QrCode = new Html5Qrcode("reader");

      await html5QrCode.start(
        { facingMode: "environment" }, // back camera
        {
          fps: 10,
          qrbox: 750,
        },
        (decodedText) => {
          document.getElementById("result").innerText =
            "QR Code: " + decodedText;

          // html5QrCode.stop();
        },
        (errorMessage) => {
          // Ignore scan errors
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
