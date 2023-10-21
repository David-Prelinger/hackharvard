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

      const voiceId = "DqttY73fyooyW3ftsoQ6"

      const text = textContentArray.join();

      // Convert the array to a JSON string

      const data = {
        text,
        voiceId
      };
      
      // Convert the object to a JSON string
      const jsonData = JSON.stringify(data);

      console.log(jsonData)



      
      sendResponse({farewell: jsonData});
      // Replace 'google.com' with the actual URL where you want to send the data
      //const url = 'https://hackharvard.vercel.app/api/text-to-speech'; 
      console.log('here');
     
/*
      // Send an HTTP POST request to the specified URL
      fetch(url,{
        method: 'POST',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
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
   */
      } else {
      console.log('No div elements with IDs containing the word "message" found.');
    }
  }
});
