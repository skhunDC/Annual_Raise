const SPREADSHEET_ID = '1nE5fHAJ4QSVVu3UxOf2T0d6u5k7HfjIZCKGDGyv40S8';

function doGet() {
  initializeData();
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function initializeData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // -- Departments sheet (unchanged) --
  let deptSheet = ss.getSheetByName('Departments');
  if (!deptSheet) {
    deptSheet = ss.insertSheet('Departments');
    deptSheet.getRange('A1:C1')
      .setValues([['Department','TotalWages','RaiseAllocationPercent']]);
    const sampleDepts = [
      ['Customer Service',300000,0],
      ['Production',450000,0],
      ['Delivery',200000,0]
    ];
    deptSheet.getRange(2,1,sampleDepts.length,3)
      .setValues(sampleDepts);
  }

  // -- Employees sheet, with AllocationPercent migration/seed --
  let empSheet = ss.getSheetByName('Employees');
  if (!empSheet) {
    empSheet = ss.insertSheet('Employees');
    // header with allocation and ranking columns
    empSheet.getRange('A1:F1')
      .setValues([['Name','Department','HourlyRate','AnnualHours','AllocationPercent','Rank']]);
  } else {
    // ensure AllocationPercent and Rank columns exist
    const header = empSheet.getRange(1,1,1,empSheet.getLastColumn()).getValues()[0];
    let col = header.length;
    if (header.indexOf('AllocationPercent') < 0) {
      empSheet.getRange(1, ++col).setValue('AllocationPercent');
      const numRows = empSheet.getLastRow() - 1;
      if (numRows > 0) {
        empSheet.getRange(2, col, numRows).setValue(0);
      }
    }
    if (header.indexOf('Rank') < 0) {
      empSheet.getRange(1, ++col).setValue('Rank');
      const dataRows = empSheet.getLastRow() - 1;
      if (dataRows > 0) {
        const data = empSheet.getRange(2,2,dataRows,1).getValues();
        const counts = {};
        const ranks = data.map(r => {
          const d = r[0] || '';
          counts[d] = (counts[d] || 0) + 1;
          return [counts[d]];
        });
        empSheet.getRange(2, col, dataRows).setValues(ranks);
      }
    }
  }

  // seed sample employees only if no data rows
  if (empSheet.getLastRow() < 2) {
    const sampleEmps = [
      { name: 'Beth Artz',             rate:18.00, hours:1800 },
      { name: 'Regina Barnett',        rate:18.80, hours:1800 },
      { name: 'Shelly Beckman',        rate:19.66, hours:1800 },
      { name: 'James Bell',            rate:17.68, hours:1800 },
      { name: 'Lucas Butler',          rate:15.00, hours:1800 },
      { name: 'Mia Butler',            rate:15.00, hours:1800 },
      { name: 'Jason Byerly',          rate:16.00, hours:1800 },
      { name: 'Jessie Castillo',       rate:19.66, hours:1800 },
      { name: 'Silvia Cedeno',         rate:21.38, hours:1800 },
      { name: 'Owen Chilcoat',         rate:17.00, hours:1800 },
      { name: 'Anne Cooper',           rate:17.33, hours:1800 },
      { name: 'Nellie Cumbow',         rate:18.56, hours:1800 },
      { name: 'Demetria Dale',         rate:25.00, hours:1800 },
      { name: 'Paul Davis',            rate:17.50, hours:1800 },
      { name: 'Jorge Delgado',         rate:19.66, hours:1800 },
      { name: 'Stephanie Delgado',     rate:16.64, hours:1800 },
      { name: 'Marlene Duarte',        rate:20.80, hours:1800 },
      { name: 'Janice Duffy',          rate:23.90, hours:1800 },
      { name: 'Dipali Dutta',          rate:18.98, hours:1800 },
      { name: 'Dorian Grant',          rate:17.68, hours:1800 },
      { name: 'Jaylyn Grieser',        rate:16.65, hours:1800 },
      { name: 'Jordyn Grieser',        rate:15.29, hours:1800 },
      { name: 'Heather Haskins',       rate:18.02, hours:1800 },
      { name: 'Karen Hay',             rate:28.54, hours:1800 },
      { name: 'Ingrid Heineman',       rate:17.00, hours:1800 },
      { name: 'Aubrey Henry',          rate:15.32, hours:1800 },
      { name: 'Francisco Hernandez',   rate:15.28, hours:1800 },
      { name: 'Kelly Johnson',         rate:17.00, hours:1800 },
      { name: 'Kenneth Joy',           rate:18.32, hours:1800 },
      { name: 'Lynn Kerst',            rate:22.34, hours:1800 },
      { name: 'Sea Khun',              rate:30.04, hours:1800 },
      { name: 'Kaylee Lackey',         rate:16.64, hours:1800 },
      { name: 'Melissa Lackey',        rate:33.28, hours:1800 },
      { name: 'Patricia Law',          rate:21.02, hours:1800 },
      { name: 'Lisa Mabry',            rate:25.00, hours:1800 },
      { name: 'Mireya Martinez Rivas', rate:23.00, hours:1800 },
      { name: 'Karla Mercado',         rate:18.00, hours:1800 },
      { name: 'Marcela Mora',          rate:16.64, hours:1800 },
      { name: 'Angela Moss',           rate:17.47, hours:1800 },
      { name: 'Karmen Nelson',         rate:18.20, hours:1800 },
      { name: 'David Perry',           rate:18.00, hours:1800 },
      { name: 'Omar Ramirez Cruz',     rate:18.02, hours:1800 },
      { name: 'Jed Reichard',          rate:19.82, hours:1800 },
      { name: 'Brent Remy',            rate:17.00, hours:1800 },
      { name: 'Ashardae Robinson',     rate:16.00, hours:1800 },
      { name: 'Darius Robinson',       rate:16.00, hours:1800 },
      { name: 'Mark Rost',             rate:20.80, hours:1800 },
      { name: 'Gloria Salto',          rate:16.00, hours:1800 },
      { name: 'Demetrio Santiago',     rate:19.24, hours:1800 },
      { name: 'Kevin Shelton',         rate:16.00, hours:1800 },
      { name: 'Jeffrey Spillner',      rate:16.04, hours:1800 },
      { name: 'Myanna Staysniak',      rate:17.00, hours:1800 },
      { name: 'Adele Thomasson',       rate:36.04, hours:1800 },
      { name: 'Ashley Whightsel',      rate:16.00, hours:1800 }
    ];
    const out = sampleEmps.map((e,i) => [e.name,'',e.rate,e.hours,0,i+1]);
    empSheet.getRange(2,1,out.length,6).setValues(out);
  }
}

