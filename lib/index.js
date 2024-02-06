const cs = new CSInterface;
const mgtInstances = [];

const displayAllElementsProperties = () =>{
    cs.evalScript(`$.mogrts_control.displayAllElementsProperties()`,function(res){
        const values = JSON.parse(res);
        
        for(let object of values){
            propertyType = new Property(object["name"],object["instances"],object["properties"]);

        }
    });
}

const processReplacement = () =>{
    cs.evalScript(`$.mogrts_control.processReplacement()`);
}

const attachBodyScript = () =>{
    
    const dataset = {
        presetPath: cs.getSystemPath(SystemPath.EXTENSION),
    }
    cs.evalScript(`loadConfig('${JSON.stringify(dataset)}')`);

    document.getElementById("findElements").addEventListener("click",displayAllElementsProperties);
    document.getElementById("processReplacement").addEventListener("click",processReplacement);
}

addEventListener("contextmenu",e=>e.preventDefault());
addEventListener("load",attachBodyScript);