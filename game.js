const sandbox = document.getElementById("sandbox");
const resultText = document.getElementById("resultText");

let words = [
  { id: 1, text: "cat", bubble: null, x: 80, y: 100 },
  { id: 2, text: "sat", bubble: null, x: 200, y: 160 },
  { id: 3, text: "mat", bubble: null, x: 320, y: 120 }
];

let draggingWord = null;
let offsetX = 0;
let offsetY = 0;

function render() {
  sandbox.innerHTML = "";

  words.forEach(word => {
    const el = document.createElement("div");
    el.className = "word";
    el.style.left = word.x + "px";
    el.style.top = word.y + "px";
    el.textContent = word.text;

    // click = toggle bubble
    el.addEventListener("click", e => {
      e.stopPropagation();
      word.bubble = word.bubble ? null : getBubbleWord(word.text);
      updateResult();
      render();
    });

    // dragging
    el.addEventListener("pointerdown", e => {
      draggingWord = word;
      offsetX = e.clientX - word.x;
      offsetY = e.clientY - word.y;
      el.setPointerCapture(e.pointerId);
    });

    if (word.bubble) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.textContent = word.bubble;
      el.appendChild(bubble);
    }

    sandbox.appendChild(el);
  });
}

sandbox.addEventListener("pointermove", e => {
  if (!draggingWord) return;
  draggingWord.x = e.clientX - offsetX;
  draggingWord.y = e.clientY - offsetY;
  render();
});

sandbox.addEventListener("pointerup", () => {
  draggingWord = null;
});

function getBubbleWord(text) {
  const bubbles = {
    cat: "cute",
    sat: "quietly",
    mat: "old"
  };
  return bubbles[text] || "very";
}

function updateResult() {
  const combined = words
    .map(w => w.bubble ? `${w.bubble} ${w.text}` : w.text)
    .join(" ");

  resultText.textContent = combined;
}

updateResult();
render();
