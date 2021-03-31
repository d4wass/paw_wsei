let pads: NodeListOf<HTMLElement>;
let audio: HTMLCollectionOf<HTMLAudioElement>;
let btnChannelsRec: NodeListOf<HTMLElement>;
let btnChannelsPlay: NodeListOf<HTMLElement>;

const channel1Play: any[] = []

const appStart = (): void => {
    pads = document.querySelectorAll('.pad');
    audio = document.getElementsByTagName('audio');
    btnChannelsPlay = document.querySelectorAll('[data-channel-play]');
    btnChannelsRec = document.querySelectorAll('[data-channel-rec]');

    document.addEventListener('keypress', onKeyPress);
    console.log(pads);
    console.log(btnChannelsRec);
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

const playChannelRecord = () => {
    channel1Play.forEach(sound => {
        setTimeout(() => playRecordedSound(sound.key), sound.time)
    })
}


const onKeyPress = (e: KeyboardEvent): void => { 
    pads.forEach((pad: HTMLElement, index: number) => {
        if (e.key === pad.dataset.key) {
            onKeyPlaySound(index)
            channel1Play.push({ key: e.key, time: e.timeStamp })
            console.log(channel1Play)
        }
    })
}

appStart();
btnChannelsPlay[0].addEventListener('click', () => playChannelRecord())
