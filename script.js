
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const nicknameInput = document.getElementById("nickname");
const canvas = document.getElementById("paint");
const ctx = canvas.getContext("2d");

let nickname = localStorage.getItem("nickname") || "Anon";
nicknameInput.value = nickname;

nicknameInput.addEventListener("input", () => {
  nickname = nicknameInput.value;
  localStorage.setItem("nickname", nickname);
});

chatInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    const msg = document.createElement("div");
    msg.textContent = `${nickname}: ${chatInput.value}`;
    chatBox.appendChild(msg);
    chatInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

// Canvas setup
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let painting = false;
canvas.addEventListener("mousedown", () => painting = true);
canvas.addEventListener("mouseup", () => painting = false);
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!painting) return;
  const rect = canvas.getBoundingClientRect();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(e.clientX - rect.left, e.clientY - rect.top, 2, 0, Math.PI * 2);
  ctx.fill();
}

// Background and avatar upload
document.getElementById("backgroundUpload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      document.body.style.backgroundImage = `url(${evt.target.result})`;
      document.body.style.backgroundSize = "cover";
    };
    reader.readAsDataURL(file);
  }
});
