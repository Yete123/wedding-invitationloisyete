/* =========================================================================
   WEDDING INVITATION — MAIN SCRIPT
   -------------------------------------------------------------------------
   Handles:
     • Cover open animation
     • Reveal-on-scroll (IntersectionObserver)
     • Countdown timer
     • Google Calendar "Save the Date" link generation
     • RSVP form submission → Google Apps Script
     • Wedding wishes load + auto-refresh
     • Music toggle
     • Copy-to-clipboard buttons
     • Guest name from URL (?to=Name)
   ========================================================================= */

(function () {
  'use strict';

  var CFG = window.WEDDING_CONFIG || {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ----------------------------------------------------------------- *
   * 1. Cover "Open Invitation" — reveal the rest of the page
   * ----------------------------------------------------------------- */
  var cover      = $('#cover');
  var main       = $('#mainContent');
  var openBtn    = $('#openInvitation');
  var bgAudio    = $('#bgAudio');
  var musicBtn   = $('#musicBtn');

  function openInvitation() {
    if (!cover || !main) return;
    cover.classList.add('is-opened');
    main.style.display = 'block';
    /* slight delay so display:block applies before transition */
    requestAnimationFrame(function () {
      main.classList.add('is-shown');
    });
    main.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = '';
    /* start background music (must be triggered by user gesture) */
    playMusic();
    /* scroll to top of content */
    window.scrollTo({ top: 0, behavior: 'auto' });
    /* observe reveal elements now that they're visible */
    observeReveals();
    /* load initial wishes */
    loadWishes();
  }

  if (openBtn) openBtn.addEventListener('click', openInvitation);

  /* Lock scroll while cover is visible */
  document.body.style.overflow = 'hidden';

  /* Make cover elements visible immediately (they use .reveal-up for the
     fade-in animation, but the IntersectionObserver only runs after the
     invitation is opened — for the cover we want them visible on load). */
  $$('.cover .reveal-up').forEach(function (el) {
    el.classList.add('is-visible');
  });

  /* ----------------------------------------------------------------- *
   * 2. Guest name from URL (?to=Name)
   *    e.g. https://your-site/?to=Ade+Fitriyani
   * ----------------------------------------------------------------- */
  function getQueryParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]+)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }
  var guest = getQueryParam('to');
  if (guest) {
    var guestEl = $('#guestName');
    if (guestEl) guestEl.textContent = guest;
  }

  /* ----------------------------------------------------------------- *
   * 3. Reveal-on-scroll
   * ----------------------------------------------------------------- */
  var revealObserver = null;
  function observeReveals() {
    var items = $$('.reveal-up');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ----------------------------------------------------------------- *
   * 4. Countdown timer
   * ----------------------------------------------------------------- */
  var cdDays = $('#cdDays'), cdHours = $('#cdHours'),
      cdMins = $('#cdMins'),  cdSecs  = $('#cdSecs');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function updateCountdown() {
    if (!cdDays) return;
    var target = new Date(CFG.WEDDING_DATETIME).getTime();
    if (isNaN(target)) return;
    var now = Date.now();
    var diff = target - now;
    if (diff <= 0) {
      cdDays.textContent = cdHours.textContent = cdMins.textContent = cdSecs.textContent = '00';
      return;
    }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    cdDays.textContent  = pad(d);
    cdHours.textContent = pad(h);
    cdMins.textContent  = pad(m);
    cdSecs.textContent  = pad(s);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ----------------------------------------------------------------- *
   * 5. Google Calendar "Save the Date" link
   *    Format: https://calendar.google.com/calendar/render?action=TEMPLATE&...
   * ----------------------------------------------------------------- */
  function buildCalendarLink() {
    var start = (CFG.WEDDING_DATETIME || '').replace(/[-:]/g, '').replace(/\.\d+$/, '');
    var end   = (CFG.WEDDING_END_DATETIME || CFG.WEDDING_DATETIME || '').replace(/[-:]/g, '').replace(/\.\d+$/, '');
    var params = {
      action: 'TEMPLATE',
      text:   CFG.EVENT ? CFG.EVENT.title : 'Wedding Invitation',
      dates:  start + '/' + end,
      details:CFG.EVENT ? CFG.EVENT.description : '',
      location: CFG.EVENT ? CFG.EVENT.location : ''
    };
    var q = Object.keys(params)
      .map(function (k) { return k + '=' + encodeURIComponent(params[k]); })
      .join('&');
    return 'https://calendar.google.com/calendar/render?' + q;
  }
  var calLink = $('#calendarLink');
  if (calLink) {
    calLink.setAttribute('href', buildCalendarLink());
    if (CFG.WEDDING_DATETIME_TEXT) calLink.textContent = CFG.WEDDING_DATETIME_TEXT;
  }

  /* ----------------------------------------------------------------- *
   * 6. Venue "Open in Google Maps" link
   * ----------------------------------------------------------------- */
  var mapsLink = $('#mapsLink');
  if (mapsLink && CFG.VENUE_MAPS_LINK) {
    mapsLink.setAttribute('href', CFG.VENUE_MAPS_LINK);
  }

  /* ----------------------------------------------------------------- *
   * 7. RSVP form → Google Apps Script
   * ----------------------------------------------------------------- */
  var rsvpForm    = $('#rsvpForm');
  var rsvpStatus  = $('#rsvpStatus');
  var rsvpSubmit  = $('#rsvpSubmit');
  var guestCountField = $('#guestCountField');

  /* Show/hide guest count based on attendance */
  function refreshGuestCountVisibility() {
    if (!rsvpForm) return;
    var checked = rsvpForm.querySelector('input[name="attendance"]:checked');
    if (!checked) return;
    if (checked.value === 'Not Attending') {
      guestCountField.classList.add('is-hidden');
    } else {
      guestCountField.classList.remove('is-hidden');
    }
  }
  if (rsvpForm) {
    $$('input[name="attendance"]', rsvpForm).forEach(function (radio) {
      radio.addEventListener('change', refreshGuestCountVisibility);
    });
  }

  function showStatus(msg, type) {
    if (!rsvpStatus) return;
    rsvpStatus.textContent = msg;
    rsvpStatus.classList.remove('is-success', 'is-error');
    if (type) rsvpStatus.classList.add('is-' + type);
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (rsvpForm.name.value || '').trim();
      var attendance = (rsvpForm.querySelector('input[name="attendance"]:checked') || {}).value;
      var guestCount = rsvpForm.guestCount ? rsvpForm.guestCount.value : '1';
      var message = (rsvpForm.message.value || '').trim();

      if (!name) { showStatus('Please enter your name.', 'error'); return; }
      if (!attendance) { showStatus('Please confirm your attendance.', 'error'); return; }

      if (!CFG.APPS_SCRIPT_URL) {
        showStatus('RSVP not configured yet. See README → Google Apps Script section.', 'error');
        return;
      }

      rsvpSubmit.classList.add('is-loading');
      rsvpSubmit.disabled = true;
      showStatus('Sending your RSVP…');

      var payload = {
        name: name,
        attendance: attendance,
        guestCount: guestCount,
        message: message,
        timestamp: new Date().toISOString()
      };

      fetch(CFG.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        redirect: 'follow'
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.success !== false) {
            showStatus('Thank you! Your RSVP has been received.', 'success');
            rsvpForm.reset();
            refreshGuestCountVisibility();
            /* refresh wishes after a short delay */
            setTimeout(loadWishes, 1500);
          } else {
            throw new Error(data && data.error ? data.error : 'Server error');
          }
        })
        .catch(function () {
          /* Apps Script sometimes returns opaque response — try no-cors fallback */
          return fetch(CFG.APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
          }).then(function () {
            showStatus('Thank you! Your RSVP has been received.', 'success');
            rsvpForm.reset();
            refreshGuestCountVisibility();
            setTimeout(loadWishes, 1500);
          });
        })
        .catch(function () {
          showStatus('Sorry, something went wrong. Please try again.', 'error');
        })
        .finally(function () {
          rsvpSubmit.classList.remove('is-loading');
          rsvpSubmit.disabled = false;
        });
    });
  }

  /* ----------------------------------------------------------------- *
   * 8. Wedding wishes — load + auto refresh
   * ----------------------------------------------------------------- */
  var wishesList = $('#wishesList');
  var loadMoreBtn = $('#loadMoreWishes');
  var wishesShown = 0;
  var wishesCache = [];

  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderWishes(list) {
    if (!wishesList) return;
    if (!list || !list.length) {
      wishesList.innerHTML = '<p class="wishes__empty">No wishes yet. Be the first to send one!</p>';
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }
    var slice = list.slice(0, wishesShown + (CFG.WISHES_PAGE_SIZE || 12));
    wishesShown = slice.length;
    var html = slice.map(function (w) {
      var badge = w.attendance === 'Not Attending'
        ? '<span class="wish-card__badge">Not Attending</span>'
        : (w.attendance ? '<span class="wish-card__badge">' + escapeHtml(w.attendance) + '</span>' : '');
      var msg = w.message ? escapeHtml(w.message) : '<em style="color:var(--text-muted)">No message</em>';
      return ''
        + '<article class="wish-card">'
        +   '<p class="wish-card__name">' + escapeHtml(w.name) + badge + '</p>'
        +   '<p class="wish-card__msg">"' + msg + '"</p>'
        + '</article>';
    }).join('');
    wishesList.innerHTML = html;
    if (loadMoreBtn) {
      loadMoreBtn.style.display = (list.length > wishesShown) ? '' : 'none';
    }
  }

  function loadWishes() {
    if (!wishesList) return;
    if (!CFG.APPS_SCRIPT_URL) {
      wishesList.innerHTML =
        '<p class="wishes__empty">Wishes will appear here once you connect Google Sheets. ' +
        'See README → Google Apps Script section.</p>';
      return;
    }
    /* Don't show "Loading" if we already have data — silent refresh instead */
    if (!wishesCache.length) {
      wishesList.innerHTML = '<p class="wishes__empty">Loading wishes…</p>';
    }

    var url = CFG.APPS_SCRIPT_URL + '?action=wishes&_t=' + Date.now();
    fetch(url, { method: 'GET', redirect: 'follow' })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.success !== false && Array.isArray(data.wishes)) {
          wishesCache = data.wishes;
          renderWishes(wishesCache);
        } else {
          throw new Error(data && data.error ? data.error : 'Invalid response');
        }
      })
      .catch(function () {
        if (!wishesCache.length) {
          wishesList.innerHTML =
            '<p class="wishes__empty">Could not load wishes right now. ' +
            'Please check back in a moment.</p>';
        }
      });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      renderWishes(wishesCache);
    });
  }

  /* Auto-refresh wishes periodically */
  if (CFG.APPS_SCRIPT_URL && CFG.WISHES_REFRESH_MS) {
    setInterval(loadWishes, CFG.WISHES_REFRESH_MS);
  }

  /* ----------------------------------------------------------------- *
   * 9. Music toggle
   * ----------------------------------------------------------------- */
  function playMusic() {
    if (!bgAudio || !musicBtn) return;
    bgAudio.volume = 0.5;
    var p = bgAudio.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        musicBtn.classList.add('is-playing');
      }).catch(function () {
        /* autoplay blocked — user can still tap to play */
      });
    }
  }
  function pauseMusic() {
    if (!bgAudio || !musicBtn) return;
    bgAudio.pause();
    musicBtn.classList.remove('is-playing');
  }
  if (musicBtn) {
    musicBtn.addEventListener('click', function () {
      if (bgAudio.paused) playMusic();
      else pauseMusic();
    });
  }

  /* ----------------------------------------------------------------- *
   * 10. Copy-to-clipboard buttons (gift section)
   * ----------------------------------------------------------------- */
  function copyText(text, btn) {
    if (!text) return;
    var done = function () {
      if (!btn) return;
      var original = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = original; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text); done();
      });
    } else {
      fallbackCopy(text); done();
    }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }
  var copyBankBtn = $('#copyBankBtn');
  if (copyBankBtn) {
    copyBankBtn.addEventListener('click', function () {
      copyText(CFG.BANK_ACCOUNT_NUMBER || copyBankBtn.getAttribute('data-copy'), copyBankBtn);
    });
  }
  var copyAddrBtn = $('#copyAddrBtn');
  if (copyAddrBtn) {
    copyAddrBtn.addEventListener('click', function () {
      copyText(CFG.GIFT_ADDRESS, copyAddrBtn);
    });
  }

  /* ----------------------------------------------------------------- *
   * 11. Smooth-scroll for any in-page anchor
   * ----------------------------------------------------------------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
