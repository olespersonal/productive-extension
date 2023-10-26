const blockedUrls = ["youtube.com"];

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const url = new URL(details.url);

  if (blockedUrls.some((blockedUrl) => url.hostname.includes(blockedUrl))) {
    // Block navigation to the blocked URL
    chrome.webNavigation.onBeforeNavigate.removeListener();
    chrome.tabs.update({ url: chrome.runtime.getURL("redirect-page.html") });
  }
});
