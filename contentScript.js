chrome.storage.sync.get("preferredLanguage", function (data) {
  const preferredLanguage = data.preferredLanguage || "en";

  async function translateText(text, targetLanguage) {
      const response = await fetch(
          "https://libretranslate.com/translate", {
          method: "POST",
          body: JSON.stringify({
              q: text,
              source: "auto",
              target: targetLanguage,
              format: "text"
          }),
          headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      return result.translatedText;
  }

  const chatElements = document.querySelectorAll(".message-in .copyable-text");
  chatElements.forEach(async (messageElement) => {
      const originalText = messageElement.innerText;
      const translatedText = await translateText(originalText, preferredLanguage);
      messageElement.innerText = `${originalText} (Translated: ${translatedText})`;
  });

  const messageInput = document.querySelector("div[contenteditable='true']");
  if (messageInput) {
      messageInput.addEventListener("keydown", async function (event) {
          if (event.key === "Enter") {
              event.preventDefault();

              const originalMessage = messageInput.innerText;
              const translatedMessage = await translateText(originalMessage, preferredLanguage);
              messageInput.innerText = translatedMessage;

              const sendButton = document.querySelector("button[type='button']");
              if (sendButton) {
                  sendButton.click();
              }
          }
      });
  }
});
