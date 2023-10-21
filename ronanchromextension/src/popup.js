document.getElementById("printButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "print_text" }, function(response) {
      console.log('farewell');
      console.log(response.farewell);
      const url = 'https://hackharvard.vercel.app/api/text-to-speech'; 

      fetch(url,{
        method: 'POST',
        body: response.farewell,
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
    });
  });
});
