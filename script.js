console.log("hello");
let currsong = new Audio();

function secondsToMinSec(seconds) {
    // Calculate whole minutes and remaining seconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // Prepare the formatted time string
    let formattedSeconds = remainingSeconds.toFixed(0); // Round to zero decimal places
    let formattedTime = `${minutes}:${formattedSeconds}`;

    return formattedTime;
}


async function getsong() {
    let a = await fetch("http://127.0.0.1:5500/SpotifyClone/Songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(decodeURIComponent(element.href.split("/").pop()));
        }
    }
    return songs;
}

const playmusic = (track,pause=false) => {
    currsong.src = `/SpotifyClone/Songs/${encodeURIComponent(track)}`;
    if(!pause){
    currsong.play();
    play.src = "img/paused.svg";
    }
    currsong.addEventListener('error', (error) => {
        console.error('Error loading the audio:', error);
    });
    // Update play button image
    document.querySelector(".songinfo").innerHTML=decodeURI(track);
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"
}

async function main() {
    let songs = await getsong();
    playmusic(songs[0],true)


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
            let songName = songs[index];
            playmusic(songName);
        });
    });

    // Event listener for play/pause button
    let play = document.getElementById("play");
    play.addEventListener("click", () => {
        if (currsong.paused) {
            currsong.play();
            play.src = "img/paused.svg";
        } else {
            currsong.pause(); // Use pause() method to pause the audio
            play.src = "img/play.svg";
        }
    });

    currsong.addEventListener("timeupdate",()=>{
        document.querySelector(".songtime").innerHTML=`${secondsToMinSec(currsong.currentTime)} / ${
            secondsToMinSec(currsong.duration)
        }`
        document.querySelector(".circle").style.left=(currsong.currentTime/currsong.duration) *100 +"%";
    })

    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=percent+"%";
        currsong.currentTime=(currsong.duration*percent)/100;
    })

}

main();

