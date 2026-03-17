// ===============================
// GENERATE JSON OUTPUT
// ===============================

document.getElementById("generate-json-button").addEventListener("click", () => {
  const data = getFormData(); // from introduction.js

  const output = document.getElementById("output");
  form.style.display = "none";

  // Build JSON literal
  const jsonLiteral = buildJSONLiteral(data);

  output.innerHTML = `
    <h2>Introduction JSON</h2>
    <section>
      <pre><code class="language-json">${escapeHTML(jsonLiteral)}</code></pre>
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
// BUILD JSON STRING
// -------------------------------
function buildJSONLiteral(data) {
  const jsonObj = {
    first_name: data.first,
    middle_name: data.middle,
    preferred_name: data.preferred,
    last_name: data.last,
    divider: data.divider,
    mascot_adjective: data.mascotAdj,
    mascot_animal: data.mascotAnimal,
    image: data.picture,
    image_caption: data.caption,
    personal_statement: data.personalStatement,
    personal_background: data.bullets.personal,
    professional_background: data.bullets.professional,
    academic_background: data.bullets.academic,
    subject_background: data.bullets.subject,
    primary_computer: data.bullets.primary,
    backup_plan: data.bullets.backup,
    courses: data.courses.map((c) => ({
      department: c.dept,
      number: c.num,
      name: c.name,
      reason: c.reason,
    })),
    funny: data.funny || "",
    share: data.share || "",
    quote: data.quote,
    quote_author: data.quoteAuthor,
    links: data.links.map((l) => ({ href: l })),
  };

  return JSON.stringify(jsonObj, null, 2);
}

// -------------------------------
// ESCAPE HTML FOR DISPLAY
// (same helper used in generate_html.js)
// -------------------------------
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
