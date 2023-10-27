document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["isDarkTheme", "messageList"], (result) => {
    document.getElementById("body").style.backgroundColor = result.isDarkTheme
      ? "rgb(38, 39, 38)"
      : "background-color: rgb(91, 204, 91);";

    const text = document.getElementById("text");

    text.innerHTML =
      Array.isArray(result.messageList) && result.messageList.length
        ? result.messageList[
            Math.floor(Math.random() * result.messageList.length)
          ]
        : "You blocked this website";
  });
});
