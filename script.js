const img = document.querySelector('img');
const audio = document.querySelector('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playbtn = document.getElementById('play');
const pausebtn = document.getElementById('pause');
const forwardbtn = document.getElementById('forward');
const backbtn = document.getElementById('back');
const timeEl = document.getElementById('time');
const durationEl = document.getElementById('duration');
const progressContainerEl = document.getElementById('progress-container');
const progressBarEl = document.getElementById('progress-bar');

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

var track = 0
var song = songs[track];
title.textContent = song.displayName;
artist.textContent = song.artist; 

function play(){
  audio.play();
  pausebtn.style.display = "inline";
  playbtn.style.display = "none";

};

function pause(){
  audio.pause();
  pausebtn.style.display = "none";
  playbtn.style.display = "inline";
};

function forward(){
  track === songs.length-1 ? track = 0 : track++ ;
  song = songs[track];
  audio.setAttribute('src', `/music/${song.name}.mp3`);
  img.setAttribute('src', `/img/${song.name}.jpg`);
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.play();
};

function back(){
  track === 0 ? track = songs.length-1 : track--;
  song = songs[track];
  audio.setAttribute('src', `/music/${song.name}.mp3`);
  img.setAttribute('src', `/img/${song.name}.jpg`);
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.play();
};

function updateProgress(event){
  const currentTime = event.srcElement.currentTime;
  const currentTimeMinutes = Math.floor(currentTime/60);
  let currentTimeSeconds = Math.floor(currentTime%60);
  if (currentTimeSeconds < 10){ currentTimeSeconds = `0${currentTimeSeconds}`;}
  timeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
  
  const duration = event.srcElement.duration;
  const durationMinutes = Math.floor(duration/60);
  let durationSeconds = Math.floor(duration%60);
  if (durationSeconds < 10) { durationSeconds = `0${durationSeconds}`;}
  //delay duration display to avoid NaN
  if(durationSeconds){durationEl.textContent = `${durationMinutes}:${durationSeconds}`;}

  const progressPercent = (currentTime/duration)*100;
  progressBarEl.style.width = `${progressPercent}%`;
}

function setProgress(event){
  audio.currentTime = (event.offsetX/this.offsetWidth)*audio.duration;
  
}

playbtn.addEventListener('click', play);
pausebtn.addEventListener('click', pause); 
forwardbtn.addEventListener('click', forward);
backbtn.addEventListener('click', back);
audio.addEventListener('timeupdate', updateProgress);
progressContainerEl.addEventListener('click', setProgress)
audio.addEventListener('ended',forward);
