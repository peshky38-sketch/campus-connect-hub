// ===============================
// CAMPUS CONNECT HUB JAVASCRIPT
// ===============================

/* =========================================================
   RESOURCE SYSTEM
========================================================= */

const resourceForm = document.getElementById("resourceForm");

if (resourceForm) {

  resourceForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const link = document.getElementById("link").value.trim();
    const message = document.getElementById("message");

    if (!studentName || !subject || !title || !description || !link) {
      message.style.color = "red";
      message.textContent = "Please fill in all fields.";
      return;
    }

    const resource = {
      studentName,
      subject,
      title,
      description,
      link
    };

    let resources = JSON.parse(localStorage.getItem("resources")) || [];
    resources.push(resource);

    localStorage.setItem("resources", JSON.stringify(resources));

    message.style.color = "green";
    message.textContent = "Resource uploaded successfully!";

    resourceForm.reset();
    updateResourceCounter();
    displayResources();
  });
}

/* =========================================================
   DISPLAY RESOURCES
========================================================= */

const resourceContainer = document.getElementById("resourceContainer");

function displayResources() {

  if (!resourceContainer) return;

  const resources = JSON.parse(localStorage.getItem("resources")) || [];

  resourceContainer.innerHTML = "";

  if (resources.length === 0) {
    resourceContainer.innerHTML = "<p>No resources uploaded yet.</p>";
    return;
  }

  resources.forEach((resource, index) => {

    const card = document.createElement("div");
    card.classList.add("resource-card");

    card.innerHTML = `
      <h3>${resource.title}</h3>
      <p>${resource.description}</p>
      <p><strong>Subject:</strong> ${resource.subject}</p>
      <p><strong>Uploaded By:</strong> ${resource.studentName}</p>
      <a href="${resource.link}" target="_blank">Open Resource</a>
      <button onclick="deleteResource(${index})">Delete</button>
    `;

    resourceContainer.appendChild(card);
  });
}

if (resourceContainer) displayResources();

/* =========================================================
   DELETE RESOURCE
========================================================= */

function deleteResource(index) {
  let resources = JSON.parse(localStorage.getItem("resources")) || [];
  resources.splice(index, 1);
  localStorage.setItem("resources", JSON.stringify(resources));
  displayResources();
  updateResourceCounter();
}

/* =========================================================
   RESOURCE COUNTER
========================================================= */

function updateResourceCounter() {
  const counter = document.getElementById("resourceCount");

  if (!counter) return;

  const resources = JSON.parse(localStorage.getItem("resources")) || [];
  counter.textContent = resources.length;
}

updateResourceCounter();

/* =========================================================
   ANNOUNCEMENTS SYSTEM (NEW)
========================================================= */

let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
let editIndex = null;

const announcementForm = document.getElementById("announcementForm");
const announcementContainer = document.getElementById("announcementContainer");

/* ADD / EDIT ANNOUNCEMENT */

if (announcementForm) {

  announcementForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("announcementTitle").value.trim();
    const message = document.getElementById("announcementMessage").value.trim();

    if (!title || !message) return;

    if (editIndex === null) {

      announcements.unshift({
        title,
        message,
        time: new Date()
      });

    } else {

      announcements[editIndex].title = title;
      announcements[editIndex].message = message;
      editIndex = null;
    }

    localStorage.setItem("announcements", JSON.stringify(announcements));

    announcementForm.reset();
    renderAnnouncements();
  });
}

/* RENDER ANNOUNCEMENTS */

function renderAnnouncements() {

  if (!announcementContainer) return;

  announcementContainer.innerHTML = "";

  if (announcements.length === 0) {
    announcementContainer.innerHTML = "<p>No announcements yet.</p>";
    return;
  }

  announcements.forEach((a, index) => {

    const card = document.createElement("div");
    card.classList.add("announcement-card");

    card.innerHTML = `
      <h3>${a.title}</h3>
      <p>${a.message}</p>
      <small>${new Date(a.time).toLocaleString()}</small>

      <button onclick="editAnnouncement(${index})">Edit</button>
      <button onclick="deleteAnnouncement(${index})">Delete</button>
    `;

    announcementContainer.appendChild(card);
  });
}

if (announcementContainer) renderAnnouncements();

/* DELETE ANNOUNCEMENT */

function deleteAnnouncement(index) {
  announcements.splice(index, 1);
  localStorage.setItem("announcements", JSON.stringify(announcements));
  renderAnnouncements();
}

/* EDIT ANNOUNCEMENT */

function editAnnouncement(index) {
  document.getElementById("announcementTitle").value = announcements[index].title;
  document.getElementById("announcementMessage").value = announcements[index].message;
  editIndex = index;
}

/* =========================================================
   SEARCH FUNCTIONALITY
========================================================= */

const searchInput = document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("keyup", function () {

    const searchValue = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".resource-card");

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(searchValue) ? "block" : "none";
    });

  });

}

/* =========================================================
   DARK MODE
========================================================= */

const darkModeBtn = document.getElementById("darkModeBtn");

if (darkModeBtn) {

  darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

}

/* =========================================================
   SCROLL ANIMATION
========================================================= */

window.addEventListener("scroll", function () {

  document.querySelectorAll(".resource-card, .announcement-card, .card")
    .forEach(card => {

      const position = card.getBoundingClientRect().top;

      if (position < window.innerHeight - 100) {
        card.classList.add("show");
      }

    });

});