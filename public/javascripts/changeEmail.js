const form = document.getElementById("changeEmailForm");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    verify_code: document.getElementById("verify_code").value,
  };

  if (data.email.trim() === "") {
    return (errorMessage.innerText = "Email is undifined");
  }
  try {
    const response = await axios.post("/change-email", data);
    window.location.href = "/login";
  } catch (error) {
    if (error.response) {
      errorMessage.innerText = error.response.data.message;
    } else {
      errorMessage.innerText = "An unexpected error occurred.";
    }
    errorMessage.style.display = "block";
  }
});
