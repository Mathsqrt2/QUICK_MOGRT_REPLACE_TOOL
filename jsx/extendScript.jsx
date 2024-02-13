var proj = app.project;
var seq = proj.activeSequence;
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

        if (seq.videoTracks.length) {
            var mogrtCounter = 0;
            for (var i = 0; i < seq.videoTracks.length; i++) {
                var currentTrack = seq.videoTracks[i];
                if (currentTrack.clips.length) {
                    for (var j = 0; j < seq.videoTracks[i].clips.length; j++) {
                        var currentClip = currentTrack.clips[j];
                        if (currentClip.isMGT()) {
                            if (!this.namePresenceCheck(allMgrtElements, currentClip.name)) {
                                var outputObject = {
                                    name: currentClip.name,
                                    properties: [],
                                    instances: [],
                                    index: mogrtCounter++,
                                }
                                outputObject.instances.push(currentClip);
                                for (var l = 0; l < currentClip.components.length; l++) {
                                    var currentComponent = currentClip.components[l];
                                    if (currentComponent.displayName == "Graphic Parameters") {
                                        for (var m = 0; m < currentComponent.properties.length; m++) {
                                            var currentProperty = currentComponent.properties[m];
                                            var propertyObject = {
                                                index: m,
                                                c_id: l,
                                                name: currentProperty.displayName,
                                                value: currentProperty.getValue(),
                                            };
                                            outputObject.properties.push(propertyObject);
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
                        if (mogrtCounter < 1) {
                            return 0;
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
        var outputFilePath = this.fixPath(pluginPath) + "\\logs\\log.json";
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