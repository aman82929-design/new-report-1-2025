const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://via.placeholder.com/150/1db954/000000?text=Cover1"
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://via.placeholder.com/150/1db954/000000?text=Cover2"
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://via.placeholder.com/150/1db954/000000?text=Cover3"
  }
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const songList = document.getElementById('song-list');

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  progress.value = 0;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = "&#10073;&#10073;"; // pause icon
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = "&#9654;"; // play icon
}

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(currentSongIndex);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  loadSong(currentSongIndex);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
  }
});

progress.addEventListener('input', () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

function populateSongList() {
  songList.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playSong();
    });
    songList.appendChild(li);
  });
}

// Initialize the app
populateSongList();
loadSong(currentSongIndex);
