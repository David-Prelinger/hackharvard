document.getElementById("login").addEventListener("click", function() {
  // Get the values of the email and password inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = {
    email: email,
    password: password
  };

  var audioElement = document.getElementById("myAudio");

  console.log(audioElement);

  const jsonData = JSON.stringify(data);

  console.log(jsonData);

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
      console.log(response)
      const printButton = document.getElementById('printButton');
      printButton.style = '';

      // Add a click event handler to the button
      printButton.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: "print_text" });
        });
      });

      // Clear the body and append the button
      var divToRemove = document.getElementById("loginform");
      divToRemove.remove();
      document.body.appendChild(printButton);
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
}
  })
  .then((responseText) => {
    // Log the response text
    console.log('Response Text:', responseText);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});