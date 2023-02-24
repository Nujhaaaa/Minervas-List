// https://danfo.jsdata.org/api-reference/input-output/danfo.read_csv
divElement = document.getElementById('raw_output');

function containsAny(str, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (str.includes(arr[i]))
      return true;
  }
  return false;
}

function displayRawData() {
  dfd.readCSV("https://docs.google.com/spreadsheets/d/e/2PACX-1vRc0nUwCWBF0kxpe7LsyhSMuwBEu14XI11iFuL-gwl37ncqkO27P7fIgifShriHXQASbX-gyxty84ac/pub?output=csv")
            .then(df => {
              // console.log(df)
              names = []
              category = []
              df_len = df.$dataIncolumnFormat[4].length
              checkAgainst = ["a", "e"];
              for (let i = 0; i < df_len; i++) {
                word = df.$data[i][4];
                if (word != null) {
                  if (containsAny(word, checkAgainst)) {
                    names.push(df.$data[i][0]);
                    category.push(df.$data[i][4]);
                  }
                }
              }

              curratedDF = new dfd.DataFrame({"Name": names, "Category": category});
              curratedDF.print();
              // console.log(containVals)
              // dfd = new dfd.Series(obj_data)
              // dfd.print()
              // console.log(df.$data[0][4])
              // df.loc({columns: ["Name", "Category"]}).print();
              // series_category = df["Category"];
              // junk = series_category.loc([0])
              // console.log(junk);
              // // console.log(typeof junk)
              // test = junk.$data
              // console.log(test)
              // if (Object.values(test).indexOf("s") > -1) {
              //   console.log(true);
              // }
              const layout = {
                
              };
              const config = {
                columns: ['Name', 'Amount', 'Link'],
                tableCellStyle: { align: "left" },
              };
              
              df.plot("plot_div").table({ 
                layout: layout,
                config: config 
              });
              // divElement.innerHTML = "<p>" + df + "</p>";
            }).catch(err => {
                console.log(err);
            });
}



