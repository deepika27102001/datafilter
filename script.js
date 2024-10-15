
let allData = [];
let metric;
let operator;
let value;
let unit;
loadCSVData()

const selecteMetric = document.getElementById("metriselect");


selecteMetric.addEventListener('change', function () {
    // Get the selected value from the dropdown
    metric = selecteMetric.value;
    // console.log("metric :", metric)
    loadCSVData()
})

const selectedOperator = document.getElementById("conditionSelect");
selectedOperator.addEventListener('change', function () {
    // Get the selected value from the dropdown
    operator = selectedOperator.value;
    console.log("operator xxx :", operator)
    loadCSVData()
})



const inputValue = document.getElementById("value");

// Add an event listener to detect input changes
inputValue.addEventListener('input', function () {
    // Get the current value from the input field
    value = inputValue.value;

    // Log the value to the console
    console.log("Entered value:", value);
    loadCSVData()
});

const unitValue = document.getElementById("unit");

// Add an event listener to detect input changes
unitValue.addEventListener('change', function () {
    // Get the current value from the input field
    unit = unitValue.value;
    // Log the value to the console
    console.log("Entered value:", unit);
    loadCSVData()
});

function loadCSVData() {
    const file1 = fetch("./data2.csv").then(res => res.text());
    const file2 = fetch("./data3.csv").then(res => res.text());
    const file3 = fetch("./data4.csv").then(res => res.text());


    Promise.all([file1,file2,file3]).then(values => {
        values.forEach(data => {
            let parsedData = data.split(/\r?\n|\r/).map(row => row.split(","));
            allData = allData.concat(parsedData);
        });

        renderTable(allData);
    });
}

function renderTable(data) {
    const table = document.querySelector("table");
    table.innerHTML = "";

    //console.log('metric:', metric);
    let metric_index = -1;
    // const operator = "Greater than";

    //const input_value = 1000;
    // const unit = "Million";
    let mulFactor;
    switch (unit) {
        case "one":
            mulFactor = 1;
            break;
        case "thousand":
            mulFactor = Math.pow(10, 3);
        case "million":
            mulFactor = Math.pow(10, 6);
            break;
        case "billion":
            mulFactor = Math.pow(10, 9);
            break;
    }

    console.log("unit", unit)

    const actual_value = value * mulFactor;
    console.log("actual_value", actual_value)
    data.forEach((row, index) => {
        if (index == 0) {
            row.forEach((cell, index) => {
                // console.log("c",cell)
                //console.log("i",metric)
                if (cell == metric) {
                    console.log("found metric", metric)
                    metric_index = index;
                    return;
                }
            })
        }
        //console.log("metric index :",metric_index)
        //console.log('operator', operator)
        let isValid = isValidContion(row[metric_index], actual_value, operator)
        //console.log("isValid", isValid)
        if (index == 0 || isValid) {
            // console.log(row[metric_index])

            let tr = document.createElement("tr");
            row.forEach((cell, index) => {
                //console.log("cell data :",cell)

                let td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        }
    });
}

function isValidContion(input_val, actual_value, operator) {
    let isValid = false;
    switch (operator) {
        case "Greater than":
            isValid = input_val > actual_value;
            break;
        case "Greater than or equal to":
            isValid = input_val >= actual_value;
            break;

    }
    return isValid;
}

document.getElementById('searchInput').addEventListener('input', function () {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("table tr");

    rows.forEach(row => {
        let cells = Array.from(row.getElementsByTagName('td'));
        let rowText = cells.map(cell => cell.textContent.toLowerCase()).join(" ");
        row.style.display = rowText.includes(filter) ? '' : 'none';
    });
});

