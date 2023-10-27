const messages = [
  "This website is blocked for a reason",
  "Nope",
  "Remember why you blocked this website?",
  "It's ruining your life",
  "Don't be an idiot",
  "You don't approve this website, don't remember?",
];

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["isDarkTheme"], (result) => {
    document.getElementById("body").style.backgroundColor = result.isDarkTheme
      ? "rgb(38, 39, 38)"
      : "background-color: rgb(91, 204, 91);";
  });
});

const text = document.getElementById("text");
text.innerHTML = messages[Math.floor(Math.random() * messages.length)];
