const cs = new CSInterface;

const displayAllElementsProperties = () =>{
    cs.evalScript(`$.mogrts_control.displayAllElementsProperties()`);
}
const processReplacement = () =>{
    cs.evalScript(`$.mogrts_control.processReplacement()`);
}

const attachBodyScript = () =>{
    document.getElementById("findElements").addEventListener("click",displayAllElementsProperties);
}

addEventListener("contextmenu",e=>e.preventDefault());
addEventListener("load",attachBodyScript);