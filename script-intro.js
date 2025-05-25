const steps = document.querySelectorAll('.step');
const nextBtn = document.getElementById('nextBtn');

steps.forEach((step, index) => {
  const checkbox = step.querySelector('.agree');
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      if (index < steps.length - 1) {
        steps[index + 1].style.display = 'block';
      } else {
        nextBtn.disabled = false;
      }
    } else {
      nextBtn.disabled = true;
    }
  });
});

nextBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});
