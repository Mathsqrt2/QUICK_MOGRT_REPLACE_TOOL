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
    const replacementSection = document.getElementById("replacementSection");

        if(document.getElementById("propertiesRoot")){
            document.getElementById("propertiesRoot").remove();
        }
        
    const propertiesRoot = document.createElement("div");
          propertiesRoot.setAttribute("id","propertiesRoot");
          replacementSection.append(propertiesRoot);

        const values = JSON.parse(res);
        
        if(values){
            propertiesRoot.classList.remove("errorBox");
            for(let object of values){
                newElement = new Property(object["name"],object["instances"],object["properties"],object["index"]);
                mgtInstances.push(newElement);
                newElement.drawPropertyHeader(propertiesRoot);
            }

        } else{
            propertiesRoot.classList.add("errorBox");
            const errorAlertBox = document.createElement("div");
            const errorAlert = document.createElement("p");
                  errorAlert.innerText = "No .mogrt instances found";
                  errorAlert.classList.add("errorMessage");
            errorAlertBox.append(errorAlert);
            propertiesRoot.append(errorAlertBox);
        }
}

const attachBodyScript = () =>{
    
    const dataset = {
        presetPath: cs.getSystemPath(SystemPath.EXTENSION),
    }
    cs.evalScript(`loadConfig('${JSON.stringify(dataset)}')`);

    displayAllElementsProperties();

    document.getElementById("findElements").addEventListener("click",displayAllElementsProperties);
    document.getElementById("processReplacement").addEventListener("click",processReplacement);
}

addEventListener("contextmenu",e=>e.preventDefault());
addEventListener("load",attachBodyScript);