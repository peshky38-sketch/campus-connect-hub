// ===============================
// CAMPUS CONNECT HUB SYSTEM
// ===============================

/* =========================================================
   GLOBAL STATE
========================================================= */

let currentUser = null;

/* =========================================================
   POPUP SYSTEM
========================================================= */

function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup-notification";
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2500);
}

/* =========================================================
   AUTH SYSTEM (TEACHER / STUDENT)
// ========================================================= */

function loginUser(role) {

  const password = document.getElementById("loginPassword")?.value.trim();
  const status = document.getElementById("loginStatus");

  const teacherPass = "teacher123";
  const studentPass = "student123";

  if (!password) return;

  if (role === "teacher" && password === teacherPass) {

    currentUser = { role: "teacher" };
    showPopup("Teacher login successful");

    document.getElementById("loginBox").style.display = "none";

    showAnnouncements();
    return;
  }

  if (role === "student" && password === studentPass) {

    currentUser = { role: "student" };
    showPopup("Student login successful");

    document.getElementById("loginBox").style.display = "none";

    showResources();
    showChat();
    return;
  }

  if (status) {
    status.textContent = "Wrong password";
    status.style.color = "red";
  }
}

window.loginUser = loginUser;

/* =========================================================
   ANNOUNCEMENTS (TEACHER ONLY)
========================================================= */

let announcements =
  JSON.parse(localStorage.getItem("announcements")) || [];

function addAnnouncement() {

  if (!currentUser || currentUser.role !== "teacher") {
    showPopup("Only teachers can post announcements");
    return;
  }

  const title = document.getElementById("announcementTitle")?.value.trim();
  const message = document.getElementById("announcementMessage")?.value.trim();

  if (!title || !message) return;

  announcements.unshift({
    title,
    message,
    time: new Date()
  });

  localStorage.setItem("announcements", JSON.stringify(announcements));

  document.getElementById("announcementForm")?.reset();

  showAnnouncements();
  showPopup("Announcement posted");
}

function showAnnouncements() {

  const box = document.getElementById("announcementContainer");
  if (!box) return;

  box.innerHTML = "";

  announcements.forEach(a => {

    box.innerHTML += `
      <div class="announcement-card">
        <h3>${a.title}</h3>
        <p>${a.message}</p>
        <small>${new Date(a.time).toLocaleString()}</small>
      </div>
    `;
  });
}

window.addAnnouncement = addAnnouncement;

/* =========================================================
   RESOURCES (STUDENTS ONLY)
========================================================= */

let resources =
  JSON.parse(localStorage.getItem("resources")) || [];

function addResource() {

  if (!currentUser || currentUser.role !== "student") {
    showPopup("Only students can upload resources");
    return;
  }

  const name = document.getElementById("studentName")?.value.trim();
  const title = document.getElementById("title")?.value.trim();
  const link = document.getElementById("link")?.value.trim();

  if (!name || !title || !link) return;

  resources.unshift({
    name,
    title,
    link,
    time: new Date()
  });

  localStorage.setItem("resources", JSON.stringify(resources));

  showResources();
  showPopup("Resource added");
}

function showResources() {

  const box = document.getElementById("resourceContainer");
  if (!box) return;

  box.innerHTML = "";

  resources.forEach(r => {

    box.innerHTML += `
      <div class="resource-card">
        <h3>${r.title}</h3>
        <p>By: ${r.name}</p>
        <a href="${r.link}" target="_blank">Open</a>
        <small>${new Date(r.time).toLocaleString()}</small>
      </div>
    `;
  });
}

window.addResource = addResource;

/* =========================================================
   CHAT SYSTEM (STUDENTS ONLY)
========================================================= */

let chat =
  JSON.parse(localStorage.getItem("chat")) || [];

function sendMessage() {

  if (!currentUser || currentUser.role !== "student") {
    showPopup("Only students can chat");
    return;
  }

  const name = document.getElementById("chatName")?.value.trim();
  const message = document.getElementById("chatMessage")?.value.trim();

  if (!name || !message) return;

  chat.unshift({
    name,
    message,
    time: new Date()
  });

  localStorage.setItem("chat", JSON.stringify(chat));

  document.getElementById("chatMessage").value = "";

  showChat();
}

function showChat() {

  const box = document.getElementById("chatBox");
  if (!box) return;

  box.innerHTML = "";

  chat.forEach(c => {

    box.innerHTML += `
      <div class="chat-message">
        <strong>${c.name}</strong>
        <p>${c.message}</p>
        <small>${new Date(c.time).toLocaleTimeString()}</small>
      </div>
    `;
  });
}

window.sendMessage = sendMessage;

/* =========================================================
   INIT
========================================================= */

showAnnouncements();
showResources();
showChat();