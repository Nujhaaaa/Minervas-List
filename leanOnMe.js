var cat = [];
var today = new Date().toJSON().split("T")[0];
var currentYear = new Date().getFullYear();
var displayStr = "";


function printStuff(cat2search) {
  catForm = document.getElementsByName("category");
  test = document.getElementById('test');
  
  test.innerHTML = catForm.length;
  ind = 0;
  for (let t = 0; t < catForm.length; t++) {
    if (catForm[t].checked == true) {
      cat2search[ind] = catForm[t].value
      ind = ind+1;
    }
  }
  test.innerHTML = cat2search;
  displayRawData(cat2search);
}

// https://danfo.jsdata.org/api-reference/input-output/danfo.read_csv

function containsAny(str, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (str.includes(arr[i]))
      return true;
  }
  return false;
}

function displayRawData(cat2search) {
  // divElement = document.getElementById('raw_output');
  testElement = document.getElementById("plz-work");
  numOfScho = document.getElementById("numOfScho").value;
  numOfWeeks = document.getElementById("prepTime").value;
  
  dfd.readCSV("https://docs.google.com/spreadsheets/d/e/2PACX-1vRc0nUwCWBF0kxpe7LsyhSMuwBEu14XI11iFuL-gwl37ncqkO27P7fIgifShriHXQASbX-gyxty84ac/pub?output=csv")
  .then(df => {;
    const headerStyle = {
      align: "center",
      fill: { color: ["gray"] },
      font: { family: "Arial", size: 15, color: "white" },
      columnwidth: 200,
    };
    const layout = {
      
    };
    const config = {
      // columns: ,
      tableCellStyle: { align: "left" },
    };
    const cellStyle = {
      align: ["center"],
      line: { color: "black", width: 1 },
      font: { family: "Arial", size: 15},
    };
    
    newDates = df.$dataIncolumnFormat[2];
    newDates = newDates.map(i => i +"/" + currentYear);
    newDates = newDates.map(dateString => new Date(dateString).toJSON().split("T")[0]);

    df.addColumn("Deadlines", newDates, {inplace: true});

    // for (let i = 0; i < newDates.length; i++) {
    //   if ((Date.parse(df.$data[i][9])-Date.parse(today))/(86400000) < 0)
    //     df.$data[i][9] = new Date(df.$dataIncolumnFormat[2][i] + "/" + (currentYear+1)).toJSON().split("T")[0];
    // }
    
    df.sortValues("Deadlines", { ascending: true, inplace: true });
               
    names = [];
    dates = [];
    descriptions = [];
    links = [];
    df_len = df.$dataIncolumnFormat[4].length
    checkAgainst = cat2search;
    for (let i = 0; i < df_len; i++) {
      word = df.$data[i][4];
      if ((Date.parse(df.$data[i][9])-Date.parse(today))/(604800000) > numOfWeeks) {
        if (word != null) {
          if (containsAny(word, checkAgainst)) {
            names.push(df.$data[i][0]);
            descriptions.push(df.$data[i][6]);
            links.push(df.$data[i][7]);
            dates.push(df.$data[i][9]);
          }
        }
      }
    }
    
    // curratedDF = curratedDF.iloc({rows: ["0:10"]});
    curratedDF = new dfd.DataFrame({"Name": names, "Deadlines": dates});
    
    if (numOfScho < curratedDF.$dataIncolumnFormat[0].length) {
      range = "0:"+ numOfScho.toString();
      curratedDF = curratedDF.iloc({rows: [range]});
    }
    testElement.style.visibility = 'visible';
    displayStr = "<h1 id=main_header>Scholarships</h1><br>"
    for (let i = 0; i < curratedDF.$dataIncolumnFormat[0].length; i++) {
      displayStr = displayStr + "<div id = 'group'>" + "<a href = '" + links[i] + "' target = '_blank'>" + "<h1>" + names[i] + "</h1>" + "</a>";
      displayStr = displayStr + "<p>" + descriptions[i] + "</p>";
      displayStr = displayStr + "</div>"
    }
    testElement.innerHTML = testElement.innerHTML + displayStr;
    curratedDF.plot("plot_div").table({ 
      config: {
        tableHeaderStyle: headerStyle,
        tableCellStyle: cellStyle,
        layout: layout,
        config: config,
      }
    });
    // divElement.innerHTML = "<p>" + df + "</p>";
    }).catch(err => {
      console.log(err);
    });
}