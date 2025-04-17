document.addEventListener('DOMContentLoaded', function () {
  console.log("JS is working ✅");

  const indexForm = document.getElementById('moodForm');
  const sleepForm = document.getElementById('sleepForm');
  const stressForm = document.getElementById('stressForm');

  // ====== INDEX PAGE ======
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
      localStorage.setItem('mood', mood);
      window.location.href = 'sleep.html';
    });
  }

  // ====== SLEEP PAGE ======
  if (sleepForm) {
    const sleepBody = document.getElementById('sleepPage');
    const energySlider = document.querySelector('input[name="energy"]');
    const energyDisplay = document.getElementById('energyValue');

    if (energySlider && energyDisplay) {
      energySlider.addEventListener('input', () => {
        const energy = parseInt(energySlider.value);
        energyDisplay.textContent = energy;

        const animationSpeed = 50 - energy * 2; // Slower if energy is low
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

  // ====== STRESS PAGE ======
  if (stressForm) {
    stressForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const trigger = stressForm.trigger.value;
      const coping = [...stressForm.querySelectorAll('input[name="coping"]:checked')]
        .map(cb => cb.value)
        .join(', ') || 'none';
      localStorage.setItem('trigger', trigger);
      localStorage.setItem('coping', coping);
      window.location.href = 'results.html';
    });
  }

  // ====== RESULTS PAGE ======
  const resultsPage = document.getElementById('resultsPage');
  if (resultsPage) {
    const container = document.getElementById('resultsContent');

    const mood = localStorage.getItem('mood');
    const sleep = localStorage.getItem('sleep');
    const energy = parseInt(localStorage.getItem('energy'));
    const trigger = localStorage.getItem('trigger');
    const coping = localStorage.getItem('coping');

    let summary = '';
    let suggestions = '';

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

    summary += `You rated your sleep as "${sleep}" and your energy level at ${energy}/10. `;
    summary += `Your main source of stress is "${trigger}". `;
    summary += `You said you usually cope by: ${coping}. `;

    if (mood === 'stressed' || energy <= 4) {
      suggestions += `
        <ul>
          <li>🧘 Try a guided breathing exercise (see bubble below)</li>
          <li>🎶 Play some calming focus music</li>
          <li>📝 Write down your worries to clear your mind</li>
        </ul>
        <div class="breath-bubble"></div>
      `;
    } else if (mood === 'tired') {
      suggestions += `
        <ul>
          <li>☕ Take a power nap or short walk</li>
          <li>🧃 Hydrate and stretch your body</li>
          <li>📱 Turn off distractions for 20 minutes</li>
        </ul>
      `;
    } else {
      suggestions += `
        <ul>
          <li>😌 Keep up the good habits!</li>
          <li>🕯️ Light a candle, journal or do something relaxing tonight</li>
        </ul>
      `;
    }

    container.innerHTML = `
      <p>${summary}</p>
      <h2>Recommendations:</h2>
      ${suggestions}
    `;

    document.getElementById('restartButton').addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

