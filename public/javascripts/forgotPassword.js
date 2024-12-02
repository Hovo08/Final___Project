const form = document.getElementById("forgot-password"); // Corrected ID
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    email: document.getElementById("email").value,
  };

  try {
    const response = await axios.post("/forgot-password", data);
    // Redirect to change password page on success
    window.location.href = "/change-password";
  } catch (error) {
    // Check if error.response exists and handle accordingly
    if (error.response && error.response.status === 404) {
      errorMessage.innerText = error.response.data.message; // Display the actual error message
      errorMessage.style.display = "block";
    } else {
      errorMessage.innerText = "An unexpected error occurred.";
      errorMessage.style.display = "block";
    }
  }
});
