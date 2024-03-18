#include extendScript.jsx

var currentOS;
var pluginPath = "";
var config = {};

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