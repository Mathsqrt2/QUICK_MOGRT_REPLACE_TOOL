class Property{
    constructor(name = null,instances = [],properties = [],typeIndex = null){
        this.name = name;
        this.properties = properties;
        this.instances = instances;
        this.typeIndex = typeIndex;
        this.propertiesField = null;
    }
    drawPropertyValue = (origin,property) =>{
        if(typeof(property.value) == "string"){
            return this.nItem(origin,["input","text",property.value],"mogrtValue");
        } else if(typeof(property.value) == "boolean"){
            return this.nItem(origin,["p","bool"],"mogrtValue");
        } else if(typeof(property.value) == "object"){
            return this.nItem(origin,["p","obiekt"],"mogrtValue");
        } else if(typeof(property.value == "number")){
            const numberBox = this.nItem(origin,"div","mogrtValue");
            const numberHeader = this.nItem(numberBox,["p",property.value],"numberBoxHeader");
            const sliderBox = this.nItem(numberBox,"div","numberBox");
                this.nItem(sliderBox,["p",`max`],"numberRangelabel");
            const range = this.nItem(sliderBox,["input","range",`${property.value}`],"rangeSelector");
                range.min = 0;
                range.max = 10;
                range.step = "any";
                this.nItem(sliderBox,["p",`min`],"numberRangelabel");
                range.addEventListener("input",e=>numberHeader.innerHTML = Number(e.target.value).toFixed(1));
                range.addEventListener("change",(e)=>this.processChanges(property,e.target.value));
            return numberBox;
        }
    } 
    drawPropertyLabel = (origin,property) => {
        return this.nItem(origin,["p",`${property.name}`],"mogrtProperty");
    }

    drawPropertyHeader = (origin) =>{
        const mainBox = this.nItem(origin,"div","replacementPropertyField");
        const header = this.nItem(mainBox,"div","propertyHeader");
        const showProperties = this.nItem(header,["input","button","unwrap"]);
              showProperties.classList.add("showPropertiesButton");
                        this.nItem(header,["p",`${this.name} (${this.instances.length})`],"propertyHeaderDescription");
        showProperties.addEventListener("click",this.togglePropertyFunctionVisibility);
        this.propertiesField = this.nItem(mainBox,"div",["propertiesField","hidden"]);
            this.properties.forEach(property=>{
                if(property.value){
                const box = this.nItem(this.propertiesField,"div","propertyBox");
                            this.drawPropertyLabel(box,property);
                            this.drawPropertyValue(box,property);
                            this.nItem(box,"div","propertySeparator");
                }
            })
    }
    togglePropertyFunctionVisibility = () =>{
        this.propertiesField.classList.toggle("hidden");
    }
    processChanges = (property,newValue) => {
        cs.evalScript(`$.mogrts_control.processReplacement('${this.typeIndex}','${property.index}','${property.c_id}','${newValue}')`);
    }

    nItem = (origin,element,classes,id)=>{
        if(origin && element){
            let newBody;
            if(typeof(element) == 'object'){
                newBody = document.createElement(element[0]);
                if(element[0] == 'input'){
                    newBody.type = element[1];
                    if(element[2]){
                        newBody.value = element[2];
                    }
                } else if (element[0] == 'img'){
                    newBody.setAttribute('src',element[1]);
                    newBody.setAttribute('alt',element[2]);
                } else{
                    newBody.innerHTML = element[1];
                }
            } else {
                newBody = document.createElement(element);
            } if(classes){
                if(typeof(classes)  == 'object'){
                    classes.forEach(newClass=>{
                        newBody.classList.add(newClass);
                    });
                } else {
                    newBody.classList.add(classes);
                }
            }            
            if(id){
                newBody.setAttribute('id',id);
            }   
        origin.append(newBody);
        return newBody;
        }
    }
};