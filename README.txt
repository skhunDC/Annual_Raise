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

Employee raise amounts entered in the % Up or $/hr Up fields are now
automatically saved a moment after typing stops so data persists even if the
page is refreshed.

The "Reset Allocations" button now clears all saved allocation percentages on
the server so slider values no longer revert when ranks are adjusted or panels
are re-rendered.

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
