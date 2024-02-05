const cs = new CSInterface;
const mgtInstances = [];

const displayAllElementsProperties = () =>{

    const dataset = {
        presetPath: cs.getSystemPath(SystemPath.EXTENSION),
    }

    cs.evalScript(`$.mogrts_control.displayAllElementsProperties('${JSON.stringify(dataset)}')`);
}
const processReplacement = () =>{
    cs.evalScript(`$.mogrts_control.processReplacement()`);
}
const attachBodyScript = () =>{
    document.getElementById("findElements").addEventListener("click",displayAllElementsProperties);
    document.getElementById("processReplacement").addEventListener("click",processReplacement);
}
addEventListener("contextmenu",e=>e.preventDefault());
addEventListener("load",attachBodyScript);