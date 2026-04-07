// Syntax highlighting
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightElement(block);
  });
});

// Collapsible glossary
document.querySelectorAll(".glossary-term").forEach((term) => {
  term.addEventListener("click", () => {
    const def = term.nextElementSibling;
    def.style.display = def.style.display === "block" ? "none" : "block";
  });
});

// Pointer visualizer starter
function drawPointerExample() {
  const canvas = document.getElementById("pointerCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#31748f";
  ctx.fillRect(20, 20, 120, 50);
  ctx.fillStyle = "#e0def4";
  ctx.fillText("int x = 5;", 30, 50);

  ctx.beginPath();
  ctx.moveTo(140, 45);
  ctx.lineTo(220, 45);
  ctx.strokeStyle = "#eb6f92";
  ctx.stroke();

  ctx.fillStyle = "#31748f";
  ctx.fillRect(220, 20, 120, 50);
  ctx.fillStyle = "#e0def4";
  ctx.fillText("int *p = &x;", 230, 50); // This is canvas text, NOT HTML, so & is correct here
}

// Try-it-yourself code runner (read-only)
function runCode() {
  const input = document.getElementById("codeInput").value;
  const output = document.getElementById("codeOutput");

  output.textContent = "This is a read-only demo.\n\nYour code:\n" + input;
}
