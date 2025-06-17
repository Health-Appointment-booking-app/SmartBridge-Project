document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const forgotLink = document.getElementById("forgotLink");
  const forgotSection = document.getElementById("forgotSection");
  const sendOtpBtn = document.getElementById("sendOtpBtn");

  // Toggle forgot password section
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    forgotSection.style.display =
      forgotSection.style.display === "none" ? "block" : "none";
  });

  // Handle login form submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const identifier = document.getElementById("identifier").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Login successful!");
        // Redirect based on role, e.g., dashboard.html
        window.location.href = "/dashboard.html";
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("🚨 Login failed. Please try again later.");
    }
  });

  // Handle OTP request
  sendOtpBtn.addEventListener("click", async () => {
    const recoveryInput = document.getElementById("recoveryInput").value;

    if (!recoveryInput) {
      alert("⚠️ Please enter your email or mobile number.");
      return;
    }

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recoveryInput }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("📩 OTP sent successfully to your registered contact!");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("OTP send error:", err);
      alert("🚨 Failed to send OTP. Try again later.");
    }
  });
});
