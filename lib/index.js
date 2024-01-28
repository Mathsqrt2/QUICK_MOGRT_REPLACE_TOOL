const cs = new CSInterface;

const checkMode = () => {
    cs.evalScript(`$.mogrts_control.checkMode()`);
    return 1;
}
const processReplacement = () =>{
    cs.evalScript(`$.mogrts_control.processReplacement()`);
}
const displayAllElementsProperties = () =>{
    cs.evalScript(`$.mogrts_control.displayAllElementsProperties()`);
}
const displaySelectedElementsProperties = () => {
    cs.evalScript(`$.mogrts_control.displaySelectedItemsProperties()`);
}
const checkSelectedItems = () => {
    cs.evalScript(`$.mogrts_control.processReplacement()`);
}
const attachBodyScript = () =>{
    if(!checkMode()){
        setInterval(displayAllElementsProperties,3000);
    } else {
        setInterval(displaySelectedElementsProperties,3000);
    }
}
addEventListener("contextmenu",e=>e.preventDefault());
addEventListener("load",attachBodyScript);