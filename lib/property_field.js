class Property {
    constructor(name = null, instances = [], properties = [], typeIndex = null) {
        this.name = name;
        this.properties = properties;
        this.instances = instances;
        this.typeIndex = typeIndex;
        this.propertiesField = null;
    }
    drawPropertyValue = (origin, property) => {
        if (typeof (property.value) == "string") {
            const stringBox = this.nItem(origin, "div", "mogrtValue");
            const stringField = this.nItem(stringBox, ["input", "text", property.value], "stringHeader");

            return stringBox;

        } else if (typeof (property.value) == "boolean") {
            const boolBox = this.nItem(origin, "div", ["mogrtValue", "boolBox"]);
            const boolabel = this.nItem(boolBox, ["p", `${property.value}`], "boolHeader");
            const bool = this.nItem(boolBox, ["input", "checkbox"], "valueSwitch");
            bool.checked = property.value;
            bool.addEventListener("click", (e) => boolabel.innerHTML = e.target.checked);
            bool.addEventListener("change", (e) => this.processChanges(property, e.target.checked));

            return boolBox;

        } else if (typeof (property.value) == "object") {
            const objBox = this.nItem(origin, "div", "mogrtValue");

            if (Array.isArray(property.value) && property.value.length == 2) {
                const arrayField = this.nItem(origin, "div", "arrayBox");
                const firstFieldLabel = this.nItem(arrayField, ["p", "x:"], "arrayLabel");
                const firstField = this.nItem(arrayField, ["input", "number", Number(property.value[0]).toFixed(1)], "arrayValue");
                const secondFieldLabel = this.nItem(arrayField, ["p", "y:"], "arrayLabel");
                const secondField = this.nItem(arrayField, ["input", "number", Number(property.value[1]).toFixed(1)], "arrayValue");

                const fields = [firstField, secondField];
                const processChangesBind = this.processChanges;
                fields.forEach(element => {
                    element.addEventListener("change", () => {
                        cs.evalScript(`$.mogrts_control.checkClipDimensions('$${1}')`, function (res) {
                            let ratio;
                            if (!res) {
                                ratio = [1, 1];
                            } else {
                                ratio = JSON.parse(res);
                            }

                            const x = Number(firstField.value / ratio[0]).toFixed(5);
                            const y = Number(secondField.value / ratio[1]).toFixed(5);
                            const outArray = `[${x},${y}]`;

                            processChangesBind(property, outArray);
                        });
                    });
                })

                return objBox;
            }

            return objBox;

        } else if (typeof (property.value == "number")) {
            const numberBox = this.nItem(origin, "div", "mogrtValue");
            const numberHeader = this.nItem(numberBox, ["p", property.value], "numberBoxHeader");
            const sliderBox = this.nItem(numberBox, "div", "numberBox");
            this.nItem(sliderBox, ["p", `max`], "numberRangelabel");
            const range = this.nItem(sliderBox, ["input", "number", `${property.value}`], "rangeSelector");
            range.min = 0;
            range.max = 10;
            range.step = "any";
            this.nItem(sliderBox, ["p", `min`], "numberRangelabel");
            range.addEventListener("input", (e) => {
                let round = e.target.value > 10 && e.target.value == 0 ? 0 : 1;
                numberHeader.innerHTML = Number(e.target.value).toFixed(round)
            });
            range.addEventListener("change", (e) => this.processChanges(property, e.target.value));
            return numberBox;
        }
    }
    drawPropertyLabel = (origin, property) => {
        return this.nItem(origin, ["p", `${property.name}`], "mogrtProperty");
    }

    drawPropertyHeader = (origin) => {
        const mainBox = this.nItem(origin, "div", "replacementPropertyField");
        const header = this.nItem(mainBox, "div", "propertyHeader");
        const showProperties = this.nItem(header, ["input", "button", "show"]);
        showProperties.classList.add("showPropertiesButton");
        this.nItem(header, ["p", `${this.name} (${this.instances.length})`], "propertyHeaderDescription");
        showProperties.addEventListener("click", this.togglePropertyFunctionVisibility);
        showProperties.addEventListener("click", e => {
            e.target.value == "show" ? e.target.value = "hide" : e.target.value = "show";
        });
        this.propertiesField = this.nItem(mainBox, "div", ["propertiesField", "hidden"]);
        this.properties.forEach(property => {
            if (property.value) {
                const box = this.nItem(this.propertiesField, "div", "propertyBox");
                this.drawPropertyLabel(box, property);
                this.drawPropertyValue(box, property);
                this.nItem(box, "div", "propertySeparator");
            }
        })
    }
    togglePropertyFunctionVisibility = () => {
        this.propertiesField.classList.toggle("hidden");
    }
    processChanges = (property, newValue) => {
        cs.evalScript(`$.mogrts_control.processReplacement('${this.typeIndex}','${property.index}','${property.c_id}','${newValue}')`);
    }

    nItem = (origin, element, classes, id) => {
        if (origin && element) {
            let newBody;
            if (typeof (element) == 'object') {
                newBody = document.createElement(element[0]);
                if (element[0] == 'input') {
                    newBody.type = element[1];
                    if (element[2]) {
                        newBody.value = element[2];
                    }
                } else if (element[0] == 'img') {
                    newBody.setAttribute('src', element[1]);
                    newBody.setAttribute('alt', element[2]);
                } else {
                    newBody.innerHTML = element[1];
                }
            } else {
                newBody = document.createElement(element);
            } if (classes) {
                if (typeof (classes) == 'object') {
                    classes.forEach(newClass => {
                        newBody.classList.add(newClass);
                    });
                } else {
                    newBody.classList.add(classes);
                }
            }
            if (id) {
                newBody.setAttribute('id', id);
            }
            origin.append(newBody);
            return newBody;
        }
    }
};