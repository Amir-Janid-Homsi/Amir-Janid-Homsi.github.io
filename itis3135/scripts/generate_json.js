// ===============================
// FUNCTIONS FIRST
// ===============================

function buildJSONLiteral(data) {
  const jsonObj = {
    firstName: data.first,
    middleName: data.middle,
    preferredName: data.preferred,
    lastName: data.last,
    divider: data.divider,
    mascotAdjective: data.mascotAdj,
    mascotAnimal: data.mascotAnimal,
    image: data.picture,
    imageCaption: data.caption,
    personalStatement: data.personalStatement,
    personalBackground: data.bullets.personal,
    professionalBackground: data.bullets.professional,
    academicBackground: data.bullets.academic,
    subjectBackground: data.bullets.subject,
    primaryComputer: data.bullets.primary,
    backupPlan: data.bullets.backup,
    courses: data.courses.map((c) => ({
      department: c.dept,
      number: c.num,
      name: c.name,
      reason: c.reason
    })),
    funny: data.funny || "",
    share: data.share || "",
    quote: data.quote,
    quoteAuthor: data.quoteAuthor,
    links: data.links.map((l) => ({ href: l }))
  };

  return JSON.stringify(jsonObj, null, 2);
}

function escapeHTML(str) {
  return str
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
}

// ===============================
// MAIN BUTTON HANDLER
// ===============================

document.getElementById("generate-json-button").addEventListener("click", () => {
  const data = getFormData();
  const output = document.getElementById("output");
  form.style.display = "none";

  output.innerHTML = `
  <h2>Introduction JSON</h2>
  <section>
  <pre><code class="language-json">${escapeHTML(buildJSONLiteral(data))}</code></pre>
  </section>
  `;

  hljs.highlightAll();

  const resetLink = document.createElement("button");
  resetLink.textContent = "Reset Form";
  resetLink.addEventListener("click", () => location.reload());
  output.appendChild(resetLink);
});
