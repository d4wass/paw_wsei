var pads = document.querySelectorAll('.pad');
var audio = document.getElementsByTagName('audio');
var playAudio = function (audio) { return (audio.play()); };
var signAudioToBtn = function (pads, audio) { return (pads.forEach(function (pad, index) { return pad.addEventListener('click', function () { return audio[index].play(); }); })); };
signAudioToBtn(pads, audio);
