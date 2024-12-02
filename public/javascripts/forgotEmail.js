document
  .getElementById("forgotEmailForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const messageDiv = document.getElementById("message");
    messageDiv.textContent = "";
    if (data.email.trim() === "") {
      return (messageDiv.textContent = "Email is undifined");
    }
    try {
      const response = await axios.post("forgot-email", {
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        messageDiv.textContent = "Email sent successfully!";
        messageDiv.className = "success";
        setTimeout(() => {
          window.location.href = "/change-email";
        }, 3000);
      }
    } catch (error) {
      messageDiv.textContent =
        error.response?.data?.message || "An error occurred. Please try again.";
      messageDiv.className = "error";
    }
  });
