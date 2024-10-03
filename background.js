chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ preferredLanguage: "en" }, function () {
      console.log("Default language set to English.");
    });
  });
  