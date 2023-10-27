const websiteList = document.getElementById("website-list");
const websiteInput = document.getElementById("website-input");
const addBtn = document.getElementById("add-btn");
const themeBtn = document.getElementById("theme-btn");
const themeStylesheet = document.getElementById("theme-stylesheet");

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

const deleteBtn = `<div class="delete-btn">remove</div>`;

const getWebsiteList = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["websiteList"], (result) => {
      resolve(result.websiteList ?? []);
    });
  });
};

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addWebsiteUrl();
  }
}

websiteInput.addEventListener("keydown", handleKeyPress);

const deleteWebsiteListItem = async (event) => {
  if (event.target.classList.contains("delete-btn")) {
    // Find the sibling <p> element of the clicked "delete-cion" div
    const siblingP = event.target.previousElementSibling;

    if (siblingP && siblingP.tagName === "SPAN") {
      const paragraphText = siblingP.textContent;
      const list = await getWebsiteList();
      await chrome.storage.local.set({
        websiteList: list.filter((item) => item !== paragraphText),
      });
      displayWebsiteList();
    }
  }
};

websiteList.addEventListener("click", deleteWebsiteListItem);

const displayWebsiteList = async () => {
  const list = await getWebsiteList();
  const content = list.map(
    (item) => `<div class="list-item"><span>${item}</span>${deleteBtn}</div>`
  );
  websiteList.innerHTML = content.join("");
};

displayWebsiteList();

const addWebsiteUrl = async () => {
  const inputText = document.getElementById("website-input").value;
  const list = await getWebsiteList();
  await chrome.storage.local.set({ websiteList: [...list, inputText] });
  websiteInput.value = "";
  displayWebsiteList();
};

addBtn.addEventListener("click", addWebsiteUrl);
