let pads;
let audio;
let btnChannelsRec;
let btnChannelsPlay;
let btnChannelsDelete;
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
    btnChannelsDelete = document.querySelectorAll('[data-channel-del]');
    document.addEventListener('keypress', onKeyPress);
    btnChannelsPlay.forEach(btnPlay => btnPlay.addEventListener('click', (e) => playChannelRecord(e)));
    btnChannelsRec.forEach(btnRec => btnRec.addEventListener('click', () => recOnChannel(btnRec)));
    btnChannelsDelete.forEach(btnDel => btnDel.addEventListener('click', () => deleteFromChannel(btnDel)));
};
const onKeyPlaySound = (index, currentTime = 0) => {
    console.log(currentTime);
    audio[index].currentTime = currentTime;
    audio[index].play();
};
const playRecordedSound = (key, time) => {
    let arrPads = Array.from(pads);
    let indexSound = arrPads.findIndex(element => element.dataset.key === key);
    onKeyPlaySound(indexSound, time);
};
const playFromChannel = (channel) => {
    channel.forEach(sound => {
        setTimeout(() => playRecordedSound(sound.key, sound.timeStamp), sound.timeStamp);
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
const deleteFromChannel = (btnDel) => {
    if (btnDel.dataset.channelDel === "1") {
        channel1.length = 0;
    }
    if (btnDel.dataset.channelDel === "2") {
        channel2.length = 0;
    }
    if (btnDel.dataset.channelDel === "3") {
        channel3.length = 0;
    }
    if (btnDel.dataset.channelDel === "4") {
        channel4.length = 0;
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
