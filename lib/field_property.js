class Property{
    constructor(title = null,instances = [],properties = []){
        this.title = title;
        this.instances = instances;
        this.properties = properties;
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

    drawPropertyHeader = () =>{

    }
    expandPropertyFunctions = () =>{

    }
    hidePropertyFunctions = () => {

    }
};