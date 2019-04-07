const context = new (window.AudioContext || window.webkitAudioContext)();
const gain = context.createGain();
gain.connect(context.destination);
gain.gain.value = .25;

export default function playSound(sound) {
  if (this.state.isMuted) return;

  const real = new Float32Array(Array.from({length: 64}, (_, n) => (n === 0 ? 0 : 4 / (n * Math.PI) * Math.sin(Math.PI * n * 0.27))));
  const imag = new Float32Array(Array.from({length: 64}, () => 0));
  const wave = context.createPeriodicWave(real, imag);
  const oscillator1 = context.createOscillator();

  oscillator1.setPeriodicWave(wave);
  oscillator1.connect(gain);

  let oscillator2 = null;
  let noise = null;

  const makeNoise = () => {
    let bufferSize = context.sampleRate;
    let buffer = context.createBuffer(1, bufferSize, bufferSize);
    let output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    noise = context.createBufferSource();
    noise.buffer = buffer;
    noise.connect(gain);

    const real = new Float32Array(Array.from({length: 48}, () => Math.random() * 2 - 1));
    const imag = new Float32Array(Array.from({length: 48}, () => 0));
    const wave = context.createPeriodicWave(real, imag);

    oscillator2 = context.createOscillator();
    oscillator2.setPeriodicWave(wave);
    oscillator2.connect(gain);
  }

  let now = context.currentTime;

  switch (sound) {
    case 'start':
      oscillator1.frequency.setValueAtTime(329.63, now);
      oscillator1.frequency.setValueAtTime(349.23, now + .4);
      oscillator1.frequency.setValueAtTime(392, now + .5);
      oscillator1.frequency.setValueAtTime(440, now + .8);
      oscillator1.frequency.setValueAtTime(493.88, now + 1.1);
      oscillator1.frequency.setValueAtTime(523.25, now + 1.5);
      oscillator1.frequency.setValueAtTime(622.25, now + 1.6);
      oscillator1.frequency.setValueAtTime(523.25, now + 1.9);
      oscillator1.frequency.setValueAtTime(493.88, now + 2.2);

      oscillator1.start(now);
      oscillator1.stop(now + 2.5);
      break;
    case 'pause':
      oscillator1.frequency.setValueAtTime(880, now);
      oscillator1.frequency.setValueAtTime(740, now + .1);
      oscillator1.frequency.setValueAtTime(600, now + .2);
      oscillator1.start(now);
      oscillator1.stop(now + .3);
      break;
    case 'resume':
      oscillator1.frequency.setValueAtTime(600, now);
      oscillator1.frequency.setValueAtTime(740, now + .1);
      oscillator1.frequency.setValueAtTime(880, now + .2);
      oscillator1.start(now);
      oscillator1.stop(now + .3);
      break;
    case 'move':
      oscillator1.frequency.setValueAtTime(300, now);
      oscillator1.frequency.linearRampToValueAtTime(600, now + .125);
      oscillator1.start(now);
      oscillator1.stop(now + .125);
      break;
    case 'turbo':
      oscillator1.frequency.setValueAtTime(360, now);
      oscillator1.frequency.linearRampToValueAtTime(600, now + .075);
      oscillator1.start(now);
      oscillator1.stop(now + .075);
      break;
    case 'eat':
      oscillator1.frequency.setValueAtTime(180, now);
      oscillator1.frequency.exponentialRampToValueAtTime(360, now + .25);
      oscillator1.start(now);
      oscillator1.stop(now + .25);
      break;
    case 'explosion':
      makeNoise();
      oscillator1.frequency.setValueAtTime(120, now);
      oscillator1.frequency.exponentialRampToValueAtTime(60, now + .75);
      oscillator1.start(now);
      oscillator1.stop(now + .75);

      oscillator2.frequency.setValueAtTime(240, now);
      oscillator2.frequency.exponentialRampToValueAtTime(60, now + .75);
      oscillator2.start(now);
      oscillator2.stop(now + .75);
      
      noise.playbackRate.setValueAtTime(.25, now);
      noise.playbackRate.exponentialRampToValueAtTime(.05, now + .75);
      noise.start(now);
      noise.stop(now + .75);
      break;
    case 'levelRestart':
      oscillator1.frequency.setValueAtTime(600, now);
      oscillator1.frequency.exponentialRampToValueAtTime(200, now + .6);
      oscillator1.start(now);
      oscillator1.stop(now + .6);
      break;
    case 'levelUp':
      oscillator1.frequency.setValueAtTime(100, now);
      oscillator1.frequency.exponentialRampToValueAtTime(1000, now + .6);
      oscillator1.start(now);
      oscillator1.stop(now + .6);
      break;
    case 'gameOver':
      gain.gain.setValueAtTime(.001, now);
      oscillator1.frequency.setValueAtTime(261.63, now);
      gain.gain.exponentialRampToValueAtTime(.25, now + .4);
      oscillator1.frequency.exponentialRampToValueAtTime(311.13, now + .45);
      gain.gain.linearRampToValueAtTime(.001, now + .45);
      oscillator1.frequency.setValueAtTime(233.08, now + .5);
      gain.gain.exponentialRampToValueAtTime(.25, now + .9);
      oscillator1.frequency.exponentialRampToValueAtTime(277.18, now + .95);
      gain.gain.linearRampToValueAtTime(.001, now + .95);
      oscillator1.frequency.setValueAtTime(207.65, now + 1);
      gain.gain.exponentialRampToValueAtTime(.25, now + 1.4);
      oscillator1.frequency.exponentialRampToValueAtTime(246.94, now + 1.45);
      gain.gain.linearRampToValueAtTime(.001, now + 1.45);
      oscillator1.frequency.setValueAtTime(174.61, now + 1.5);
      gain.gain.exponentialRampToValueAtTime(.25, now + 2.2);
      oscillator1.frequency.exponentialRampToValueAtTime(207.65, now + 2.25);
      oscillator1.start(now);
      oscillator1.stop(now + 2.3);
      break;
    default:
      oscillator1.disconnect(gain);
      break;
  }
}