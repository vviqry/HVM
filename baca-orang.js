/**
 * ==========================================================
 * DATA: 10 TRIK BACA ORANG DIAM-DIAM
 * ==========================================================
 * Format data dibuat dalam bentuk array of objects agar sangat
 * mudah diedit, ditambah, atau dikurangi di masa mendatang.
 *
 * Tiap item memiliki struktur:
 * - id: Nomor urut (1-10)
 * - title: Judul lengkap poin (misal: "1. STATUS — dari Sepatunya")
 * - category: Nama topik utama (misal: "STATUS")
 * - source: Aspek pengamatan (misal: "dari Sepatunya")
 * - good: Tanda Baik (🟢 HIJAU)
 * - warning: Perlu Diperhatikan / Saran (🟡 KUNING)
 * - danger: Tanda Kurang Baik / Red Flag (🔴 MERAH)
 * ==========================================================
 */
const TRIK_BACA_ORANG_DATA = [
  {
    id: 1,
    title: "1. STATUS — dari Sepatunya",
    category: "STATUS",
    source: "dari Sepatunya",
    good: "Sepatu sederhana tapi rapi & bersih dirawat.",
    warning: "Sepatu mahal tapi nggak pernah dirawat, cuma modal beli doang.",
    danger: "Sepatu kotor & jelek, keliatan nggak ada effort jaga penampilan sama sekali."
  },
  {
    id: 2,
    title: "2. DISIPLIN — dari Kebersihan Kuku",
    category: "DISIPLIN",
    source: "dari Kebersihan Kuku",
    good: "Kuku pendek, bersih, terawat rapi.",
    warning: "Kuku dirawat berlebihan, terlalu obsesif sama penampilan luar.",
    danger: "Kuku panjang, kotor, dekil, nggak diperhatikan sama sekali."
  },
  {
    id: 3,
    title: "3. LATAR BELAKANG — dari Cara Duduk",
    category: "LATAR BELAKANG",
    source: "dari Cara Duduk",
    good: "Duduk tegap, sopan, jaga jarak & posisi di tempat umum.",
    warning: "Duduk santai/selonjoran, tanda dibesarkan di lingkungan bebas (nggak selalu buruk).",
    danger: "Duduk sembarangan, nggak sopan, ganggu orang sekitar."
  },
  {
    id: 4,
    title: "4. NIAT MURNI — dari Tatapan Mata",
    category: "NIAT MURNI",
    source: "dari Tatapan Mata",
    good: "Natap stabil & tenang pas ngomong hal penting, tanda jujur & percaya diri.",
    warning: "Matanya sering lirak-lirik ke hal lain, kurang fokus tapi belum tentu berniat jahat.",
    danger: "Natap dengan cara \"menilai\" dari atas ke bawah, tanda ada maksud tersembunyi."
  },
  {
    id: 5,
    title: "5. KARAKTER ASLI — dari Cara Tertawa",
    category: "KARAKTER ASLI",
    source: "dari Cara Tertawa",
    good: "Ketawa lepas, natural, sampai kelihatan tulus.",
    warning: "Ketawa basa-basi doang, \"hehe\" kosong nggak nyampe ke mata.",
    danger: "Ketawa sambil ngeledek/merendahkan orang lain."
  },
  {
    id: 6,
    title: "6. PEDE — dari Gaya Jalan",
    category: "PEDE",
    source: "dari Gaya Jalan",
    good: "Jalan tegap, langkah mantap & santai.",
    warning: "Jalan buru-buru sambil noleh-noleh, gelisah/nggak nyaman.",
    danger: "Jalan nunduk terus, langkah kecil-kecil, tanda minder berat."
  },
  {
    id: 7,
    title: "7. SETIA — dari Arah Mata di Keramaian",
    category: "SETIA",
    source: "dari Arah Mata di Keramaian",
    good: "Fokus cuma ke pasangan/circle-nya walau di tempat rame.",
    warning: "Sesekali notice orang lain tapi masih bisa kontrol diri.",
    danger: "Matanya \"jajan\" terus liatin orang lain walau lagi jalan sama pasangan — red flag kesetiaan."
  },
  {
    id: 8,
    title: "8. PINTAR — dari Cara Menyimak",
    category: "PINTAR",
    source: "dari Cara Menyimak",
    good: "Diem, dengerin sampai selesai, baru nanggepin dengan matang.",
    warning: "Sesekali motong tapi masih nyambung ke topik.",
    danger: "Motong omongan orang terus demi didengar sendiri, nggak peduli ngerti apa nggak."
  },
  {
    id: 9,
    title: "9. ATTITUDE — dari Cara Memperlakukan Orang Lain",
    category: "ATTITUDE",
    source: "dari Cara Memperlakukan Orang Lain",
    good: "Sopan ke semua orang tanpa pandang status (ke pelayan, OB, dll sama aja).",
    warning: "Sopan tapi cuma formalitas, nggak tulus.",
    danger: "Sopan ke atasan/orang penting doang, kasar ke orang \"kecil\" — attitude asli buruk."
  },
  {
    id: 10,
    title: "10. DEWASA — dari Cara Hadapin Beda Pendapat",
    category: "DEWASA",
    source: "dari Cara Hadapin Beda Pendapat",
    good: "Beda pendapat tapi tetep dengerin argumen orang, nggak emosi.",
    warning: "Diem dulu buat redain emosi sebelum lanjut diskusi (wajar, asal nggak ngambek lama).",
    danger: "Langsung marah atau ngambek diem-dieman pas pendapatnya dibantah."
  }
];

