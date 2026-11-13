/* =========================================================================
   WEDDING INVITATION — CONFIG
   -------------------------------------------------------------------------
   This is the ONLY file you need to edit for backend / technical settings.

   For names, photos, dates that show on the page itself,
   edit them directly in index.html (just search and replace the placeholder
   text — every name is plain HTML text).

   Edit this config file ONLY for:
     1. Wedding date & time (used by the countdown + Google Calendar link)
     2. Google Apps Script URL (after you deploy your Apps Script web app)
     3. Gift bank account number (also referenced by the copy button)
     4. Maps link (also referenced by the venue button)

   No need to touch script.js unless you want to change behaviour.
   ========================================================================= */

window.WEDDING_CONFIG = {

  /* ---------------------------------------------------------------------
     1. WEDDING DATE & TIME
        Format: "YYYY-MM-DDTHH:MM:SS"  (24-hour, local time)
        Example: December 20, 2025, 09:00 → "2025-12-20T09:00:00"
     --------------------------------------------------------------------- */
  WEDDING_DATETIME: "2030-05-16T09:00:00",

  /* Friendly display text shown under the countdown.
     Edit this to match your real date format. */
  WEDDING_DATETIME_TEXT: "Thursday, 16 May 2030 · 09:00 WIB",

  /* Used by the Google Calendar "Save the Date" link.
     Use end time for the calendar event (Akad end / reception end). */
  WEDDING_END_DATETIME: "2030-05-16T15:00:00",

  /* ---------------------------------------------------------------------
     2. EVENT DETAILS (used by Google Calendar "Add to Calendar" link)
     --------------------------------------------------------------------- */
  EVENT: {
    title:       "Wedding of Sica & Abner",
    location:    "Ballroom The Grand Hall, Jl. Placeholder No. 456, City",
    description: "We invite you to share in our joy as we celebrate our wedding. " +
                 "Akad Nikah: 09:00 WIB · Resepsi: 12:00 - 15:00 WIB. " +
                 "Looking forward to seeing you there!"
  },

  /* ---------------------------------------------------------------------
     3. GOOGLE APPS SCRIPT URL
        After you deploy your Apps Script as a Web App (see README), paste
        the URL here. It should end with /exec.
        Example: "https://script.google.com/macros/s/AKfyc.../exec"
     --------------------------------------------------------------------- */
  APPS_SCRIPT_URL: "",

  /* ---------------------------------------------------------------------
     4. VENUE — Google Maps link
        Used by the "Open in Google Maps" button.
        Get this from Google Maps → Share → "Copy link".
     --------------------------------------------------------------------- */
  VENUE_MAPS_LINK: "https://www.google.com/maps/search/?api=1&query=Monas+Jakarta",

  /* ---------------------------------------------------------------------
     5. GIFT — Bank account number
        Used by the "Copy Account Number" button in the Gift section.
     --------------------------------------------------------------------- */
  BANK_ACCOUNT_NUMBER: "1234567890",

  /* ---------------------------------------------------------------------
     6. GIFT — Delivery address
        Used by the "Copy Address" button.
     --------------------------------------------------------------------- */
  GIFT_ADDRESS: "Jl. Placeholder No. 78, City, ZIP, Indonesia",

  /* ---------------------------------------------------------------------
     7. RSVP behaviour
     --------------------------------------------------------------------- */
  WISHES_REFRESH_MS: 15000,  /* how often to refresh wishes (15s) */
  WISHES_PAGE_SIZE: 12      /* how many wishes to load at once   */
};
