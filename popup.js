document.getElementById("saveBtn").addEventListener("click", function () {
    const selectedLanguage = document.getElementById("languageSelect").value;
    chrome.storage.sync.set({ preferredLanguage: selectedLanguage }, function () {
      alert("Preferred language saved!");
    });
  });
  