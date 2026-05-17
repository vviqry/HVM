/**
 * Checklist Harian - Daily Checklist PWA
 * Features:
 * - Add/remove checklist items
 * - Checkbox with ❌ icon & strikethrough animation
 * - Auto-reset at midnight (00:00)
 * - localStorage persistence
 * - Progress tracking
 */

(function () {
  'use strict';

  // ========== DOM Elements ==========
  const taskList = document.getElementById('taskList');
  const dateDisplay = document.getElementById('dateDisplay');
  const failureCountEl = document.getElementById('failureCount');
  const hvmStatusEl = document.getElementById('hvmStatus');

  // ========== Constants ==========
  const STORAGE_KEY = 'hvm_checklist_failures';
  const DATE_KEY = 'hvm_checklist_date';

  const HVM_ITEMS = [
    "Mata Anda menjadi lebih tajam",
    "Anda menikmati tidur yang lebih nyenyak",
    "Menjadi kurang mudah marah",
    "Menjadi lebih ramah kepada orang lain",
    "Pernapasan menjadi lebih tenang",
    "Kurang mengkritik diri sendiri",
    "Wajah menjadi lebih rileks",
    "Lebih banyak ide muncul",
    "Anda bangun dengan perasaan lebih ringan",
    "Anda berhenti makan berlebihan",
    "Kecemasan masa depan memudar",
    "Pikiran yang berlomba-lomba berkurang",
    "Pembelian impulsif berkurang",
    "Lebih termotivasi untuk berlatih",
    "Kamar Anda tetap lebih bersih",
    "Waktu di media sosial berkurang",
    "Hal-hal kecil membuat Anda bahagia",
    "Kehidupan sehari-hari terasa bermakna"
  ];

  // ========== State ==========
  let failures = []; // Stores indices of failed items

  // ========== Initialization ==========
  function init() {
    updateDateDisplay();
    checkMidnightReset();
    loadFailures();
    renderTasks();
    updateStats();
    scheduleMidnightReset();
  }

  // ========== Date Display ==========
  function updateDateDisplay() {
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString('id-ID', options);
  }

  // ========== Midnight Reset ==========
  function getTodayString() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  function checkMidnightReset() {
    const savedDate = localStorage.getItem(DATE_KEY);
    const today = getTodayString();

    if (savedDate && savedDate !== today) {
      localStorage.removeItem(STORAGE_KEY); // Reset failures for new day
    }
    localStorage.setItem(DATE_KEY, today);
  }

  function scheduleMidnightReset() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    setTimeout(() => {
      failures = [];
      saveFailures();
      renderTasks();
      updateStats();
      updateDateDisplay();
      localStorage.setItem(DATE_KEY, getTodayString());
      scheduleMidnightReset();
    }, msUntilMidnight);
  }

  // ========== Storage ==========
  function loadFailures() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      failures = data ? JSON.parse(data) : [];
    } catch {
      failures = [];
    }
  }

  function saveFailures() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(failures));
  }

  // ========== Task Operations ==========
  function toggleFailure(index) {
    const pos = failures.indexOf(index);
    if (pos === -1) {
      failures.push(index);
    } else {
      failures.splice(pos, 1);
    }
    saveFailures();
    updateStats();
    
    // UI Feedback
    const el = taskList.children[index];
    if (el) {
      el.classList.toggle('checked', failures.includes(index));
      const cb = el.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = failures.includes(index);
    }
  }

  // ========== Rendering ==========
  function renderTasks() {
    taskList.innerHTML = '';

    HVM_ITEMS.forEach((text, index) => {
      const isFailed = failures.includes(index);
      const li = document.createElement('li');
      li.className = `task-item${isFailed ? ' checked' : ''}`;
      li.style.animationDelay = `${index * 0.03}s`;

      li.innerHTML = `
        <div class="checkbox-area">
          <input type="checkbox" ${isFailed ? 'checked' : ''} aria-label="Gagal: ${text}" />
          <div class="checkbox-visual">
            <span class="cross-icon">❌</span>
          </div>
        </div>
        <span class="task-label">${text}</span>
      `;

      li.addEventListener('click', () => toggleFailure(index));
      taskList.appendChild(li);
    });
  }

  // ========== Stats ==========
  function updateStats() {
    const count = failures.length;
    failureCountEl.textContent = count;

    // Status logic
    let status = "Elite";
    let color = "var(--accent-secondary)";

    if (count > 0 && count <= 3) {
      status = "Strong";
      color = "#51cf66"; // Green
    } else if (count > 3 && count <= 8) {
      status = "Average";
      color = "#fcc419"; // Yellow
    } else if (count > 8) {
      status = "Warning";
      color = "var(--red-cross)";
    }

    hvmStatusEl.textContent = status;
    hvmStatusEl.style.color = color;
  }

  // ========== PWA Registration ==========
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.log('SW failed', err));
    });
  }

  // ========== Accordion (Page 6) ==========
  function initAccordion() {
    const list = document.getElementById('accordionList');
    if (!list) return;

    const triggers = list.querySelectorAll('.accordion-trigger');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const isCurrentlyOpen = item.classList.contains('is-open');

        // Close all items (enforce single-open rule)
        list.querySelectorAll('.accordion-item').forEach((el) => {
          el.classList.remove('is-open');
          el.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        });

        // Toggle the clicked item (open only if it was closed before)
        if (!isCurrentlyOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ========== Start ==========
  document.addEventListener('DOMContentLoaded', () => {
    init();
    initAccordion();
  });
})();

