const messages = [
  "This website is blocker for a reason",
  "Nope",
  "Remember why you blocked this website?",
  "It's ruining your life",
  "Don't be an idiot",
  "You don't approve this website, don't remember?",
];

const text = document.getElementById("text");
text.innerHTML = messages[Math.floor(Math.random() * messages.length)];
