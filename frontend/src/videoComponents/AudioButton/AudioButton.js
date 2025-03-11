import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStream, updateCallStatus } from '../actions';
import ActionButtonCaretDropDown from './ActionButtonCaretDropDown';

const AudioButton = () => {
    const [caretOpen, setCaretOpen] = useState(false);
    const dispatch = useDispatch();
    const callStatus = useSelector(state => state.callStatus);
    const audioDeviceList = useSelector(state => state.audioDeviceList);
    const smallFeedEl = useSelector(state => state.smallFeedEl);
    const micText = callStatus.audio === 'enabled' ? 'Mute' : 'Unmute';

    const startStopAudio = () => {
        // Your existing startStopAudio logic here
    }

    const changeAudioDevice = async(e) => {
        // The user changed the desired output audio device OR input audio device
        // 1. We need to get that deviceId AND the type
        const deviceId = e.target.value.slice(5);
        const audioType = e.target.value.slice(0, 5);
        console.log(e.target.value);
        
        if(audioType === "output") {
            // 4 (sort of out of order). Update the smallFeedEl
            // We are now DONE! We don't care about the output for any other reason
            smallFeedEl.current.setSinkId(deviceId);
        } else if(audioType === "input") {
            // 2. We need to getUserMedia (permission) 
            const newConstraints = {
                audio: { deviceId: { exact: deviceId } },
                video: callStatus.videoDevice === "default" ? true : { deviceId: { exact: callStatus.videoDevice } },
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia(newConstraints);
                // 3. Update Redux with that videoDevice, and that video is enabled
                dispatch(updateCallStatus('audioDevice', deviceId));
                dispatch(updateCallStatus('audio', 'enabled'));
                // 5. We need to update the localStream in streams
                dispatch(addStream('localStream', stream));
                // 6. Add tracks - actually replaceTracks
            } catch (err) {
                if (err.name === 'OverconstrainedError') {
                    console.error('The constraints provided cannot be satisfied by any available devices.');
                } else {
                    console.error('Error accessing media devices.', err);
                }
            }
        }
    }

    return (
        <div className="button-wrapper d-inline-block">
            <i className="fa fa-caret-up choose-audio" onClick={() => setCaretOpen(!caretOpen)}></i>
            <div className="button mic" onClick={startStopAudio}>
                <i className="fa fa-microphone"></i>
                <div className="btn-text">{micText}</div>
            </div>
            {caretOpen ? <ActionButtonCaretDropDown 
                            defaultValue={callStatus.audioDevice} 
                            changeHandler={changeAudioDevice}
                            deviceList={audioDeviceList}
                            type="audio"
                        /> : <></>}
        </div>
    )
}

export default AudioButton;