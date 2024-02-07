class Property{
    constructor(name = null,instances = [],properties = []){
        this.name = name;
        this.properties = properties;
        this.instances = instances;
        this.propertiesField = null;
    }
    drawPropertyValue = (origin,property) =>{
        // if(typeof(property.value) == "object"){
        
        // }

        return this.nItem(origin,["p",property.value],"mogrtValue");
    } 
    drawPropertyLabel = (origin,property) => {

        return this.nItem(origin,["p",`${property.name}`],"mogrtProperty");
    }

    drawPropertyHeader = (origin) =>{
        const mainBox = this.nItem(origin,"div","replacement_property_field");
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