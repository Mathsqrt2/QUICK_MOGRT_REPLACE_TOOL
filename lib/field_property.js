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

    drawPropertyHeader = () =>{

    }
    expandPropertyFunctions = () =>{

    }
    hidePropertyFunctions = () => {

    }
};