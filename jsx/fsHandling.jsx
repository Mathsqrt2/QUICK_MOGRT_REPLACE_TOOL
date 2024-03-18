var currentOS;
var pluginPath = "";
var config = {};

function fixPath(pathToFix) {
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
}

function loadConfig(userConfig) {
    config = JSON.parse(userConfig);
    pluginPath = fixPath(config.presetPath);
}

function isItFirstUseJSX(path) {
    var newResponse = {
        isItFirstUse: true,
        actionTime: null,
    };

    var logPath = fixPath(path) + fixPath("\\logs\\firstLaunchLog.json");
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