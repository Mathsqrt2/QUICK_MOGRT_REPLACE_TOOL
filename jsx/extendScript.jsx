var proj = app.project;
var seq = proj.activeSequence;

$.mogrts_control = {

    userConfigHandling: function(){
    },
    checkMode: function(){
    },
    checkSelectedItems: function(){
    },
    displayAllElementsProperties: function(){
    var mogrts = [], counterMGT = 0;
        for(i = 0; i < proj.activeSequence.videoTracks.length; i++){
            for(j = 0; j < seq.videoTracks[i].clips.length; j++){
                seq.videoTracks[i].clips[j];
                if(seq.videoTracks[i].clips[j].isMGT()){
                    mogrts.push(seq.videoTracks[i].clips[j]);
                    counterMGT++;
                }
                
            }
        }
    
        return mogrts;
    },
    displaySelectedItemsProperties: function(){
    },
    processReplacement: function(){
    }
}