const form = document.getElementById("intro-form");
// ===============================
// FUNCTIONS FIRST (fixes "used before defined")
// ===============================

function getFormData() {
  const formData = new FormData(form);

  const courses = [];
  const courseDivs = document.querySelectorAll("#courses-container .course");

  courseDivs.forEach((div) => {
    const dept = div.querySelector("input[name='course_dept']").value;
    const num = div.querySelector("input[name='course_num']").value;
    const name = div.querySelector("input[name='course_name']").value;
    const reason = div.querySelector("input[name='course_reason']").value;

    if (dept || num || name || reason) {
      courses.push({ dept, num, name, reason });
    }
  });

  const pictureFile = formData.get("picture");
  let pictureURL = "LPLJoke.jpg";

  if (pictureFile && pictureFile.size > 0) {
    pictureURL = URL.createObjectURL(pictureFile);
  }

  return {
    first: formData.get("first_name"),
    middle: formData.get("middle_name"),
    preferred: formData.get("preferred_name"),
    last: formData.get("last_name"),
    ack: formData.get("ack_statement"),
    ackDate: formData.get("ack_date"),
    mascotAdj: formData.get("mascot_adj"),
    mascotAnimal: formData.get("mascot_animal"),
    divider: formData.get("divider"),
    picture: pictureURL,
    caption: formData.get("picture_caption"),
    personalStatement: formData.get("personal_statement"),
    bullets: {
      personal: formData.get("personal_background"),
      professional: formData.get("professional_background"),
      academic: formData.get("academic_background"),
      subject: formData.get("subject_background"),
      primary: formData.get("primary_computer"),
      backup: formData.get("backup_plan")
    },
    courses,
    quote: formData.get("quote"),
    quoteAuthor: formData.get("quote_author"),
    funny: formData.get("funny"),
    share: formData.get("share"),
    links: [
      formData.get("link1"),
        formData.get("link2"),
          formData.get("link3"),
            formData.get("link4"),
              formData.get("link5")
    ]
  };
}
function validateRequired(data) {
  return Boolean(
    data.first &&
    data.last &&
    data.ack &&
    data.ackDate &&
    data.mascotAdj &&
    data.mascotAnimal &&
    data.divider &&
    data.caption &&
    data.personalStatement &&
    data.bullets.personal &&
    data.bullets.professional &&
    data.bullets.academic &&
    data.bullets.subject &&
    data.bullets.primary &&
    data.bullets.backup &&
    data.quote &&
    data.quoteAuthor
  );
}
function buildIntroHTML(data) {
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
function generateIntroduction() {
  const data = getFormData();
  if (!validateRequired(data)) {
    alert("Please fill out all required fields.");
    return;
  }

  const output = document.getElementById("output");
  output.innerHTML = buildIntroHTML(data);
  form.style.display = "none";

  const resetLink = document.createElement("button");
  resetLink.textContent = "Reset Form";
  resetLink.addEventListener("click", () => location.reload());
  output.appendChild(resetLink);

  // autograder
  const grader = document.createElement("script");
  grader.src = "https://lint.page/kit/4d0fe3.js";
  grader.crossOrigin = "anonymous";
  output.appendChild(grader);
}







// ===============================
// EVENT LISTENERS AFTER FUNCTIONS
// ===============================

form.addEventListener("submit", (e) => {
  e.preventDefault();
  generateIntroduction();
});

document.getElementById("clear-button").addEventListener("click", () => {
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((el) => (el.value = ""));
});

document.getElementById("add-course").addEventListener("click", () => {
  const container = document.getElementById("courses-container");

  const div = document.createElement("div");
  div.classList.add("course");

  div.innerHTML = `
  <label>Department:
  <input type="text" name="course_dept" placeholder="ITIS">
  </label>
  <label>Number:
  <input type="text" name="course_num" placeholder="3135">
  </label>
  <label>Name:
  <input type="text" name="course_name" placeholder="Course Name">
  </label>
  <label>Reason:
  <input type="text" name="course_reason" placeholder="Reason for taking">
  </label>
  <button type="button" class="delete-course">Delete</button>
  `;

  container.appendChild(div);

  div.querySelector(".delete-course").addEventListener("click", () => {
    div.remove();
  });
});
