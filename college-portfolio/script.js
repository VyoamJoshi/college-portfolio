/* Smooth scroll */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* Typing animation */
const roles = ["DSA", "LeetCode", "C++", "Java"];
let i = 0, j = 0, forward = true;
function type() {
  const text = roles[i];
  const out = forward ? text.slice(0, ++j) : text.slice(0, --j);
  const el = document.getElementById("typing");
  if (el) el.textContent = out;
  if (j === text.length) forward = false;
  if (j === 0 && !forward) { forward = true; i = (i + 1) % roles.length; }
  setTimeout(type, 120);
}
type();

/* Scroll reveal */
const fades = document.querySelectorAll(".fade-up");
function onScrollReveal() {
  fades.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add("fade-show");
  });
}
window.addEventListener("scroll", onScrollReveal);
onScrollReveal();

/* Theme toggle */
const themeBtn = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") document.body.classList.add("dark");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    themeBtn.innerHTML = document.body.classList.contains("dark") ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });
  themeBtn.innerHTML = document.body.classList.contains("dark") ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

/* Contact form: mailto default + optional EmailJS */
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("formStatus");
    const sendVia = document.querySelector('input[name="sendVia"]:checked').value;

    if (sendVia === "mailto") {
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:dhruv@example.com?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email app…";
      return;
    }

    // Optional: EmailJS (uncomment & fill IDs)
    // 1) Include EmailJS script in index.html <head>:
    // <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
    // 2) Replace USER_ID, SERVICE_ID, TEMPLATE_ID with your values from emailjs.com

    /*
    emailjs.init('USER_ID');
    try {
      await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', { from_name: name, reply_to: email, message });
      status.textContent = "Message sent successfully ✅";
      form.reset();
    } catch(err) {
      status.textContent = "Failed to send via EmailJS. Try Mail app.";
      console.error(err);
    }
    */
  });
}

/* ======= LeetCode live stats support (used by leetcode.html) ======= */
/* Example free community API: https://leetcode-stats-api.herokuapp.com/<username> */
async function initLeetCodeStats(username) {
  const statsBox = document.getElementById("lc-stats");
  if (!statsBox) return;
  statsBox.textContent = "Loading LeetCode stats…";
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const data = await res.json();
    if (data.status === "error") throw new Error(data.message || "API error");

    statsBox.innerHTML = `
      <div class="box"><b>Total Solved:</b> ${data.totalSolved}</div>
      <div class="box"><b>Easy:</b> ${data.easySolved} / ${data.totalEasy}</div>
      <div class="box"><b>Medium:</b> ${data.mediumSolved} / ${data.totalMedium}</div>
      <div class="box"><b>Hard:</b> ${data.hardSolved} / ${data.totalHard}</div>
      <div class="box"><b>Acceptance:</b> ${data.acceptanceRate}%</div>
      <div class="box"><b>Ranking:</b> ${data.ranking ?? "—"}</div>
    `;
  } catch (e) {
    statsBox.innerHTML = `<div class="box">Couldn’t load stats. Please check username or try later.</div>`;
    console.error(e);
  }
}
// Export to window so leetcode.html can call it
window.initLeetCodeStats = initLeetCodeStats;


// Cursor Glow
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
  glow.style.left = `${e.clientX - 100}px`;
  glow.style.top = `${e.clientY - 100}px`;
});