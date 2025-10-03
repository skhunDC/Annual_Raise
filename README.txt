Annual Raise App
----------------

This project contains a Google Apps Script (`Code.gs`) and an accompanying HTML
interface (`index.html`) for calculating annual raises for employees across
multiple departments.

The employee lists now include sticky column headers showing rank, employee
pay info, pay increase slider, percent increase, and hourly increase.

Header labels have been shortened and centered so they stay on one line.

Employee rank inputs include dedicated up and down buttons. Clicking the
arrows moves the selected employee higher or lower in the list one spot at a
time until the top or bottom is reached. Manual number entry is still
supported, and each change is saved back to the spreadsheet immediately.

Employee cards can also be reordered directly with drag and drop. You can grab
anywhere on the card (outside of editable fields) to move an employee to a new
position. As you drop, the list re-numbers automatically, alternating row
shading updates to match, and new ranks are saved instantly. Dragging is
available whenever the active planning year is in edit mode.

Employee raise amounts entered in the % Up or $/hr Up fields are now
automatically saved a moment after typing stops so data persists even if the
page is refreshed.

The % Up and $/hr Up fields now sit beside each employee's name so the cards
take up less vertical space without hiding any controls on mobile.

The "Reset Allocations" button now clears all saved allocation percentages on
the server so slider values no longer revert when ranks are adjusted or panels
are re-rendered.

A "Save" button is available in the page header. Clicking it manually persists
all current department and employee allocations, hourly increases, and ranks to
the spreadsheet as a fallback to the automatic saves.
Pressing the Save button now briefly displays a "Saved!" message as confirmation.

Annual Snapshot Workflow
------------------------
- A new year selector in the header lets you switch between the active planning
  year and archived snapshots. Past years load in read-only mode so you can
  review decisions without risking edits.
- Use the **Archive Current Year** button to capture the present Departments and
  Employees sheets into timestamped copies (e.g. `Departments_2025`). The
  archive step is idempotent, so you can refresh a snapshot if late changes are
  made before year-end.
- The **Start New Year** button prompts for the upcoming year, automatically
  archives the completed cycle, resets raise allocations/hourly adjustments to
  zero, and updates the planning year stored with the spreadsheet.
- Save, edit, and reset controls are automatically disabled while viewing an
  archived year to keep historical data pristine.

Responsive Design Refresh
-------------------------
- Introduced a mobile-first layout with fluid spacing, ensuring the experience
  feels native on phones, tablets, and desktops.
- Converted department columns to a responsive grid (1 / 2 / 3 columns at key
  breakpoints) and added elevated cards for clearer visual grouping.
- Redesigned the header and action bar with modern surfaces, safe-area padding,
  and touch-friendly buttons that adapt to available width.
- Restyled employee rows to reflow into stacked sections on narrow screens
  while preserving the original horizontal layout on large displays.
- Expanded large-screen department columns so three-card layouts have generous
  width for the rank, slider, and pay data without horizontal scrolling.
- Removed the raise/percent/hourly column headers and tightened the minimum
  department card width for a more compact grid on all breakpoints.

Edit Data Workspace
-------------------
- Replaced the legacy Edit Data view with a full-screen modal workspace that
  keeps the rest of the dashboard visible but non-interactive while editing.
- Grouped department and employee inputs into card-like sections with clearly
  labeled headers, quick add buttons, and scrollable tables that preserve visibility on
  smaller screens.
- Added accessible focus management so opening the editor traps scroll and
  returns focus to the launch button after closing.

See `AGENTS.md` for repository contribution guidelines.

To embed the deployed web app in your own `index.html`, ensure `doGet` allows iframe embedding:

```
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

Then include the deployed URL inside an iframe in your page:

```
<iframe src="https://YOUR_WEB_APP_URL"></iframe>
```

Bug Fixes
---------
- Fixed server functions to handle empty sheets without errors.
- Fixed rank change resetting raise inputs by keeping allocations in memory.
- Added a new "HourlyIncrease" column so $/hr adjustments are saved exactly as entered.
- Fixed ranking column detection so ranks load correctly on older sheets.
- Hourly increase now drives percent and slider values so exact cents persist.
- Fixed hourly increase initialization so saved percentages remain when $/hr is blank.
- Fixed rounding so $/hr values like 1.00 are not increased to 1.01.
- Enforced two-decimal rounding for $/hr increases when editing or loading employees.
- Removed extra rounding and set the employee slider step to 0.01 so cent values persist exactly.
- Adjusted position of the "Saved!" message so it no longer overlaps the Save button.
- Smoothed typing in the % and $/hr inputs so values are only formatted after entry is complete.
- Cleared the % and $/hr inputs by default so new rows start blank instead of showing 0.00.
- Fixed drag and drop so the entire employee card is draggable and focusable,
  eliminating cases where dragging silently failed on some browsers.
- Made drag-and-drop reordering react instantly when hovering over another card
  so rows shift as soon as they overlap without waiting for a delay.
- Prevented the employee raise slider from triggering unintended card drags by
  temporarily disabling row dragging while the control is in use.
