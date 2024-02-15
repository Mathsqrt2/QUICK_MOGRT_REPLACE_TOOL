const cs = new CSInterface;
const mgtInstances = [];

const displayAllElementsProperties = () => {
    cs.evalScript(`$.mogrts_control.displayAllElementsProperties()`, drawHeaders);
}
const drawHeaders = (res) => {
    const replacementSection = document.getElementById("replacementSection");

    if (document.getElementById("propertiesRoot")) {
        document.getElementById("propertiesRoot").remove();
    }

    const propertiesRoot = document.createElement("div");
    propertiesRoot.setAttribute("id", "propertiesRoot");
    replacementSection.append(propertiesRoot);

    const values = JSON.parse(res);

    if (values) {
        propertiesRoot.classList.remove("errorBox");
        for (let object of values) {
            newElement = new Property(object.name, object.instances, object.properties, object.index);
            mgtInstances.push(newElement);
            newElement.drawPropertyHeader(propertiesRoot);
        }

    } else {
        propertiesRoot.classList.add("errorBox");
        const errorAlertBox = document.createElement("div");
        const errorAlert = document.createElement("p");
        errorAlert.innerText = "No .mogrt instances found";
        errorAlert.classList.add("errorMessage");
        errorAlertBox.append(errorAlert);
        propertiesRoot.append(errorAlertBox);
    }
}
const checkSystemInfo = () => {
    const currentOS = {
        os: cs.getOSInformation().toLowerCase(),
    }
    currentOS.index = currentOS.os.indexOf('win') >= 0 ? 0 : 1;
    cs.evalScript(`setOSValue('${JSON.stringify(currentOS)}')`);
}
const supportRefference = () => {
    cs.openURLInDefaultBrowser("https://mbugajski.pl/plugins/support");
}
const isItFirstUse = () => {
    cs.evalScript(`isItFirstUseJSX('${cs.getSystemPath(SystemPath.EXTENSION)}')`, function (res) {
        const data = JSON.parse(res);
        if (data.isItFirstUse) {
            cs.openURLInDefaultBrowser("https://mbugajski.pl/plugins/quick-mogrt-replace-use-guide");
        }
    })
}
const attachBodyScript = () => {

    const dataset = {
        presetPath: cs.getSystemPath(SystemPath.EXTENSION),
    }
    cs.evalScript(`loadConfig('${JSON.stringify(dataset)}')`);

    document.getElementById("findElements").addEventListener("click", displayAllElementsProperties);
    document.getElementById("supportButton").addEventListener("click", supportRefference);
}

addEventListener("contextmenu", e => e.preventDefault());
addEventListener("load", checkSystemInfo);
addEventListener("load", isItFirstUse);
addEventListener("load", attachBodyScript);
addEventListener("load", displayAllElementsProperties);