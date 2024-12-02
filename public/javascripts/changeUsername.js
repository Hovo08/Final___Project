async function changeUserName(event) {
  event.preventDefault();
  const newName = document.querySelector('input[name="newName"]').value; 
  const password = document.querySelector('input[name="password"]').value; 

  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "/change-username",
      {
        newName,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message); 
  } catch (error) {
    const errorMessage = document.getElementById("errorMessage");
    if (error.response) {
      errorMessage.textContent = error.response.data.message;
      errorMessage.style.display = "block";
    } else {
      errorMessage.textContent = "Error when you changed userName";
      errorMessage.style.display = "block";
    }
  }
}
