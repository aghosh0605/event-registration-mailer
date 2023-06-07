const thisForm = document.getElementById("registration_form");
thisForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(thisForm).entries();
  const response = await fetch("http://127.0.0.1:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const result = await response.json();
  console.log(result);
});
