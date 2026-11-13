/**
 * =========================================================================
 * WEDDING INVITATION — GOOGLE APPS SCRIPT (RSVP backend)
 * =========================================================================
 *
 * This script does two things:
 *   1. Saves every RSVP submission as a new row in a Google Sheet.
 *   2. Returns the saved wishes (name + message) so they can be displayed
 *      in the "Wedding Wishes" wall on the website.
 *
 * SETUP — do this exactly once:
 *   1. Open https://script.google.com  → New project
 *   2. Delete the placeholder code, paste this whole file in.
 *   3. (Optional) Change SHEET_NAME below if you want.
 *   4. Click Deploy → New deployment
 *        - Type:           Web app
 *        - Description:    Wedding RSVP API
 *        - Execute as:     Me  (your Google account)
 *        - Who has access: Anyone
 *   5. Authorize when prompted (Google will warn — it's safe, your own script).
 *   6. Copy the Web app URL (ends with /exec).
 *   7. Paste that URL into js/config.js → APPS_SCRIPT_URL.
 *
 * The script auto-creates the sheet + headers on first run.
 * =========================================================================
 */

var SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var sheet = getSheet();
    var row = [
      new Date(),                       // Timestamp
      data.name || '',
      data.attendance || '',
      data.guestCount || '',
      data.message || ''
    ];
    sheet.appendRow(row);

    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || '';
    if (action === 'wishes') {
      return json({ success: true, wishes: getWishes() });
    }
    return json({ success: false, error: 'Unknown action: ' + action });
  } catch (err) {
    return json({ success: false, error: String(err) });
  }
}

/**
 * Read wishes from the sheet, newest first.
 * Returns: [{ name, message, attendance, timestamp }, ...]
 */
function getWishes() {
  var sheet = getSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var data = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  var wishes = [];
  for (var i = data.length - 1; i >= 0; i--) {
    var row = data[i];
    wishes.push({
      timestamp:  row[0] ? new Date(row[0]).toISOString() : '',
      name:       String(row[1] || '').trim(),
      attendance: String(row[2] || '').trim(),
      guestCount: String(row[3] || '').trim(),
      message:    String(row[4] || '').trim()
    });
  }
  return wishes;
}

/**
 * Get (or create) the RSVP sheet with headers.
 */
function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    // Fallback if no bound spreadsheet — create one in the user's Drive
    ss = SpreadsheetApp.create('Wedding RSVP Database');
  }
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Attendance', 'GuestCount', 'Message']);
    sheet.setFrozenRows(1);
    sheet.getRange('A1:E1').setFontWeight('bold');
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 140);
    sheet.setColumnWidth(4, 120);
    sheet.setColumnWidth(5, 500);
  }
  return sheet;
}

/**
 * Wrap a JS object as a JSON response with CORS headers.
 */
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * OPTIONAL TEST — run this from the Apps Script editor to verify the
 * sheet is created and to insert a test row.
 */
function testInsert() {
  var sheet = getSheet();
  sheet.appendRow([new Date(), 'Test Guest', 'Attending', '2', 'Test wishes from Apps Script!']);
  Logger.log('Test row inserted. Total rows: ' + sheet.getLastRow());
}
