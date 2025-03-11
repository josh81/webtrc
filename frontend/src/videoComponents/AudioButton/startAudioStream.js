
//this functions job is to update all peerConnections (addTracks) and update redux callStatus

const startAudioStream = (streams)=>{
    const localStream = streams.localStream;
    for(const s in streams){ //s is the key
        if(s !== "localStream"){
            //we don't addTracks to the localStream
            // const curStream = streams[s];
            const curStream = streams[key];
            //addTracks to all peerConnecions
            localStream.stream.getAudioTracks().forEach(t=>{
                curStream.peerConnection.addTrack(t,localStream.stream);
                // curStream.peerConnection.addTrack(t,streams.localStream.stream);
            })
        }   
    }
}

export default startAudioStream;
