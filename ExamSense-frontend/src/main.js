import "./home.css";
// import "./generate.css";

// Navigation routing
const navLinks = document.querySelectorAll("nav p[data-route]");
const pages = document.querySelectorAll("#home, #generate, #upload, #about");

function showPage(pageId) {
  // Hide all pages
  pages.forEach((page) => {
    page.style.display = "none";
  });

  // Show selected page
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.style.display = "flex";
  }
}

// Add click listeners to nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const route = e.target.getAttribute("data-route");
    showPage(route);
  });
});

// Landing page CTA buttons
const landingBtn1 = document.querySelector(".landing-btn-1");
const landingBtn2 = document.querySelector(".landing-btn-2");

if (landingBtn1) {
  landingBtn1.addEventListener("click", () => {
    showPage("generate");
  });
}

if (landingBtn2) {
  landingBtn2.addEventListener("click", () => {
    showPage("upload");
  });
}

// About page CTA buttons
const ctaBtnPrimary = document.querySelector(".cta-btn-primary");
const ctaBtnSecondary = document.querySelector(".cta-btn-secondary");

if (ctaBtnPrimary) {
  ctaBtnPrimary.addEventListener("click", () => {
    showPage("generate");
  });
}

if (ctaBtnSecondary) {
  ctaBtnSecondary.addEventListener("click", () => {
    showPage("upload");
  });
}

// Audio file upload handling
const audioFileInput = document.createElement("input");
audioFileInput.type = "file";
audioFileInput.accept = "audio/*";
audioFileInput.style.display = "none";

document.body.appendChild(audioFileInput);

const uploadBtn = document.querySelector(".upload-btn");
if (uploadBtn) {
  uploadBtn.addEventListener("click", () => {
    audioFileInput.click();
  });
}

// Handle file selection
audioFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    displaySelectedFile(file);
  }
});

function displaySelectedFile(file) {
  const fileInfoDiv = document.getElementById("selectedFileInfo");
  const fileNameEl = document.getElementById("fileName");
  const fileSizeEl = document.getElementById("fileSize");
  const fileIcon = document.querySelector(".file-icon");

  // Update file name and size
  fileNameEl.textContent = file.name;
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
  fileSizeEl.textContent = `${fileSizeMB} MB`;

  // Show the file info section
  fileInfoDiv.style.display = "block";

  // Get audio duration
  const audio = new Audio();
  audio.src = URL.createObjectURL(file);
  audio.onloadedmetadata = () => {
    const duration = Math.floor(audio.duration);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    document.getElementById("fileDuration").textContent =
      `Duration: ${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Change icon based on file size
  if (fileSizeMB > 500) {
    fileIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
    fileSizeEl.style.color = "#ef4444";
  }
}

// Remove file button
const fileRemoveBtn = document.getElementById("fileRemoveBtn");
if (fileRemoveBtn) {
  fileRemoveBtn.addEventListener("click", () => {
    document.getElementById("selectedFileInfo").style.display = "none";
    audioFileInput.value = "";
  });
}

// Show home page by default
showPage("home");

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});

// Load theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme("light");
}
