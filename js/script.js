import DataObject from "./DataObject.js";

export default class Controller {
    objectsData = [];
    stepsData = [];
    cloneCounter = 0;
    isInsideDropTarget = false;
    dataObjects = [];
   
  constructor() {
    
    

    this.objectsData = [
        {
          id: "drag1",
          content: "User",
          additionalInfo: "Info for draggable 1",
          fields: ["id", "name", "age"],
        },
        {
          id: "drag2",
          content: "Address",
          additionalInfo: "Info for draggable 2",
          fields: ["id", "street", "number", "postcode"],
        },
        {
          id: "drag3",
          content: "Animal",
          additionalInfo: "Info for draggable 3",
          fields: ["id", "name", "nickname", "age"],
        },
      ];
  
      this.stepsData = [
        {
          id: "step1",
          content: "Given these objects:",
        },
        {
          id: "step2",
          content: "When this is received:",
        },
      ];

   

    this.dataObjects = [
      new DataObject("Content1", "Additional info1", ["id", "name", "nickname", "age"]),
      new DataObject("Content2", "Additional info2", ["id", "ka", "okokok", "99"]),
      new DataObject("Content3", "Additional info3", ["id", "ookk", "nickname", "age"]),
    ];
    this.dataObjects.forEach((dao) => console.log(dao));

    window.addEventListener("DOMContentLoaded", () => {
      // Create draggable elements dynamically based on the draggableData array
      const container = document.getElementById("sourceDiv");
      this.objectsData.forEach((data) => {
        const element = document.createElement("div");
        element.id = data.id;
        // element.className = "hexagone";
        element.textContent = data.content;
        element.draggable = true;
        element.addEventListener("dragstart", this.dragstartHandler);
        element.addEventListener("dragend", this.dragEndHandler);
        element.addEventListener("ondragend", this.dragEndHandler);
        element.class = "sourceElement";
        container.appendChild(element);
      });

      const containerSteps = document.getElementById("sourceStepsDiv");
      this.stepsData.forEach((data) => {
        const element = document.createElement("div");
        element.id = data.id;
        //element.className = "hexagone";
        element.textContent = data.content;
        element.draggable = true;
        element.addEventListener("dragstart", this.dragstartHandler);
        element.addEventListener("dragend", this.dragEndHandler);
        element.addEventListener("ondragend", this.dragEndHandler);
        element.class = "sourceElement";
        containerSteps.appendChild(element);
      });

      const testDiv = document.getElementById("testDiv");
      this.dataObjects.forEach((data) => {
        data.asHtml(testDiv, document, this);
      });
    });
  }

  dragstartHandler = (ev) => {
    console.log(`In dragstart`);
    ev.dataTransfer.dropEffect = "copy";
    ev.dataTransfer.setData("text/plain", ev.target.id);
    console.log(`Drag started ${ev.target.id}`);

    let elementData = this.objectsData.find((d) => d.id === ev.target.id);
    if (!elementData) {
      elementData = this.stepsData.find((d) => d.id === ev.target.id);
    }

    // Set the JSON string in the dataTransfer object
    ev.dataTransfer.setData("application/json", JSON.stringify(elementData));
  }

  dragOverHandler= (ev) => {
    ev.preventDefault();
    console.log(`Dragging over ${ev.target.id}`);

    ev.dataTransfer.dropEffect = "copy";
  }

  dropHandler= (ev) => {
    console.log(`Inside drop handler`);
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    const original = document.getElementById(data);

    let jsonData = ev.dataTransfer.getData("application/json");
    if (jsonData && jsonData !== "undefined") {
      const elementData = JSON.parse(jsonData);
      console.log("Dropped data:", elementData);

      const cloned = original.cloneNode(true);
      cloned.id = `${data}-copy-${this.cloneCounter++}`;

      console.log("Inner html before: " + cloned.innerHTML);
      if (elementData.fields) {
        let columns = elementData.fields.map((el) => `<td>${el}</td>`);
        console.log("Columns: " + columns.join(""));
        cloned.innerHTML = `<table class="tableClass"><tr>${columns.join(
          ""
        )}</tr></table>`;
        cloned.class = "tableClass";
      }
      console.log(cloned.innerHTML);
      cloned.addEventListener("dragstart", this.dragstartHandler); // Attach dragstart event to the clone
      cloned.addEventListener("dragend", this.dragEndHandler);
      ev.currentTarget.appendChild(cloned);
      console.log(`Dropped ${cloned.id}`);
    } else {
      console.log(`Couldn't find data in dropHandler`);
    }
  }

  dragEnterHandler= (ev) => {
    console.log('Inside dragEnterHandler');
    if (ev.target.id === "dropTarget") {
      this.isInsideDropTarget = true;
      console.log("Drag enter");
    }
  }

  dragLeaveHandler= (ev) => {
    console.log('Inside dragLeaveHandler');
    if (ev.target.id === "dropTarget") {
        this.isInsideDropTarget = false;
      console.log("Drag left drop target");
    }
  }

  dragEndHandler= (ev) => {
    console.log(`Drag ended ${ev.target.id}`);

    ev.preventDefault();
    const data = ev.target.id; //ev.dataTransfer.getData("text/plain");
    const original = document.getElementById(data);

    if (!this.isInsideDropTarget) {
      let fromDt = ev.dataTransfer.getData("text/plain");
      console.log(`From DT: ${fromDt}`);
      console.log(
        `Not inside drop target need to remove ${ev.currentTarget.id}`
      );

      if (original.parentNode.id !== "sourceDiv") {
        original.parentNode.removeChild(original);
      }
    }
  }

  exportData = (ev) => {
    console.log("Data export requested "+ev);
    
  }
}