// Ekspos ke window agar bisa diakses global jika diperlukan
if (typeof window !== 'undefined') {
  window.TRIK_BACA_ORANG_DATA = TRIK_BACA_ORANG_DATA;
}

(function () {
  'use strict';

  // ========== DOM Elements ==========
  const readingList = document.getElementById('readingList');
  const btnExpandAll = document.getElementById('btnExpandAll');
  const btnCollapseAll = document.getElementById('btnCollapseAll');

  // ========== Helper Format Number ==========
  function padZero(num) {
    return String(num).padStart(2, '0');
  }

  // ========== Render Accordion ==========
  function renderAccordion() {
    if (!readingList) return;

    readingList.innerHTML = '';

    TRIK_BACA_ORANG_DATA.forEach((item, index) => {
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item reading-accordion-item';
      accordionItem.dataset.id = item.id;
      accordionItem.style.animationDelay = `${index * 0.04}s`;

      accordionItem.innerHTML = `
        <button class="accordion-trigger reading-accordion-trigger" type="button" aria-expanded="false" aria-controls="reading-content-${item.id}">
          <span class="accordion-num reading-num">${padZero(item.id)}</span>
          <div class="reading-title-wrap">
            <span class="reading-category">${item.category}</span>
            <span class="reading-source">${item.source}</span>
          </div>
          <svg class="reading-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="accordion-body reading-accordion-body" id="reading-content-${item.id}">
          <div class="reading-traits-container">
            
            <!-- 🟢 HIJAU: Tanda Baik -->
            <div class="trait-card trait-good">
              <span class="trait-dot" aria-hidden="true"></span>
              <p class="trait-text">${item.good}</p>
            </div>

            <!-- 🟡 KUNING: Perlu Diperhatikan / Saran -->
            <div class="trait-card trait-warning">
              <span class="trait-dot" aria-hidden="true"></span>
              <p class="trait-text">${item.warning}</p>
            </div>

            <!-- 🔴 MERAH: Tanda Kurang Baik / Red Flag -->
            <div class="trait-card trait-danger">
              <span class="trait-dot" aria-hidden="true"></span>
              <p class="trait-text">${item.danger}</p>
            </div>

          </div>
        </div>
      `;

      // Event listener: Individual toggle (TIDAK auto-collapse item lain)
      const trigger = accordionItem.querySelector('.accordion-trigger');
      trigger.addEventListener('click', () => {
        const isCurrentlyOpen = accordionItem.classList.contains('is-open');
        accordionItem.classList.toggle('is-open', !isCurrentlyOpen);
        trigger.setAttribute('aria-expanded', String(!isCurrentlyOpen));
      });

      readingList.appendChild(accordionItem);
    });
  }

  // ========== Bulk Controls (Expand / Collapse All) ==========
  function initBulkControls() {
    if (btnExpandAll) {
      btnExpandAll.addEventListener('click', () => {
        const items = readingList.querySelectorAll('.reading-accordion-item');
        items.forEach((item) => {
          item.classList.add('is-open');
          const trigger = item.querySelector('.accordion-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'true');
        });
      });
    }

    if (btnCollapseAll) {
      btnCollapseAll.addEventListener('click', () => {
        const items = readingList.querySelectorAll('.reading-accordion-item');
        items.forEach((item) => {
          item.classList.remove('is-open');
          const trigger = item.querySelector('.accordion-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // ========== Service Worker Registration ==========
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(() => console.log('SW registered'))
        .catch(err => console.log('SW registration failed', err));
    });
  }

  // ========== Initializer ==========
  document.addEventListener('DOMContentLoaded', () => {
    renderAccordion();
    initBulkControls();
  });
})();
