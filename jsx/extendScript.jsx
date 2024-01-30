var proj = app.project;
var seq = proj.activeSequence;

$.mogrts_control = {
    displayAllElementsProperties: function(){
        var headers = [];

        for(i = 0; i < proj.activeSequence.videoTracks.length; i++){
            for(j = 0; j < seq.videoTracks[i].clips.length; j++){
                if(seq.videoTracks[i].clips[j].isMGT()){
                    var title = seq.videoTracks[i].clips[j].name;

                    if(this.presenceCheck(headers,title) == 0){
                        var newCategory = {
                            name: title,
                            instancesNumber: 0,
                            instances: [],
                            addInstance: function(newElement){
                                this.instances.push(newElement);
                            },
                            incrementIndex: function(){
                                this.instancesNumber++;
                            },
                        };
                        headers.push(newCategory);

                    } else {
                        for(i = 0; i < headers.length; i++){
                            if(headers[i].name == title){
                                headers[i].addInstance("kutas kozła");
                                headers[i].incrementIndex();
                            }
                        }
                    }                   
                }
            }
        }

        alert(" " + JSON.stringify(headers));
        var file = new File("D:\\Archiwum\\Pulpit\\headers.json");
            file.open('w');
            file.write(JSON.stringify(headers));
            file.close();

    },
    presenceCheck: function(array,element){
        for(k = 0; k < array.length; k++){
            if(array[k] == element){
                return true;
            }
        }
        return false;
    },
    processReplacement: function(){
    }
}