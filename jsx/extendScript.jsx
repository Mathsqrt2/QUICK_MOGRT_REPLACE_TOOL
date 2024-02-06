var proj = app.project;
var seq = proj.activeSequence;
var pluginPath = "";
var config = {};

function loadConfig(userConfig){
    config = JSON.parse(userConfig);
    pluginPath = $.mogrts_control.fixPath(config.presetPath);
}

$.mogrts_control = {
    displayAllElementsProperties: function(){
        var allMgrtElements = [];

        if(seq.videoTracks.length > 0){
            var clipsCounter = 0;
            for(var i = 0; i < seq.videoTracks.length; i++){
                if(seq.videoTracks[i].clips.length > 0){
                    clipsCounter++;
                    for(var j = 0; j < seq.videoTracks[i].clips.length; j++){
                        if(seq.videoTracks[i].clips[j].isMGT()){
                            var outputObject = {
                                name: seq.videoTracks[i].clips[j].name,
                                properties: [],
                                instances: [],
                            }
                            if(!this.namePresenceCheck(allMgrtElements,seq.videoTracks[i].clips[j].name)){
                                allMgrtElements.push(outputObject);
                                
                                for(var k = 0; k < allMgrtElements.length; k++){
                                    if(allMgrtElements[k].name == seq.videoTracks[i].clips[j].name){
                                        allMgrtElements[k].instances.push(seq.videoTracks[i].clips[j]);
                                    }
                                }
                            } else {
                                for(var k = 0; k < allMgrtElements.length; k++){
                                    allMgrtElements[k].instances.push(seq.videoTracks[i].clips[j]);
                                }
                            }                            
                        }
                    }
                } 
            }
            if(clipsCounter < 1){
                alert("this sequence doesn't contain any clips!");
            }
        } else {
            alert("this sequence doesn't contain any video tracks!");
        }

        this.saveLogs(config,"displayAllElements");
        alert("number of found MGT" + JSON.stringify(allMgrtElements));
        return allMgrtElements;
    },

    processReplacement: function(){


        this.saveLogs(config,"processReplacement");
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
    },
    namePresenceCheck: function(array,element){
        for(var i = 0; i < array.length; i++){
            if(array[i].name == element){
                return 1;
            }
        }
        return 0;
    }
}