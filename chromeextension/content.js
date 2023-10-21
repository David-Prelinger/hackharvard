chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "print_text") {
    const divElements = document.querySelectorAll('div[id*="message"]');

    if (divElements.length > 2) {
      // Exclude the last two div elements
      const divElementsToPrint = Array.from(divElements).slice(0, -2);

      divElementsToPrint.forEach((divElement, index) => {
        // Check if the div contains a child div with class "MessageOutgoingStatus"
        if (!divElement.querySelector('.MessageOutgoingStatus')) {
          let textContent = divElement.textContent;
          // Remove the last 8 characters
          textContent = textContent.slice(0, -8);
          console.log(`${textContent}`);
        }
      });
    } else {
      console.log('No div elements with IDs containing the word "message" found.');
    }
  }
});
