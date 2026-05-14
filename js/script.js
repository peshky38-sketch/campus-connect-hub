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

  resources.forEach(function (resource, index) {

    const card =
      document.createElement("div");

    card.classList.add("resource-card");

    card.innerHTML = `
      <h3>${resource.title}</h3>

      <p>${resource.description}</p>

      <p>
        <strong>Subject:</strong>
        ${resource.subject}
      </p>

      <p>
        <strong>Uploaded By:</strong>
        ${resource.studentName}
      </p>

      <a href="${resource.link}" target="_blank">
        Open Resource
      </a>

      <button class="delete-btn"
        onclick="deleteResource(${index})">
        Delete
      </button>
    `;

    resourceContainer.appendChild(card);

  });

}

// ===============================
// DELETE RESOURCE
// ===============================

function deleteResource(index) {

  let resources =
    JSON.parse(localStorage.getItem("resources")) || [];

  resources.splice(index, 1);

  localStorage.setItem(
    "resources",
    JSON.stringify(resources)
  );

  displayResources();

  updateResourceCounter();

}

// ===============================
// SEARCH FUNCTIONALITY
// ===============================

const searchInput =
  document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("keyup", function () {

    const searchValue =
      searchInput.value.toLowerCase();

    const cards =
      document.querySelectorAll(".resource-card");

    cards.forEach(function (card) {

      const text =
        card.textContent.toLowerCase();

      if (text.includes(searchValue)) {

        card.style.display = "block";

      } else {

        card.style.display = "none";

      }

    });

  });

}

// ===============================
// RESOURCE COUNTER
// ===============================

function updateResourceCounter() {

  const resourceCount =
    document.getElementById("resourceCount");

  if (resourceCount) {

    const resources =
      JSON.parse(localStorage.getItem("resources")) || [];

    resourceCount.textContent =
      resources.length;

  }

}

updateResourceCounter();

// ===============================
// DARK MODE
// ===============================

const darkModeBtn =
  document.getElementById("darkModeBtn");

if (darkModeBtn) {

  darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

  });

}

// ===============================
// WELCOME ALERT
// ===============================

window.addEventListener("load", function () {

  console.log(
    "Welcome to Campus Connect Hub"
  );

});

// ===============================
// SCROLL ANIMATION
// ===============================

const cards =
  document.querySelectorAll(
    ".resource-card, .announcement-card, .card"
  );

  window.addEventListener("scroll", function () {
    cards.forEach(function (card) {

    const position =
      card.getBoundingClientRect().top;

      const screenHeight =
      window.innerHeight;

    if (position < screenHeight - 100) {

      card.classList.add("show");

    }

  });

});

// ==============================
// ANNOUNCEMENTS SYSTEM 
// ==============================

let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
let editIndex = null;
let isAdmin = false;

// ==============================
// ADMIN LOGIN
// ==============================
function loginAdmin() {
  const password = document.getElementById("adminPassword").value;
  const status = document.getElementById("adminStatus");

  if (password === "admin123") {
    isAdmin = true;

    document.getElementById("announcementForm").style.display = "block";
    document.getElementById("adminLoginBox").style.display = "none";

    showPopup("Admin login successful ✔");
  } else {
    status.textContent = "Wrong password!";
    status.style.color = "red";
  }
}

// ==============================
// POPUP NOTIFICATION
// ==============================
function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup-notification";
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2500);
}

// ==============================
// TIME AGO
// ==============================
function timeAgo(date) {
  let seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return "Just now";

  let minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  let hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  let days = Math.floor(hours / 24);
  return `${days} days ago`;
}

// ==============================
// RENDER ANNOUNCEMENTS
// ==============================
function renderAnnouncements() {
  const container = document.getElementById("announcementContainer");
  container.innerHTML = "";

  announcements.forEach((a, index) => {
    container.innerHTML += `
      <div class="announcement-card">
        <h3>${a.title}</h3>
        <p>${a.message}</p>

        <small class="timestamp">
          Posted: ${timeAgo(a.time)}
        </small>

        <div class="announcement-actions">
          <button onclick="editAnnouncement(${index})">Edit</button>
          <button onclick="deleteAnnouncement(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  localStorage.setItem("announcements", JSON.stringify(announcements));
}

// ==============================
// ADD / EDIT ANNOUNCEMENT
// ==============================
document.getElementById("announcementForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!isAdmin) {
    showPopup("Please login as admin first ");
    return;
  }

  const title = document.getElementById("announcementTitle").value.trim();
  const message = document.getElementById("announcementMessage").value.trim();

  if (title === "" || message === "") {
    showPopup("Fill in all fields!");
    return;
  }

  if (editIndex === null) {
    announcements.unshift({
      title,
      message,
      time: new Date()
    });

    showPopup("Announcement posted ");
  } else {
    announcements[editIndex].title = title;
    announcements[editIndex].message = message;

    showPopup("Announcement updated ✏️");
    editIndex = null;
  }

  this.reset();
  renderAnnouncements();
});

// ==============================
// DELETE
// ==============================
function deleteAnnouncement(index) {
  if (!isAdmin) {
    showPopup("Admin only action ");
    return;
  }

  announcements.splice(index, 1);
  renderAnnouncements();

  showPopup("Announcement deleted ");
}

// ==============================
// EDIT
// ==============================
function editAnnouncement(index) {
  if (!isAdmin) {
    showPopup("Admin only action ");
    return;
  }

  document.getElementById("announcementTitle").value =
    announcements[index].title;

  document.getElementById("announcementMessage").value =
    announcements[index].message;

  editIndex = index;
}

// ==============================
// INIT
// ==============================
renderAnnouncements();