console.log("hello");
let currsong = new Audio();
let songs = [];

function secondsToMinSec(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedSeconds = remainingSeconds.toFixed(0).padStart(2, '0');
    let formattedTime = `${minutes}:${formattedSeconds}`;
    return formattedTime;
}

async function getsong() {
    let a = await fetch("http://127.0.0.1:5500/SpotifyClone/Songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(decodeURIComponent(element.href.split("/").pop()));
        }
    }
}

const playmusic = (track, pause = false) => {
    currsong.src = `/SpotifyClone/Songs/${encodeURIComponent(track)}`;
    if (!pause) {
        currsong.play();
        document.getElementById("play").src = "img/paused.svg";
    }
    currsong.addEventListener('error', (error) => {
        console.error('Error loading the audio:', error);
    });
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function main() {
    await getsong();
    playmusic(songs[0], true);

    let songul = document.querySelector(".songlist ul");
    for (const song of songs) {
        let songName = song.replaceAll("%20", " ").replaceAll("(PaglaSongs)", " ");
        songul.innerHTML += `<li>
            <img src="img/music.svg" class="invert" alt="">
            <div class="info">
                <div>${songName}</div>
                <div>Pavan</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img src="img/play.svg" class="invert" alt="">
            </div>
        </li>`;
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((e, index) => {
        e.addEventListener("click", () => {
            playmusic(songs[index]);
        });
    });

    let play = document.getElementById("play");
    play.addEventListener("click", () => {
        if (currsong.paused) {
            currsong.play();
            play.src = "img/paused.svg";
        } else {
            currsong.pause();
            play.src = "img/play.svg";
        }
    });

    currsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinSec(currsong.currentTime)} / ${secondsToMinSec(currsong.duration)}`;
        document.querySelector(".circle").style.left = (currsong.currentTime / currsong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currsong.currentTime = (currsong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%";
    });

    document.querySelector("#previous").addEventListener("click", () => {
        let index = songs.indexOf(decodeURIComponent(currsong.src.split("/").pop()));
        if (index > 0) {
            playmusic(songs[index - 1]);
            console.log(index - 1);
        }
    });

    document.querySelector("#next").addEventListener("click", () => {
        let index = songs.indexOf(decodeURIComponent(currsong.src.split("/").pop()));
        if (index < songs.length - 1) {
            playmusic(songs[index + 1]);
            console.log(index + 1);
        }
    });
}

main();
