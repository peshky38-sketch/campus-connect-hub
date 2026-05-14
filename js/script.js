// ===============================
// CAMPUS CONNECT HUB JAVASCRIPT
// ===============================

// RESOURCE FORM

const resourceForm = document.getElementById("resourceForm");

if (resourceForm) {

  resourceForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // INPUT VALUES

    const studentName =
      document.getElementById("studentName").value.trim();

    const subject =
      document.getElementById("subject").value.trim();

    const title =
      document.getElementById("title").value.trim();

    const description =
      document.getElementById("description").value.trim();

    const link =
      document.getElementById("link").value.trim();

    const message =
      document.getElementById("message");

      // VALIDATION

    if (
      studentName === "" ||
      subject === "" ||
      title === "" ||
      description === "" ||
      link === ""
    ) {

      message.style.color = "red";

      message.textContent =
        "Please fill in all fields.";

      return;
    }

    // RESOURCE OBJECT

    const resource = {
      studentName,
      subject,
      title,
      description,
      link
    };
    // GET EXISTING DATA

    let resources =
      JSON.parse(localStorage.getItem("resources")) || [];
      // PUSH NEW DATA

    resources.push(resource);

    // SAVE TO LOCAL STORAGE

    localStorage.setItem(
      "resources",
      JSON.stringify(resources)
    );
    // SUCCESS MESSAGE

    message.style.color = "green";

    message.textContent =
      "Resource uploaded successfully!";

    // RESET FORM

    resourceForm.reset();

    // UPDATE COUNTER

    updateResourceCounter();

  });

}

// ===============================
// DISPLAY RESOURCES
// ===============================

const resourceContainer =
  document.getElementById("resourceContainer");

if (resourceContainer) {

  displayResources();

}

function displayResources() {

  const resources =
    JSON.parse(localStorage.getItem("resources")) || [];

  resourceContainer.innerHTML = "";

  if (resources.length === 0) {

    resourceContainer.innerHTML = `
      <p class="empty-message">
        No resources uploaded yet.
      </p>
    `;

    return;
  }