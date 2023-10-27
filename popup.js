const websiteList = document.getElementById("website-list");
const websiteInput = document.getElementById("website-input");
const messageInput = document.getElementById("message-input");
const messageList = document.getElementById("message-list");
const addBtn = document.getElementById("add-btn");
const addMessageBtn = document.getElementById("add-message-btn");
const themeBtn = document.getElementById("theme-btn");
const themeStylesheet = document.getElementById("theme-stylesheet");

const deleteBtn = `<div class="delete-btn">remove</div>`;

// Theme code

themeBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isDarkTheme"], (result) => {
    chrome.storage.local.set({ isDarkTheme: !result.isDarkTheme });
    if (result.isDarkTheme) {
      themeStylesheet.setAttribute("href", "popup-light-theme.css");
      themeBtn.textContent = "Light";
    } else {
      themeStylesheet.setAttribute("href", "popup-dark-theme.css");
      themeBtn.textContent = "Dark";
    }
  });
});

chrome.storage.local.get(["isDarkTheme"], (result) => {
  console.log("result", result);
  if (result.isDarkTheme) {
    themeStylesheet.setAttribute("href", "popup-dark-theme.css");
    themeBtn.textContent = "Dark";
  } else {
    themeStylesheet.setAttribute("href", "popup-light-theme.css");
    themeBtn.textContent = "Light";
  }
});

// Get a list

const getWebsiteList = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["websiteList"], (result) => {
      resolve(result.websiteList ?? []);
    });
  });
};

const getMessageList = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["messageList"], (result) => {
      resolve(result.messageList ?? []);
    });
  });
};

// Display content

const displayWebsiteList = async () => {
  const list = await getWebsiteList();
  const content = list.map(
    (item) => `<div class="list-item"><span>${item}</span>${deleteBtn}</div>`
  );
  websiteList.innerHTML = content.join("");
};

displayWebsiteList();

const displayMessageList = async () => {
  const list = await getMessageList();
  const content = list.map(
    (item) => `<div class="list-item"><span>${item}</span>${deleteBtn}</div>`
  );
  messageList.innerHTML = content.join("");
};

displayMessageList();

// List item manipulations

const addWebsiteUrl = async () => {
  const inputText = document.getElementById("website-input").value;
  websiteInput.value = "";

  const list = await getWebsiteList();

  if (list.includes(inputText)) return;

  await chrome.storage.local.set({ websiteList: [...list, inputText] });
  displayWebsiteList();
};

const addMessage = async () => {
  const inputText = document.getElementById("message-input").value;
  messageInput.value = "";

  const list = await getMessageList();

  if (list.includes(inputText)) return;

  await chrome.storage.local.set({ messageList: [...list, inputText] });
  displayMessageList();
};

const deleteListItem = async (event) => {
  if (event.target.classList.contains("delete-btn")) {
    // Find the sibling <p> element of the clicked "delete-cion" div
    const siblingP = event.target.previousElementSibling;

    if (siblingP && siblingP.tagName === "SPAN") {
      const paragraphText = siblingP.textContent;
      if (event.currentTarget.id === "website-list") {
        const list = await getWebsiteList();
        await chrome.storage.local.set({
          websiteList: list.filter((item) => item !== paragraphText),
        });
        displayWebsiteList();
      } else {
        const list = await getMessageList();
        await chrome.storage.local.set({
          messageList: list.filter((item) => item !== paragraphText),
        });
        displayMessageList();
      }
    }
  }
};

// Event listeners

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    console.log("event.target", event.target.id);
    if (event.target.id === "website-input") addWebsiteUrl();
    else addMessage();
  }
};

websiteInput.addEventListener("keydown", handleKeyPress);
messageInput.addEventListener("keydown", handleKeyPress);
websiteList.addEventListener("click", deleteListItem);
messageList.addEventListener("click", deleteListItem);
addBtn.addEventListener("click", addWebsiteUrl);
addMessageBtn.addEventListener("click", addMessage);
