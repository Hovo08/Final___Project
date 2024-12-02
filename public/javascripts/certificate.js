document
  .getElementById("certificateForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const lnameInput = document.querySelector('input[name="lname"]');
    const fnameInput = document.querySelector('input[name="fname"]');
    const token = localStorage.getItem("token");
    const successMessageElement = document.querySelector(".succes");
    const errorMessageElement = document.getElementById("errorMessage");

    if (!token) {
      alert("You don't have a token.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    const lname = lnameInput.value.trim();
    const fname = fnameInput.value.trim();

    if (lname === "") {
      successMessageElement.style.color = "red";
      successMessageElement.innerHTML = "This input is undefined.";
      return;
    } else if (fname === "") {
      successMessageElement.style.color = "red";
      successMessageElement.innerHTML = "This input is undefined.";
      return;
    }

    try {
      const response = await axios.post(
        "/send-certificate",
        {
          fname,
          lname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      successMessageElement.style.textAlign = "center";
      successMessageElement.style.color = "green";
      successMessageElement.innerHTML = response.data.message;
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    } catch (error) {
      if (error.response) {
        errorMessageElement.textContent = error.response.data.message;
        errorMessageElement.style.display = "block";
      } else {
        errorMessageElement.textContent = "Failed to send the certificate.";
        errorMessageElement.style.display = "block";
      }
    }
  });
