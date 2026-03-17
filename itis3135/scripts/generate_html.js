// ===============================
// GENERATE HTML OUTPUT
// ===============================

document.getElementById("generate-html-button").addEventListener("click", () => {
  const data = getFormData(); // from introduction.js

  const output = document.getElementById("output");
  form.style.display = "none";

  // Build literal HTML
  const htmlLiteral = buildLiteralHTML(data);

  output.innerHTML = `
    <h2>Introduction HTML</h2>
    <section>
      <pre><code class="language-html">${escapeHTML(htmlLiteral)}</code></pre>
    </section>
  `;

  // Highlight.js
  hljs.highlightAll();

  // Reset button
  const resetLink = document.createElement("button");
  resetLink.textContent = "Reset Form";
  resetLink.addEventListener("click", () => location.reload());
  output.appendChild(resetLink);
});

// -------------------------------
// BUILD LITERAL HTML STRING
// -------------------------------
function buildLiteralHTML(data) {
  return `
<h2>${data.mascotAdj} ${data.mascotAnimal}</h2>
<figure>
  <img src="${data.picture}" alt="User uploaded image">
  <figcaption>${data.caption}</figcaption>
</figure>

<p>${data.personalStatement}</p>

<ul>
  <li><strong>Personal Background:</strong> ${data.bullets.personal}</li>
  <li><strong>Professional Background:</strong> ${data.bullets.professional}</li>
  <li><strong>Academic Background:</strong> ${data.bullets.academic}</li>
  <li><strong>Background in this Subject:</strong> ${data.bullets.subject}</li>
  <li><strong>Primary Work Computer:</strong> ${data.bullets.primary}</li>
  <li><strong>Backup Work Computer & Location Plan:</strong> ${data.bullets.backup}</li>

  <li><strong>Courses I'm Taking, & Why:</strong>
    <ul>
      ${data.courses
        .map(
          (c) =>
            `<li><strong>${c.dept} ${c.num} - ${c.name}:</strong> ${c.reason}</li>`
        )
        .join("")}
    </ul>
  </li>

  ${
    data.funny
      ? `<li><strong>Funny/Interesting item to remember me by:</strong> ${data.funny}</li>`
      : ""
  }

  ${
    data.share
      ? `<li><strong>I’d also like to share:</strong> ${data.share}</li>`
      : ""
  }
</ul>

<blockquote>
  “${data.quote}”<br> - ${data.quoteAuthor}
</blockquote>

<footer>
  ${data.links.map((l) => `<a href="${l}">${l}</a>`).join("\n  ")}
</footer>
`;
}

// -------------------------------
// ESCAPE HTML FOR DISPLAY
// -------------------------------
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
