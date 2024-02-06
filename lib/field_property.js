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
        const headerContainer = document.createElement("div");
              headerContainer.classList.add("replacementHeader");
        const headerDecription = document.createElement("p");
        headerContainer.append(headerDecription);

        origin.append(headerContainer);
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