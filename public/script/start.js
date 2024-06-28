document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('start-form');
  const exitBu = document.querySelector('#exit');

  console.log(exitBu);

  exitBu.addEventListener('click', () => {
    window.location.href = '../html/exit.html';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const id = formData.get('id');
    const name = formData.get('name');

    // Local Storage에 id와 name 저장
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);

    fetch('/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`,
    })
      .then((response) => {
        if (response.ok) {
          // main.html로 이동
          window.location.href = `/main.html`;
        } else {
          alert('Error: Unable to start. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error: Unable to start. Please try again.');
      });
  });
});
