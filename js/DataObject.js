export default class DataObject {
    static #counter = 0;
    id;
    content;
    additionalInfo;
    fields = [];

    constructor(content, additionalInfo, fields) {
        this.id = DataObject.#counter++;
        this.content = content;
        this.additionalInfo = additionalInfo;
        this.fields = fields;
    }

    toString() {
        return `Id = ${this.id} content = ${this.content} additionalInfo = ${this.additionalInfo} fields = ${this.fields}`;
    }

    asHtml(myDiv, document, parent) {
        console.log("Inside asHTML");
        const element = document.createElement("div");
        element.id = this.id;
        element.textContent = this.content;
        element.draggable = true;
        element.addEventListener("dragstart", this.dragstartHandler);
        element.addEventListener("dragend", parent.dragEndHandler);
        element.addEventListener("ondragend", parent.dragEndHandler);
        element.class = "sourceElement";
        myDiv.appendChild(element);
    }

    dragstartHandler = (ev) => {
        console.log(`In dragstart of Data Object`);
        ev.dataTransfer.dropEffect = "copy";
        ev.dataTransfer.setData("text/plain", ev.target.id);
        console.log(`Drag started ${ev.target.id}`);
    
      
    
        // Set the JSON string in the dataTransfer object
        ev.dataTransfer.setData("application/json", JSON.stringify(this));
      }

      
    


}