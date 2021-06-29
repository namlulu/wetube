import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const startBtn = document.getElementById('startBtn');
const video = document.getElementById('preview');

let stream;
let recorder;
let videoFile;

const files = {
  input: 'recording.webm',
  output: 'output.mp4',
  thumb: 'thumbnail.jpg',
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement('a');
  a.href = fileUrl;
  a.download = fileName;
  document.body.append(a);
  a.click();
};

const handleDownload = async () => {
  startBtn.removeEventListener('click', handleDownload);

  startBtn.innerText = 'Transcording...';

  startBtn.disabled = true;

  const ffmpeg = createFFmpeg({
    corePath: '/convert/ffmpeg-core.js',
    log: true,
  });
  await ffmpeg.load();

  ffmpeg.FS('writeFile', files.input, await fetchFile(videoFile));

  await ffmpeg.run('-i', files.input, '-r', '60', files.output);

  await ffmpeg.run(
    '-i',
    files.input,
    '-ss',
    '00:00:01',
    '-frames:v',
    '1',
    files.thumb
  );

  const mp4File = ffmpeg.FS('readFile', files.output);
  const thumbFile = ffmpeg.FS('readFile', files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: 'video/mp4' });
  const thumbBlob = new Blob([thumbFile.buffer], { type: 'image/jpg' });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, 'myRecording.mp4');
  downloadFile(thumbUrl, 'myThumbnail.jpg');

  ffmpeg.FS('unlink', files.input);
  ffmpeg.FS('unlink', files.output);
  ffmpeg.FS('unlink', files.thumb);

  URL.revokeObjectURL(videoFile);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbBlob);

  startBtn.disabled = false;
  startBtn.innerText = 'Record Again';
  startBtn.addEventListener('click', handleStart);
};

const handleStart = () => {
  startBtn.innerText = 'Recording';
  startBtn.disabled = true;
  startBtn.removeEventListener('click', handleStart);
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
    startBtn.innerText = 'Download';
    startBtn.disabled = false;
    startBtn.addEventListener('click', handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 1024, height: 576 },
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener('click', handleStart);
