// create a function to get the current location of the person by 'piggybacking' off of the API of a Purdue webite
function getLocation() {
  mapRequest = new MapRequest();
  mapRequest.getMapLocation();
}

// create function to set desired final destination through voice
function startVoiceNavigation() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"; // set default language to english
  recognition.interimResults = false;
  recognition.continuous = false; // listens only once
  recognition.maxAlternatives = 1;

  console.log("Listening for your destination...");
  recognition.start();

  recognition.onstart = () => {
      console.log("Voice recognition started. Please speak...");
  };

  // perform required actions upon hearing input voice
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

  // Improve error handling, display correct messages if error occurs when fetching geocodes
  recognition.onerror = function (event) {
      console.error("Speech recognition error:", event.error);
      alert("Error recognizing speech: " + event.error);
  };
}

// fetch longitude and latitude coordinates of detination name / address
function fetchDestinationCoordinates(destinationName) {
  // Example fallback: default proximity near Purdue
  const defaultProximity = getLocation(); // set default proximity to current location

  navigator.geolocation.getCurrentPosition((position) => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    fetchGeocode(destinationName, `${lng},${lat}`);
  }, () => {
    // If geolocation fails, use fallback
    fetchGeocode(destinationName, defaultProximity);
  });
}

// create a function that will fetch the geocode of the user spoken location and set it as the desired location
function fetchGeocode(destinationName, proximity) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destinationName)}.json?access_token=${mapboxgl.accessToken}&proximity=${proximity}&autocomplete=true`;

  // fetch the api database and connect the given address with the latitude and longitude coordinates
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // set longitude and latitude coordinates as final destination if location is found
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        directions.setDestination([lng, lat]); 
      } else {
        alert("Could not find the destination.");
      }
    })
    // display proper message if error occurs in fetching user spoken destination
    .catch((err) => {
      console.error("Error fetching destination:", err);
      alert("There was a problem finding that place.");
    });
}
