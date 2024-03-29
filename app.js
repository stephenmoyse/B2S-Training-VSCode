console.log("working?");

// Create some constants and variables to use later

const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// logging information about the workbook
function logWorkbookInformation() {
  //get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: ${workbook.name}`);

  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((eLement) => {
    index = eLement.index;
    console.log(`The sheet with index [${index}] is L "${eLement.name}`);
  });

  vizActiveSheet = workbook.activeSheet;
  listSheets = vizActiveSheet.worksheets;
  console.log(`The active sheet is "${vizActiveSheet.name}"`);

  //the sheets in the dashboard
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((eLement) => {
    index = eLement.index;
    worksheetName = eLement.name;
    console.log(`The worksheet with index [${index}] is : "${worksheetName}`);
  });
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// log this informatino once things are actually loaded
viz.addEventListener("firstinteractive", logWorkbookInformation);

// define what our buttons are
const oregonWashingtonButton = document.getElementById("Oregon and Washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

//what the buttons do when clicked
oregonWashingtonButton.addEventListener("click", function oregonWashButton(e) {
  // log what is pressed
  console.log(e.target.value);

  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
});

clearFilterButton.addEventListener("click", function clearState(e) {
  // log what is pressed
  console.log(e.target.value);

  //clear the filters from all sheets
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
});

undoButton.addEventListener("click", function unDo() {
  viz.undoAsync();
});

const filterRangeButton = document.getElementById("filter_range");

filterRangeButton.addEventListener("click", function filterRangeFunction() {
  const minValue = parseFloat(document.getElementById("minValue").value);
  const maxValue = parseFloat(document.getElementById("maxValue").value);
  console.log(minValue, maxValue);
  saleMap.applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue });
});
