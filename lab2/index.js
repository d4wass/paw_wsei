let pads;
let audio;
let btnChannelsRec;
let btnChannelsPlay;
let selectedChannel;
const channel1 = [];
const channel2 = [];
const channel3 = [];
const channel4 = [];
const appStart = () => {
    pads = document.querySelectorAll('.pad');
    audio = document.getElementsByTagName('audio');
    btnChannelsPlay = document.querySelectorAll('[data-channel-play]');
    btnChannelsRec = document.querySelectorAll('[data-channel-rec]');
    document.addEventListener('keypress', onKeyPress);
    btnChannelsPlay.forEach(btnPlay => btnPlay.addEventListener('click', (e) => playChannelRecord(e)));
    btnChannelsRec.forEach(btnRec => btnRec.addEventListener('click', () => recOnChannel(btnRec)));
};
const onKeyPlaySound = (index) => {
    audio[index].currentTime = 0;
    audio[index].play();
};
const playRecordedSound = (key) => {
    let arrPads = Array.from(pads);
    let indexSound = arrPads.findIndex(element => element.dataset.key === key);
    onKeyPlaySound(indexSound);
};
const playFromChannel = (channel) => {
    channel.forEach(sound => {
        setTimeout(() => playRecordedSound(sound.key), sound.timeStamp);
    });
};
const playChannelRecord = ({ target: { dataset } }) => {
    if (dataset.channelPlay === "1") {
        playFromChannel(channel1);
    }
    if (dataset.channelPlay === "2") {
        playFromChannel(channel2);
    }
    if (dataset.channelPlay === "3") {
        playFromChannel(channel3);
    }
    if (dataset.channelPlay === "4") {
        playFromChannel(channel4);
    }
};
const recOnChannel = (btnRec) => {
    if (btnRec.dataset.channelRec === "1") {
        selectedChannel = channel1;
    }
    if (btnRec.dataset.channelRec === "2") {
        selectedChannel = channel2;
    }
    if (btnRec.dataset.channelRec === "3") {
        selectedChannel = channel3;
    }
    if (btnRec.dataset.channelRec === "4") {
        selectedChannel = channel4;
    }
};
const onKeyPress = ({ key, timeStamp }) => {
    pads.forEach((pad, index) => {
        if (key === pad.dataset.key) {
            onKeyPlaySound(index);
            selectedChannel && selectedChannel.push({ key, timeStamp });
        }
    });
};
appStart();
