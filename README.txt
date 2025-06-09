Annual Raise App
----------------

This project contains a Google Apps Script (`Code.gs`) and an accompanying HTML
interface (`index.html`) for calculating annual raises for employees across
multiple departments.

The employee lists now include sticky column headers showing rank, employee
pay info, pay increase slider, percent increase, and hourly increase.

Header labels have been shortened and centered so they stay on one line.

Sorting by rank now updates and saves the sequential ranks back to the
spreadsheet, and the employee rows are reordered so the sort persists
after refreshing the page.

The chosen rank sort setting is now saved on the server, so once the list has
been sorted by rank it will continue to load in that order until "Sort Rank"
is pressed again.

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
