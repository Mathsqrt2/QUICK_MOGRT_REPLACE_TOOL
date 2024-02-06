const cs = new CSInterface;
const mgtInstances = [];
const replaceParams = {};

const displayAllElementsProperties = () =>{
    cs.evalScript(`$.mogrts_control.displayAllElementsProperties()`,function(res){
        const values = JSON.parse(res);
        document.getElementById("confirm-section").classList.remove("hidden");
        for(let object of values){
            newElement = new Property(object["name"],object["instances"],object["properties"]);
            mgtInstances.push(newElement);
            newElement.drawPropertyHeader(document.getElementById("replacement-section"));
        }
    });
}

const processReplacement = () =>{
    cs.evalScript(`$.mogrts_control.processReplacement('${replaceParams}')`);
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