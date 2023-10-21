chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "print_text") {
    const divElements = document.querySelectorAll('div[id*="message"]');
    const textContentArray = [];

    if (divElements.length > 2) {
      // Exclude the last two div elements
      const divElementsToPrint = Array.from(divElements).slice(0, -2);

      divElementsToPrint.forEach((divElement, index) => {
        // Check if the div contains a child div with class "MessageOutgoingStatus"
        if (!divElement.querySelector('.MessageOutgoingStatus')) {
          let textContent = divElement.textContent;
          // Remove the last 8 characters
          textContent = textContent.slice(0, -8);
          textContentArray.push(textContent);
        }
      });

      // Convert the array to a JSON string
      const jsonData = JSON.stringify({ textContentArray });

      console.log(jsonData)

      // Replace 'google.com' with the actual URL where you want to send the data
      const url = 'https://hackharvard.vercel.app/api/login'; 

      // Send an HTTP POST request to the specified URL
      fetch(url, { mode: 'no-cors'}, {
        method: 'POST',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log('Data sent successfully.');
          } else {
            console.error('Failed to send data.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.log('No div elements with IDs containing the word "message" found.');
    }
  }
});
function printOneForever() {
  console.log(1);
  setTimeout(printOneForever, 1000); // Print '1' every second (adjust as needed)
}

printOneForever();