document.addEventListener('DOMContentLoaded', function () {
  console.log("JS is working ✅");

  const indexForm = document.getElementById('moodForm');
  const sleepForm = document.getElementById('sleepForm');
  const stressForm = document.getElementById('stressForm');

  // ====== INDEX PAGE: MOOD FORM ======
  if (indexForm) {
    const body = document.getElementById('indexPage');

    indexForm.addEventListener('change', () => {
      const selectedMood = document.querySelector('input[name="mood"]:checked')?.value;
      body.className = ''; // Clear previous mood classes

      switch (selectedMood) {
        case 'happy':
          body.classList.add('happy-bg');
          break;
        case 'stressed':
          body.classList.add('stressed-bg');
          break;
        case 'tired':
          body.classList.add('tired-bg');
          break;
        case 'calm':
          body.classList.add('calm-bg');
          break;
      }
    });

    indexForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const mood = document.querySelector('input[name="mood"]:checked').value;

      // Save to localStorage
      localStorage.setItem('mood', mood);

      // Navigate to next page
      window.location.href = 'sleep.html';
    });
  }

  // ====== SLEEP PAGE: SLEEP & ENERGY FORM ======
  if (sleepForm) {
    const sleepBody = document.getElementById('sleepPage');
    const energySlider = document.querySelector('input[name="energy"]');
    const energyDisplay = document.getElementById('energyValue');

    // Live display of energy value + animation speed
    if (energySlider && energyDisplay) {
      energySlider.addEventListener('input', () => {
        const energy = parseInt(energySlider.value);
        energyDisplay.textContent = energy;

        // Change animation speed based on energy level (lower = slower)
        const animationSpeed = 30 - energy * 2; // range from 28s to 10s
        sleepBody.style.animationDuration = `${animationSpeed}s`;
      });
    }

    sleepForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const sleep = sleepForm.sleep.value;
      const energy = sleepForm.energy.value;

      localStorage.setItem('sleep', sleep);
      localStorage.setItem('energy', energy);

      window.location.href = 'stress.html';
    });
  }

  // ====== STRESS PAGE: STRESS FORM ======
  if (stressForm) {
    const stressBody = document.getElementById('stressPage');
    const stressSlider = document.querySelector('input[name="stress"]');
    const stressDisplay = document.getElementById('stressValue');

    // Live display of stress value
    if (stressSlider && stressDisplay) {
      stressSlider.addEventListener('input', () => {
        const stress = parseInt(stressSlider.value);
        stressDisplay.textContent = stress;

        // Adjust background animation speed based on stress level (higher = faster)
        const animationSpeed = 40 - stress * 2; // range from 40s to 10s
        stressBody.style.animationDuration = `${animationSpeed}s`;
      });
    }

    stressForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const stress = stressForm.stress.value;

      localStorage.setItem('stress', stress);

      window.location.href = 'results.html';
    });
  }
});

// ====== RESULTS PAGE ======
const resultsPage = document.getElementById('resultsPage');
if (resultsPage) {
const container = document.getElementById('resultsContent');

const mood = localStorage.getItem('mood');
const sleep = localStorage.getItem('sleep');
const energy = parseInt(localStorage.getItem('energy'));
const stress = localStorage.getItem('stress');
const coping = localStorage.getItem('coping');

let summary = '';
let suggestions = '';

// Mood analysis
switch (mood) {
  case 'happy':
    summary += 'You seem to be in a great mood today. ';
    break;
  case 'stressed':
    summary += 'You mentioned feeling stressed. ';
    break;
  case 'tired':
    summary += 'You’re feeling a bit tired. ';
    break;
  case 'calm':
    summary += 'You’re feeling calm, which is great. ';
    break;
}

// Sleep & energy
summary += `You rated your sleep as "${sleep}" and your energy level at ${energy}/10. `;

// Stress + coping
if (stress === 'high') {
  summary += 'Your stress levels seem high. ';
  suggestions += `
    <ul>
      <li>🧘 Try a guided breathing exercise (see bubble below)</li>
      <li>🎶 Play some calming focus music</li>
      <li>📝 Write down your worries to clear your mind</li>
    </ul>
    <div class="breath-bubble"></div>
  `;
} else if (stress === 'medium') {
  summary += 'You have some moderate stress. ';
  suggestions += `
    <ul>
      <li>☀️ Take a short walk or stretch break</li>
      <li>📅 Try time-blocking your schedule</li>
      <li>🫂 Talk to a friend or classmate</li>
    </ul>
  `;
} else {
  summary += 'Your stress levels seem manageable. ';
  suggestions += `
    <ul>
      <li>😌 Keep up the good habits!</li>
      <li>🕯️ Light a candle, journal or do something relaxing tonight</li>
    </ul>
  `;
}

// Coping
summary += `You said you usually cope by "${coping}". `;

container.innerHTML = `
  <p>${summary}</p>
  <h2>Recommendations:</h2>
  ${suggestions}
`;
}
