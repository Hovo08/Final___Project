const form = document.getElementById("loginForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value,
  };
  try {
      const response = await axios.post("/login", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("Ваш токен:", token);
      window.location.href = "/profile";
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const spanElement = document.createElement("p");
      spanElement.style.textAlign = "center";
      spanElement.innerText = error.response.data.message;
      form.append(spanElement);
      setTimeout(() => {
        spanElement.innerText = "";
      }, 2000);
    } else {
      console.error("Error without response:", error.message);
    }
  }
});
