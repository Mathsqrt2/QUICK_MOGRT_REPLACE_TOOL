class Property{
    constructor(name = null,instances = [],properties = []){
        this.name = name;
        this.properties = properties;
        this.instances = instances;
    }
    getNewInstance = (newInstance) =>{
        if(typeof(newInstance) == "object"){
            instances.push(newInstance);
        }
        
    } 
    recognizePropertyType = () => {
        this.properties.forEach(e=>{
        })
    }

    drawPropertyHeader = (origin) =>{
        const mainBox = this.nItem(origin,"div","replace_property_field");
        const header = this.nItem(mainBox,"div","replace_header");
                       this.nItem(header,['p',this.name]);
        const propertiesField = this.nItem(mainBox,"div",["propertiesField","hidden"]);
    
    }
    expandPropertyFunctions = () =>{

    }
    hidePropertyFunctions = () => {

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