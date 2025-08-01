  const fileInput = document.getElementById('fileInput');
  const preview = document.getElementById('preview');
  const results = document.getElementById('results');
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  let stream;

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result.split(',')[1];
      preview.src = reader.result;
      detectWaste(base64Image);
    };

    if (file) {
      reader.readAsDataURL(file);
      results.innerHTML = '<div class="loading">Analyzing image for medical waste...</div>';
    }
  });

  function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          stream = s;
          video.srcObject = stream;
          video.style.display = "block";
        })
        .catch(err => {
          alert("Could not access webcam: " + err.message);
        });
    } else {
      alert("Webcam not supported on this browser.");
    }
  }

  function captureImage() {
    if (!stream) return alert("Start the camera first.");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/jpeg");
    const base64Image = dataURL.split(',')[1];
    preview.src = dataURL;
    results.innerHTML = '<div class="loading">Analyzing captured image...</div>';
    detectWaste(base64Image);
  }

  function detectWaste(base64Image) {
    axios({
      method: "POST",
      url: "https://serverless.roboflow.com/medical-disposable/3",
      params: {
        api_key: "ob0DnZaOXrlnDuwoINcZ"
      },
      data: base64Image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(response => {
      const predictions = response.data.predictions;

      if (predictions.length === 0) {
        results.innerHTML = `
          <div class="success">
            No medical waste detected in this image.
          </div>
        `;
        return;
      }

      // Count each item type (gloves, syringe, etc.)
      const counts = {};
      predictions.forEach(p => {
        const item = p.class.toLowerCase();
        counts[item] = (counts[item] || 0) + 1;
      });

      // Generate count summary
      const countSummary = Object.entries(counts)
        .map(([item, count]) => `<li><strong>${item}:</strong> ${count}</li>`)
        .join("");

      // Generate details
      const details = predictions.map(p => `
        <div class="detection">
          <strong>${p.class}</strong>
          <span class="confidence">${(p.confidence * 100).toFixed(1)}% confident</span>
          <div class="detection-info">
            <div class="info-item">
              <strong>Position X:</strong> ${Math.round(p.x)}px
            </div>
            <div class="info-item">
              <strong>Position Y:</strong> ${Math.round(p.y)}px
            </div>
            <div class="info-item">
              <strong>Width:</strong> ${Math.round(p.width)}px
            </div>
            <div class="info-item">
              <strong>Height:</strong> ${Math.round(p.height)}px
            </div>
          </div>
        </div>
      `).join("");

      sessionStorage.setItem("wasteCounts", JSON.stringify(counts));

      results.innerHTML = `
        <div class="success">
          Detected ${predictions.length} item${predictions.length > 1 ? 's' : ''}:
          <ul style="margin-top: 0.75rem; padding-left: 1.25rem;">${countSummary}</ul>
        </div>
        <h3>Detection Results</h3>
        ${details}
      `;
    })
    .catch(error => {
      results.innerHTML = `
        <div class="error">
          ❌ Error: ${error.message}
          <br><small>Please try again with a different image.</small>
        </div>
      `;
    });
  }