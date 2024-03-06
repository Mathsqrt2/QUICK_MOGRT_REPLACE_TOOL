app.enableQE();
var proj = app.project;
var seq = proj.activeSequence;
var seqqe = qe.project.getActiveSequence();
var currentOS;
var pluginPath = "";
var config = {};
var allMGT;

function loadConfig(userConfig) {
    config = JSON.parse(userConfig);
    pluginPath = $.mogrts_control.fixPath(config.presetPath);
}

function isItFirstUseJSX(path) {
    var newResponse = {
        isItFirstUse: true,
        actionTime: null,
    };

    var logPath = $.mogrts_control.fixPath(path) + $.mogrts_control.fixPath("\\logs\\firstLaunchLog.json");
    var firstLaunchLog = new File(logPath);

    if (firstLaunchLog.exists) {
        newResponse.isItFirstUse = false;
    } else {
        var currentTime = new Date();
        newResponse.actionTime = currentTime.getTime();
        firstLaunchLog.open("w");
        firstLaunchLog.write(JSON.stringify(newResponse));
        firstLaunchLog.close();
    }

    var output = JSON.stringify(newResponse);
    return output;
}

function setOSValue(csinfo) {
    var obj = JSON.parse(csinfo);
    currentOS = obj.index;
}

$.mogrts_control = {
    displayAllElementsProperties: function() {
        var allMgrtElements = [];

        if (seqqe.numVideoTracks) {
            var mogrtCounter = 0;
            for (var i = 0; i < seqqe.numVideoTracks; i++) {
                var currentTrack = seqqe.getVideoTrackAt(i);
                if (currentTrack.numItems) {
                    for (var j = 0; j < currentTrack.numItems; j++) {
                        var currentClip = currentTrack.getItemAt(j);
                        if (this.isMGT(currentClip)) {
                            if (!this.namePresenceCheck(allMgrtElements, currentClip.name)) {
                                var outputObject = {
                                    name: currentClip.name,
                                    properties: [],
                                    instances: [],
                                    index: mogrtCounter++,
                                }

                                outputObject.instances.push(currentClip);
                                for (var l = 0; l < currentClip.numComponents; l++) {
                                    var currentComponent = currentClip.getComponentAt(l);

                                    if (currentComponent.name == "Graphic Parameters") {
                                        for (var m = 0; m < currentComponent.getParamList().length; m++) {
                                            var currentParam = currentComponent.getParamList()[m];
                                            if (currentComponent.getParamValue(currentParam)) {
                                                var propertyObject = {
                                                    index: m,
                                                    c_id: l,
                                                    name: currentParam,
                                                    value: currentComponent.getParamValue(currentParam),
                                                };
                                                outputObject.properties.push(propertyObject);
                                            }

                                        }
                                    }
                                }
                                allMgrtElements.push(outputObject);
                            } else {
                                for (var k = 0; k < allMgrtElements.length; k++) {
                                    if (allMgrtElements[k].name == currentClip.name) {
                                        allMgrtElements[k].instances.push(currentClip);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (mogrtCounter < 1) {
                return 0;
            }
        }
        this.saveLogs(config, "displayAllElements");
        allMGT = allMgrtElements;
        
        return JSON.stringify(allMgrtElements);
    },
    isMGT: function(QEitem) {
        var len = QEitem.numComponents;
        if (!len) {
            return false;
        } else {
            for (var i = 0; i < len; i++) {
                if (QEitem.getComponentAt(i).name == "Graphic Parameters") {
                    return true;
                }
            }
            return false;
        }
    },
    processReplacement: function(index, pid, cid, newValue) {
        var newVal = JSON.parse(newValue);
        for (var i = 0; i < allMGT[index].instances.length; i++) {
            allMGT[index].instances[i].components[cid].properties[pid].setValue(newVal, true);
        }
        var logRaport = {
            action: "processReplacement",
            propertyId: pid,
            componentId: cid,
            mgtIndex: index,
            newValue: newValue,
        }
        this.saveLogs(config, logRaport);
    },
    saveLogs: function(data, logReport) {
        var outputFilePath = this.fixPath(pluginPath) + this.fixPath("\\logs\\log.json");
        var file = new File(outputFilePath);

        var actionTime = new Date();
        var outputContent = [];
        var oldLogState;
        var useIndex = 0;

        if (file.exists) {
            file.open("r");
            oldLogState = file.read();
            outputContent = JSON.parse(oldLogState);
            useIndex = outputContent.length;
            file.close();
        }

        var newElement = {
            timestamp: actionTime.getTime(),
            index: useIndex,
            action: logReport
        };
        outputContent.push(newElement);

        file.open('w');
        file.write(JSON.stringify(outputContent) + "\n\n");
        file.close();
    },
    fixPath: function(pathToFix) {
        var newPath = pathToFix;
        if (!currentOS) {
            while (newPath.indexOf("/") > 0) {
                newPath = newPath.replace('/', '\\');
            }
        } else {
            while (newPath.indexOf("\\") > 0) {
                newPath = newPath.replace("\\", "/");
            }
        }
        return newPath;
    },
    namePresenceCheck: function(array, element) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].name == element) {
                return 1;
            }
        }
        return 0;
    },
    checkClipDimensions: function(clipId) {
        // placeholder function;
        var clipDims = [1920, 1080];
        return JSON.stringify(clipDims);
    }
}