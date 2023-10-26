// const blockedUrls = ["youtube.com"];

const getWebsiteList = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["websiteList"], (result) => {
      resolve(result.websiteList ?? []);
    });
  });
};

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const url = new URL(details.url);
  const blockedUrls = await getWebsiteList();

  if (blockedUrls.some((blockedUrl) => url.hostname.includes(blockedUrl))) {
    // Block navigation to the blocked URL
    chrome.webNavigation.onBeforeNavigate.removeListener();
    chrome.tabs.update({ url: chrome.runtime.getURL("redirect-page.html") });
  }
});
