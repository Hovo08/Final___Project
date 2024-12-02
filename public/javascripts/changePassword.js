const form = document.getElementById("changePasswordForm");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    email: document.getElementById("email").value,
    verify_code: document.getElementById("verify_code").value,
    password: document.getElementById("password").value,
  };

  // Check for empty password
  if (!data.password || data.password.trim() === "") {
    errorMessage.innerText = "Password cannot be empty";
    errorMessage.style.display = "block";
    return;
  }

  try {
    const response = await axios.post("/change-password", data);
    window.location.href = "/login";
  } catch (error) {
    if (error.response) {
      errorMessage.innerText = error.response.data.message;
      errorMessage.style.display = "block";
    } else {
      errorMessage.innerText = "An unexpected error occurred.";
      errorMessage.style.display = "block";
    }
  }
});
