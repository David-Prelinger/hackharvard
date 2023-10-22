chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "print_text") {
    const divElements = document.querySelectorAll('div.Message');
    const textContentArray = [];
    const messages = []


    if (divElements.length > 0) {
      const divElementsToPrint = Array.from(divElements)
      let lastName = "Me"
      divElementsToPrint.forEach((divElement, index) => {
        const textContentDiv = divElement.querySelector('div.text-content')
        let text = "";
        if (textContentDiv) {
          text = textContentDiv.childNodes[0].nodeValue;
        }

        const nameDiv = divElement.querySelector('.message-title-name');
        let name = "";
        if (!divElement.querySelector('.MessageOutgoingStatus')) {

          if (nameDiv) {
            name = nameDiv.innerHTML
          } else {
            name = lastName
          }
        } else {
          name = "Me"
        }
        lastName = name
        messages.push({ name: name, text: text })
      });
      console.log(messages)
      // Convert the object to a JSON string
      const jsonData = JSON.stringify(messages);
      sendResponse({ farewell: jsonData });
    } else {
      console.log('No div elements with IDs containing the word "message" found.');
    }
  }
});
