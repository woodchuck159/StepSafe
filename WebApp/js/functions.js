function getLocation() {
  mapRequest = new MapRequest();
  mapRequest.getMapLocation();
}

function startVoiceNavigation() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false; // listens only once
  recognition.maxAlternatives = 1;

  console.log("Listening for your destination...");
  recognition.start();

  recognition.onstart = () => {
      console.log("Voice recognition started. Please speak...");
  };

  recognition.onresult = function (event) {
      const spokenText = event.results[0][0].transcript;
      console.log("You said:", spokenText);
      recognition.stop();
      fetchDestinationCoordinates(spokenText);
  };

  // Prevent premature stopping
  recognition.onspeechend = () => {
      console.log("Speech detected. Listening for more...");
      recognition.start(); // Restart listening
  };

  // Improve error handling
  recognition.onerror = function (event) {
      console.error("Speech recognition error:", event.error);
      alert("Error recognizing speech: " + event.error);
  };
}

function fetchDestinationCoordinates(destinationName) {
  // Example fallback: default proximity near Purdue
  const defaultProximity = '-86.9132,40.4237';

  navigator.geolocation.getCurrentPosition((position) => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    fetchGeocode(destinationName, `${lng},${lat}`);
  }, () => {
    // If geolocation fails, use fallback
    fetchGeocode(destinationName, defaultProximity);
  });
}

function fetchGeocode(destinationName, proximity) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destinationName)}.json?access_token=${mapboxgl.accessToken}&proximity=${proximity}&types=poi&autocomplete=true`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        directions.setDestination([lng, lat]);
      } else {
        alert("Could not find the destination.");
      }
    })
    .catch((err) => {
      console.error("Error fetching destination:", err);
      alert("There was a problem finding that place.");
    });
}
