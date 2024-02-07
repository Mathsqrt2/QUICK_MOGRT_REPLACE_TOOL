var proj = app.project;
var seq = proj.activeSequence;
var pluginPath = "";
var config = {};
var allMGT;

function loadConfig(userConfig){
    config = JSON.parse(userConfig);
    pluginPath = $.mogrts_control.fixPath(config.presetPath);
}

$.mogrts_control = {
    displayAllElementsProperties: function(){
        var allMgrtElements = [];

        if(seq.videoTracks.length){
            var clipsCounter = 0;
            for(var i = 0; i < seq.videoTracks.length; i++){
                if(seq.videoTracks[i].clips.length){
                    clipsCounter++;
                    for(var j = 0; j < seq.videoTracks[i].clips.length; j++){
                        if(seq.videoTracks[i].clips[j].isMGT()){
                            if(!this.namePresenceCheck(allMgrtElements,seq.videoTracks[i].clips[j].name)){
                                var outputObject = {
                                    name: seq.videoTracks[i].clips[j].name,
                                    properties: [],
                                    instances: [],
                                }
                                outputObject.instances.push(seq.videoTracks[i].clips[j]);
                                for(var l = 0; l < seq.videoTracks[i].clips[j].components.length; l++){
                                    if(seq.videoTracks[i].clips[j].components[l].displayName == "Graphic Parameters"){
                                        for(var m = 0; m < seq.videoTracks[i].clips[j].components[l].properties.length; m++){
                                            var propertyObject = {
                                                name: seq.videoTracks[i].clips[j].components[l].properties[m].displayName,
                                                value: seq.videoTracks[i].clips[j].components[l].properties[m].getValue(),
                                            };
                                            outputObject.properties.push(propertyObject);
                                        }
                                    }
                                }
                                allMgrtElements.push(outputObject);
                            } else {
                                for(var k = 0; k < allMgrtElements.length; k++){
                                    if(allMgrtElements[k].name == seq.videoTracks[i].clips[j].name){
                                        allMgrtElements[k].instances.push(seq.videoTracks[i].clips[j]);
                                    }
                                }
                            }                            
                        }
                    }
                } 
            }
            if(clipsCounter < 1){
                return 0;
            }
        } 

        this.saveLogs(config,"displayAllElements");
        allMGT = allMgrtElements;
        return JSON.stringify(allMgrtElements);
    },

    processReplacement: function(name,property,newValue){
            for(var i = 0; i < allMGT.length; i++){
                if(allMGT[i].name == name){
                    for(var j = 0; j < allMGT[i].components.length; j++){
                        if(allMGT[i].components[j].displayName == "Graphic Parameters"){
                            for(var k = 0; k < allMGT[i].components[j].properties.length; k++){
                                if(allMGT[i].components[j].properties[k].displayName == property){
                                    allMGT[i].components[j].properties[k].setValue(newValue,true);
                                }
                            }
                        }
                    }
                }
            }

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