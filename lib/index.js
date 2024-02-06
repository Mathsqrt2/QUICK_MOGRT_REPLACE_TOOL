const cs = new CSInterface;
const mgtInstances = [];
const replaceParams = {};

const displayAllElementsProperties = () =>{
    cs.evalScript(`$.mogrts_control.displayAllElementsProperties()`,drawHeaders);
}

const processReplacement = () =>{
    cs.evalScript(`$.mogrts_control.processReplacement('${replaceParams}')`);
}

const drawHeaders = (res) =>{
    const replacementSection = document.getElementById("replacement-section");

        if(document.getElementById("properties-root")){
            document.getElementById("properties-root").remove();
        }
        
    const propertiesRoot = document.createElement("div");
          propertiesRoot.setAttribute("id","properties-root");
          replacementSection.append(propertiesRoot);

        document.getElementById("confirm-section").classList.remove("hidden");
        const values = JSON.parse(res);
        for(let object of values){
            newElement = new Property(object["name"],object["instances"],object["properties"]);
            mgtInstances.push(newElement);
            newElement.drawPropertyHeader(propertiesRoot);
        }
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