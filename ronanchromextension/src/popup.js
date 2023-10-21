document.getElementById("printButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "print_text" });
  });
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if(request.greeting === "hello") {
          console.log("Message received from content script");
          sendResponse({farewell: "goodbye"});
      }
  }
);