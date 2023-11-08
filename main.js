const player = document.querySelector(".player")
const play = document.querySelector(".play")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
const audio = document.querySelector(".audio")
const songTitle = document.querySelector(".song")
const progressConteiner = document.querySelector(".progress__conteiner")
const progress = document.querySelector(".progress")
const imgSRC = document.querySelector(".cover_img")
const imgPlay = document.querySelector(".img__src")

let songName = ["BACK2BACK", "Gruppa krovi", "Psycho Dreams", "Sea Of Problems", "We All Lift Together"]

let songIndex = 0;

function loadSong(song) {

    songTitle.innerHTML = song;
    audio.src = `/audio/${song}.mp3`;

}

loadSong(songName[songIndex])

function playSong() {
    audio.play();
    player.classList.add("play")
    imgSRC.classList.add("active")
    imgPlay.src = `/img/pause.png`;

}

function pauseSong() {
    audio.pause();
    player.classList.remove("play")
    imgSRC.classList.remove("active")
    imgPlay.src = `/img/play.png`;

}


play.addEventListener('click', () => {
    const isPlaying = player.classList.contains("play");

    if (isPlaying) {
        pauseSong()

    } else {
        playSong();
    }
});


function nextSong() {
    songIndex++;
    if (songIndex > songName.length - 1) {
        songIndex = 0
    }
    loadSong(songName[songIndex]);
    playSong()
}
next.addEventListener('click', () => {
    nextSong()

})


function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songName.length - 1;
    }
    loadSong(songName[songIndex]);
    playSong()
}
prev.addEventListener('click', () => {
    prevSong()

})

function UpdateProgress(event) {
    const {
        duration,
        currentTime
    } = event.srcElement;
    let progressP = currentTime / duration * 100;
    progressP = progressP + "%";
    progress.style.width = progressP;
    console.log(progress.style.width);
}

audio.addEventListener('timeupdate', UpdateProgress)


function setProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;

}
progressConteiner.addEventListener('click', setProgress)