// Read departments
function getDepartments() {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Departments');
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return [];
  const rows = sh.getRange(2, 1, lastRow - 1, 3).getValues();
  return rows.map(r => ({ name: r[0], wages: r[1], pct: r[2] }));
}

// Read employees + their saved allocation
function getEmployees() {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Employees');
  const lastCol = sh.getLastColumn();
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return [];
  const rows = sh.getRange(2, 1, lastRow - 1, lastCol).getValues();
  return rows.map(r => ({
    name:       r[0],
    dept:       r[1],
    rate:       r[2],
    hours:      r[3],
    allocation: r[4] || 0,
    rank:       r[5] || 1
  }));
}

// Used by Edit-Data modal (does not touch allocations)
function saveDashboardData(departments, employees) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // preserve existing allocs and ranks
  const empSh = ss.getSheetByName('Employees');
  const hdr = empSh.getRange(1,1,1,empSh.getLastColumn()).getValues()[0];
  const allocIdx = hdr.indexOf('AllocationPercent');
  const rankIdx  = hdr.indexOf('Rank');
  const existingAlloc = {};
  const existingRank  = {};
  if (allocIdx >= 0 || rankIdx >= 0) {
    const lastRow = empSh.getLastRow();
    if (lastRow > 1) {
      const data = empSh.getRange(2, 1, lastRow - 1, empSh.getLastColumn()).getValues();
      data.forEach(r => {
        if (allocIdx >= 0) existingAlloc[r[0]] = r[allocIdx];
        if (rankIdx >= 0) existingRank[r[0]] = r[rankIdx];
      });
    }
  }

  // rewrite Departments
  const ds = ss.getSheetByName('Departments');
  ds.clearContents();
  ds.getRange('A1:C1').setValues([['Department','TotalWages','RaiseAllocationPercent']]);
  if (departments.length) {
    ds.getRange(2,1,departments.length,3)
      .setValues(departments.map(d=>[d.name,d.wages,d.pct]));
  }

  // rewrite Employees (with preserved allocations and ranks)
  empSh.clearContents();
  empSh.getRange('A1:F1')
    .setValues([['Name','Department','HourlyRate','AnnualHours','AllocationPercent','Rank']]);
  if (employees.length) {
    const byDept = {};
    employees.forEach(e => {
      if (!byDept[e.dept]) byDept[e.dept] = [];
      byDept[e.dept].push(e);
    });
    const out = [];
    Object.keys(byDept).forEach(d => {
      const list = byDept[d];
      list.sort((a,b)=>{
        const ra = existingRank[a.name];
        const rb = existingRank[b.name];
        if (ra != null && rb != null) return ra - rb;
        return 0;
      });
      list.forEach((e,i)=>{
        const alloc = existingAlloc[e.name] || 0;
        const rank  = existingRank[e.name] != null ? existingRank[e.name] : (i+1);
        out.push([e.name, e.dept, e.rate, e.hours, alloc, rank]);
      });
    });
    empSh.getRange(2,1,out.length,6).setValues(out);
  }
}

