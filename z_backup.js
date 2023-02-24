// hot trash for tableau
// For homepage Tableau
var divElement = document.getElementById('viz1647913098461');
var vizElement = divElement.getElementsByTagName('object')[0];
vizElement.style.width='100%';
vizElement.style.height=(divElement.offsetWidth*0.5)+'px';
// vizElement.style.height=(divElement.offsetWidth*0.75)+'px';
var scriptElement = document.createElement('script');
scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
vizElement.parentNode.insertBefore(scriptElement, vizElement);

var viz, sheet, table;

function getUnderlyingData() {
  // url = "https://public.tableau.com/app/profile/stacey5015/viz/MinervasListFilteration";
  url = "https://public.tableau.com/app/profile/stacey5015/viz/MinervasListFilteration/Sheet1?publish=yes"
  options = {
    hideTabs: true,
    hideToolbar: true,
    onFirstInteractive: function () {
      sheet = viz.getWorkbook().getActiveSheet();
      console.log(sheet);
      options = {
        maxRows: 0,
        ignoreAliases: false,
        ignoreSelection: true,
        includeAllColumns: false,
      };
      sheet.getUnderlyingDataAsync(options).then((t) => {
        table = t;
        var tgt = document.getElementbyId("dataTarget");
        console.log("got here");
        tgt.innerHTML = "<h4>Underlying Data:</h4><p>" + JSON.stringify(table.getData()) + "</p>";
      });
    }
  }
  viz = new tableau.Viz(divElement, url, options);
}
      

  

// function initializeDisplays() {
//   getUnderlyingData();
//   displayRawData();
// }

// function displayRawData() {
//   sheet = viz.getWorkbook().getActiveSheet();
//   options = {
//     maxRows: 0,
//     ignoreAliases: false,
//     ignoreSelection: true,
//     includeAllColumns: false,
//   };

//   sheet.getUnderlyingDataAsync(options).then((t) => {
//     table = t;
//     var tgt = document.getElementbyId("dataTarget");
//     tgt.innerHTML = "<h4>Underlying Data:</h4><p>" + JSON.stringify(table.getData()) + "</p>";
//   });
// }

  // sheet = viz.getWorkbook().getActiveSheet().getWorksheets().get("Storm Map Sheet");
		 // If the active sheet is not a dashboard, then you can just enter:
		 // viz.getWorkbook().getActiveSheet();
     //  options = {
     //    maxRows: 10, // Max rows to return. Use 0 to return all rows
     //    ignoreAliases: false,
     //    ignoreSelection: true,
     //    includeAllColumns: false
     //  };

     //  sheet.getUnderlyingDataAsync(options).then(function(t){
     //    table = t;
			  // var tgt = document.getElementById("dataTarget");
			  // tgt.innerHTML = "<h4>Underlying Data:</h4><p>" + JSON.stringify(table.getData()) + "</p>";
     //    console.log(table);
     //  });
  // }