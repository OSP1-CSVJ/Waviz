import Waviz from '../core/waviz';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const audio = document.getElementById('audio') as HTMLAudioElement;
const video = document.getElementById('video') as HTMLVideoElement;
// const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// const stream = await navigator.mediaDevices.getDisplayMedia({
//   video: true,
//   audio: true,
//   preferCurrentTab: true
// });
const wavizTest = new Waviz(canvas, audio);
// const wavizTest = new Waviz(canvas, 'microphone');
// const wavizTest = new Waviz(canvas, video);
// const wavizTest = new Waviz(canvas, 'screenAudio');
// const wavizTest = new Waviz(canvas, stream);

// Testing option objects
  const optionsWave = { lineWidth: 3, lineColor: 'blue', multipliyer: 3 };
  const optionsBars = { barWidth: 10, fillStyle: 'blue', numBars: 20 };

//Test on play
audio.addEventListener('play', async () => {
    await wavizTest.input.initializePending(); //TODO: Figure out how to make this done in the classes
    wavizTest.visualizer!.simpleBars();
});


// Test on pause
audio.addEventListener('pause', () => {
  wavizTest.visualizer!.stop();
});

// Video Test
video.addEventListener('play', async () => {
  await wavizTest.input.initializePending();
  wavizTest.visualizer!.simpleLine();
});

video.addEventListener('pause', () => {
  wavizTest.visualizer!.stop();
});