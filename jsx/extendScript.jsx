var proj = app.project;
var seq = proj.activeSequence;
var pluginPath = "";
var config = {};

$.mogrts_control = {
    displayAllElementsProperties: function(userConfig){
        config = JSON.parse(userConfig);
        pluginPath = this.fixPath(config.presetPath);
        this.saveLogs(userConfig,"displayAllElements");
    },

    processReplacement: function(){
    },

    saveLogs: function(data,action){
        var outputFilePath = this.fixPath(pluginPath)  + "\\logs\\log.json";
        var file = new File(outputFilePath);

        var actionTime = new Date();
        var outputContent = [];
        var oldLogState;
        var useIndex = 0;

        if(file.exists){
            file.open("r");
            oldLogState = file.read();
            outputContent = JSON.parse(oldLogState);
            useIndex = outputContent.length;      
            file.close();
        }

        var newElement = {timestamp: actionTime.getTime(), index: useIndex, action: action};
            outputContent.push(newElement);
        
            file.open('w');
            file.write(JSON.stringify(outputContent) + "\n\n");
            file.close();
    },

    fixPath: function(path){
        var fixedPath = path;
        
            while(fixedPath.indexOf('/') > 0){
                fixedPath = fixedPath.replace('/','\\');
            }

        return fixedPath;
    }
}