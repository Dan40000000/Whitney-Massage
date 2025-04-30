// Highlight selected plan column and insert confirm button
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const selectedPlan = params.get('plan');
  if (!selectedPlan) return;

  const planClass = `plan-${selectedPlan.toLowerCase()}`;
  // Highlight header
  const headerCell = document.querySelector(`th.${planClass}`);
  if (headerCell) headerCell.classList.add('selected');
  // Highlight feature cells
  document.querySelectorAll(`td.${planClass}`).forEach(cell => cell.classList.add('selected'));

  // Add confirm button under selected column
  const confirmCell = document.getElementById(`confirm-${selectedPlan.toLowerCase()}`);
  if (confirmCell) {
    confirmCell.innerHTML = '<button onclick="confirmPlan()">Confirm Plan</button>';
  }
  // Add Change buttons to other columns
  ['basic', 'pro', 'elite'].forEach(plan => {
    if (plan !== selectedPlan.toLowerCase()) {
      const cell = document.getElementById(`confirm-${plan}`);
      if (cell) {
        cell.innerHTML = '<button class="btn-change" onclick="history.back()">Change</button>';
      }
    }
  });
});

// Redirect to thank you page on confirm
function confirmPlan() {
  window.location.href = 'thankyou.html';
}
