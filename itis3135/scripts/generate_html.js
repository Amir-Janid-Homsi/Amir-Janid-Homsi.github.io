// ===============================
// ESCAPE FUNCTION (required)
// ===============================
function escapeHTML(str) {
  return str
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
}

// ===============================
// BUILD LITERAL HTML (matches YOUR intro exactly)
// ===============================
function buildLiteralHTML(data) {
  return `
  <h2>${data.mascotAdj} ${data.mascotAnimal}</h2>

  <figure>
  <img src="${data.picture}" alt="User uploaded image">
  <figcaption>${data.caption}</figcaption>
  </figure>

  <p>${data.personalStatement}</p>

  <ul>
  <li><b>Personal Background:</b> ${data.bullets.personal}</li>
  <li><b>Professional Background:</b> ${data.bullets.professional}</li>
  <li><b>Academic Background:</b> ${data.bullets.academic}</li>
  <li><b>Background in this Subject:</b> ${data.bullets.subject}</li>
  <li><b>Primary Work Computer:</b> ${data.bullets.primary}</li>
  <li><b>Backup Work Computer & Location Plan:</b> ${data.bullets.backup}</li>

  <li><b>Courses I'm Taking, & Why:</b>
  <ul>
  ${data.courses
    .map(
      (c) =>
      `<li><b>${c.dept} ${c.num} - ${c.name}:</b> ${c.reason}</li>`
    )
    .join("")}
    </ul>
    </li>

    ${data.funny ? `<li><b>Funny/Interesting item to remember me by:</b> ${data.funny}</li>` : ""}
    ${data.share ? `<li><b>I’d also like to share:</b> ${data.share}</li>` : ""}
    </ul>

    <blockquote>
    “${data.quote}”<br> - ${data.quoteAuthor}
    </blockquote>

    <footer>
    ${data.links.map((l) => `<a href="${l}">${l}</a>`).join("")}
    </footer>
    `;
}

// ===============================
// MAIN GENERATOR
// ===============================
function generateHTMLLiteral() {
  const data = getFormData(); // uses your existing function

  const output = document.getElementById("output");
  form.style.display = "none";

  // Change H2 on the page
  const h2 = document.querySelector("h2");
  if (h2) h2.textContent = "Introduction HTML";

  // Insert escaped HTML literal
  output.innerHTML = `
  <section>
  <pre><code class="language-html">
  ${escapeHTML(buildLiteralHTML(data))}
  </code></pre>
  </section>
  `;

  // Highlight.js
  if (window.hljs) hljs.highlightAll();

  // Reset button
  const resetLink = document.createElement("button");
  resetLink.textContent = "Reset Form";
  resetLink.addEventListener("click", () => location.reload());
  output.appendChild(resetLink);

  // Autograder
  const grader = document.createElement("script");
  grader.src = "https://lint.page/kit/4d0fe3.js";
  grader.crossOrigin = "anonymous";
  output.appendChild(grader);
}

// ===============================
// EVENT LISTENER FOR BUTTON
// ===============================
document.getElementById("generate-html-button")
.addEventListener("click", generateHTMLLiteral);
