let pads: NodeListOf<HTMLElement>;
let audio: HTMLCollectionOf<HTMLAudioElement>;
let btnChannelsRec: NodeListOf<HTMLElement>;
let btnChannelsPlay: NodeListOf<HTMLElement>;
let selectedChannel: Array<any>

const channel1: Array<{ key: string, timeStamp: number }> = [];
const channel2: Array<{ key: string, timeStamp: number }> = [];
const channel3: Array<{ key: string, timeStamp: number }> = [];
const channel4: Array<{ key: string, timeStamp: number }> = [];

const appStart = (): void => {
    pads = document.querySelectorAll('.pad');
    audio = document.getElementsByTagName('audio');
    btnChannelsPlay = document.querySelectorAll('[data-channel-play]');
    btnChannelsRec = document.querySelectorAll('[data-channel-rec]');

    document.addEventListener('keypress', onKeyPress);
    btnChannelsPlay.forEach(btnPlay => btnPlay.addEventListener('click', (e) => playChannelRecord(e)))
    btnChannelsRec.forEach(btnRec => btnRec.addEventListener('click', () => recOnChannel(btnRec)))
}


const onKeyPlaySound = (index: number): void => {
    audio[index].currentTime = 0;
    audio[index].play();
}

const playRecordedSound = (key: string): void => {
    let arrPads = Array.from(pads)
    let indexSound = arrPads.findIndex(element => element.dataset.key === key)

    onKeyPlaySound(indexSound)
}

const playFromChannel = (channel: Array<{ key: string, timeStamp: number }>): void => {
    channel.forEach(sound => {
        setTimeout(() => playRecordedSound(sound.key), sound.timeStamp)
    })
}
const playChannelRecord = ({ target: { dataset }}: any): void => {
     if (dataset.channelPlay === "1") {
        playFromChannel(channel1)
    }
    if (dataset.channelPlay === "2") {
        playFromChannel(channel2)
    }
    if (dataset.channelPlay === "3") {
        playFromChannel(channel3)
    }
    if (dataset.channelPlay === "4") {
        playFromChannel(channel4)
    }

}

const recOnChannel = (btnRec?: HTMLElement): void => {
    if (btnRec.dataset.channelRec === "1") {
        selectedChannel = channel1
    }
    if (btnRec.dataset.channelRec === "2") {
        selectedChannel = channel2
    }
    if (btnRec.dataset.channelRec === "3") {
        selectedChannel = channel3
    }
    if (btnRec.dataset.channelRec === "4") {
        selectedChannel = channel4
    }

}


const onKeyPress = ({key, timeStamp}: KeyboardEvent): void => {
    pads.forEach((pad: HTMLElement, index: number) => {
        if (key === pad.dataset.key) {
            onKeyPlaySound(index)
            selectedChannel && selectedChannel.push({key,timeStamp})
        }
    })
}

appStart();
