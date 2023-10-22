let token = "";
let voices = {}
document.getElementById("login").addEventListener("click", function () {
  // Get the values of the email and password inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = {
    email: email,
    password: password
  };

  var audioElement = document.getElementById("myAudio");


  const jsonData = JSON.stringify(data);


  const url = 'https://hackharvard.vercel.app/api/login';

  fetch(url, {
    method: 'POST',
    body: jsonData,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
    .then((response) => {
      if (response.ok) {


        const printButton = document.getElementById('printButton');
        printButton.style = 'background-color: #25A6D9;  border-color: #25A6D9;';

        // Add a click event handler to the button
        printButton.addEventListener('click', function () {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "print_text" });
          });
        });

        // Clear the body and append the button
        var divToRemove = document.getElementById("loginform");
        divToRemove.remove();
        document.body.appendChild(printButton);
        return response.json();  // Read and return the response body as JSON
      }
      else {
        const existingElement = document.getElementById('failedlogin');
        if (!existingElement) {
          const containerDiv = document.createElement('div'); // Create a div to contain the text
          containerDiv.id = 'failedlogin'; // Set the ID for the container div
          containerDiv.style.display = 'flex'; // Make it a flex container
          containerDiv.style.justifyContent = 'center'; // Center-align horizontally
          containerDiv.style.alignItems = 'center'; // Center-align vertically

          const failedLogin = document.createElement('span'); // Create a span for the text
          failedLogin.textContent = 'Login Failed';
          failedLogin.style.color = 'red'; // Set the text color to red

          const audioElement = document.getElementById('myAudio');
          audioElement.setAttribute('autoplay', 'autoplay');
        }
        return "";
      }
    })

    .then((responseJson) => {
      if (responseJson != "") {
        // Log the response text
        console.log('Response Text:', responseJson);
        token = responseJson.user;
        console.log("This is my body", token)
        fetchAvailableVoices();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});


// popup.js

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let currentIndex = 0;

let audioQueue = [];
let isPlaying = false;
async function fetchAvailableVoices() {
  const url = 'https://hackharvard.vercel.app/api/my-voices';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    } else {
      
      voices = JSON.stringify(await response.json());
      console.log('voices' + voices);
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;  // Re-throw the error to be handled by the calling code
  }
}

document.getElementById("printButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "print_text" }, function (answer) {
      console.log('farewell');
      console.log(answer)
      const data = JSON.parse(answer.farewell);
      
      console.log(data);
      fetchAndPlayAudio(data);
    });
  });
});

async function fetchAndPlayAudio(data) {
  if (currentIndex < data.length) {
    const entry = data[currentIndex];
    
    await fetchAudio(entry.name, entry.text, data);
    currentIndex++;
  }
}

async function fetchAudio(name, text, data) {
  const url = 'https://hackharvard.vercel.app/api/text-to-speech';
  console.log('fetching audio', voices)
  console.log(name);
  console.log(JSON.parse(voices)[name])
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ voiceId: 
      JSON.parse(voices)[name] ?? "21m00Tcm4TlvDq8ikWAM", text }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.arrayBuffer();
      } else {
        console.error('Failed to send data.');
      }
    })
    .then((mp3Data) => {
      playAudio(mp3Data, data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function playAudio(mp3Data, data) {
  audioContext.decodeAudioData(mp3Data, (buffer) => {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);

    source.onended = () => {
      fetchAndPlayAudio(data);  // Call fetchAndPlayAudio again to process the next item
    };
  }, (e) => {
    console.error('Audio decoding failed', e);
  });
}