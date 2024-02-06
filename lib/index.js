const cs = new CSInterface;
const mgtInstances = [];

const displayAllElementsProperties = () =>{
    cs.evalScript(`$.mogrts_control.displayAllElementsProperties()`);
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