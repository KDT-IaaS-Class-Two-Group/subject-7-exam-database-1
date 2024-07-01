document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("start-form");
  const exitBu = document.querySelector("#exit");

  console.log(exitBu);

  exitBu.addEventListener("click", () => {
    window.location.href = "../html/exit.html";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const id = formData.get("id");
    const name = formData.get("name");

    // Local Storage에 id와 name 저장
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);

    if (id === "") {
      alert("값을 입력해주세요!");
      return;
    } else {
      fetch("/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // 성공적으로 생성된 경우 main.html로 이동
            window.location.href = "/main.html";
          } else {
            // ID와 이름이 일치하지 않거나 이름이 중복되는 경우 경고창 표시
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error: Unable to start. Please try again.");
        });
    }
  });
});
