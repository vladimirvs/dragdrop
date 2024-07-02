export default class DataObject {
  static #counter = 0;
  id;
  content;
  additionalInfo;
  fields = [];
  data = [[]];
  gridApi;

  constructor(content, additionalInfo, fields, data) {
    this.id = DataObject.#counter++;
    this.content = content;
    this.additionalInfo = additionalInfo;
    this.fields = fields;
    this.data = data;
  }

  toString() {
    return `Id = ${this.id} content = ${this.content} additionalInfo = ${this.additionalInfo} fields = ${this.fields}`;
  }

  asHtml(myDiv, document, parent) {
    console.log("Inside asHTML");
    const element = document.createElement("div");
    element.id = this.id;
    element.textContent = this.content;
    element.class = "dataObjectDiv";
    element.className = "dataObjectDiv";
    element.draggable = true;
    element.addEventListener("dragstart", this.dragstartHandler);
    element.addEventListener("dragend", parent.dragEndHandler);
    element.addEventListener("ondragend", parent.dragEndHandler);
    element.class = "sourceElement";
    myDiv.appendChild(element);
  }

  asTargetHtml() {
    let resultHtml;
    if (this.fields) {
      let columns = this.fields.map((el) => `<td>${el}</td>`);
      //console.log("Columns: " + columns.join(""));
      resultHtml = `<table class="tableClass"><tr>${columns.join(
        ""
      )}</tr></table>`;

      


      // Grid Options: Contains all of the data grid configurations
const gridOptions = {
    // Row Data: The data to be displayed.
    // rowData: [
    //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
    //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    // ],
    rowData: this.data,
    // Column Definitions: Defines the columns to be displayed.
    // columnDefs: [
    //   { field: "make" },
    //   { field: "model" },
    //   { field: "price" },
    //   { field: "electric" }
    // ]
    columnDefs: this.fields.map(field => ({ field: field })),
   };

   console.log(gridOptions);
  
  // Your Javascript code to create the data grid
  const myGridElement = document.querySelector('#myGrid');
  this.gridApi = agGrid.createGrid(myGridElement, gridOptions);
  //console.log("THIS GRID API = "+this.gridApi);
  
  



    }
    return resultHtml;
  }

   getParams() {
    return {
      prependContent: '|',
      appendContent: '|',
      suppressQuotes: true,
      columnSeparator: '|',
    };
  }

  
 onBtnUpdate() {
    let csv = this.gridApi.getDataAsCsv(this.getParams());
    console.log("CSV IS "+csv);
    document.querySelector("#csvResult").innerText = csv;
  }

  asCucumber() {
    let resultText;
    if (this.fields) {
      
      resultText = `|${this.fields.join("|")}|`;
    }
    return resultText;
  }

  dragstartHandler = (ev) => {
    console.log(`In dragstart of Data Object`);
    ev.dataTransfer.dropEffect = "copy";
    ev.dataTransfer.setData("text/plain", ev.target.id);
    console.log(`Drag started ${ev.target.id}`);

    // Set the JSON string in the dataTransfer object
    ev.dataTransfer.setData("application/json", JSON.stringify(this));
  };
}
