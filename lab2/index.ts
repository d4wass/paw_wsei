const pads: NodeListOf<Element> = document.querySelectorAll('.pad');
const audio: HTMLCollectionOf<HTMLAudioElement> = document.getElementsByTagName('audio');

const playAudio: Function = (audio: HTMLAudioElement) => (
    audio.play()
);

const signAudioToBtn = (pads: NodeListOf<Element>, audio: HTMLCollectionOf<HTMLAudioElement>) => (
    pads.forEach(
        (pad: Element, index: number) => pad.addEventListener('click', () => audio[index].play())
    )
);

signAudioToBtn(pads, audio);