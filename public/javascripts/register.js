const form = document.getElementById("registerForm");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = {
    username: document.querySelector("#username").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  if (document.querySelector("#password").value.trim() === "") {
    errorMessage.innerText = "Password is undifined";
    return;
  }
  try {
    const response = await axios.post("/register", data);
    window.location.href = "/login";
  } catch (error) {
    if (error.response) {
      errorMessage.innerText = error.response.data.message;
    } else if (error.status === 400) {
      errorMessage.innerText = "Inavlid Password or Mail or Username"; // Display error message
    } else {
      errorMessage.innerText = "An unexpected error occurred.";
    }
  }
});