// Auto-save department slider
function saveDepartmentAllocation(deptName, pct) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Departments');
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  const vals = sh.getRange(2, 1, lastRow - 1, 3).getValues();
  for (let i=0;i<vals.length;i++) {
    if (vals[i][0] === deptName) {
      sh.getRange(i+2,3).setValue(pct);
      return;
    }
  }
}

// Auto-save employee slider
function saveEmployeeAllocation(empName, allocationPct) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Employees');
  const hdr = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
  const idx = hdr.indexOf('AllocationPercent');
  if (idx < 0) return;
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  const data = sh.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i=0;i<data.length;i++) {
    if (data[i][0] === empName) {
      sh.getRange(i+2, idx+1).setValue(allocationPct);
      return;
    }
  }
}

// Auto-save employee rank
function saveEmployeeRank(empName, rank) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Employees');
  const hdr = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
  const idx = hdr.indexOf('Rank');
  if (idx < 0) return;
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  const data = sh.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i=0;i<data.length;i++) {
    if (data[i][0] === empName) {
      sh.getRange(i+2, idx+1).setValue(rank);
      return;
    }
  }
}

// Batch-save employee ranks then sort by department and rank
// Entry point for UI
function getDashboardData() {
  return [ getDepartments(), getEmployees() ];
}

// Reset all department and employee allocation percentages to zero
function resetAllAllocations() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const ds = ss.getSheetByName('Departments');
  if (ds && ds.getLastRow() > 1) {
    ds.getRange(2, 3, ds.getLastRow() - 1, 1).setValue(0);
  }
  const es = ss.getSheetByName('Employees');
  if (es) {
    const hdr = es.getRange(1, 1, 1, es.getLastColumn()).getValues()[0];
    const idx = hdr.indexOf('AllocationPercent');
    if (idx >= 0 && es.getLastRow() > 1) {
      es.getRange(2, idx + 1, es.getLastRow() - 1, 1).setValue(0);
    }
  }
}
