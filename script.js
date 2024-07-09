console.log("hello");
let currsong = new Audio();
let songs = [];
let currfolder;

function secondsToMinSec(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedSeconds = remainingSeconds.toFixed(0).padStart(2, '0');
    let formattedTime = `${minutes}:${formattedSeconds}`;
    return formattedTime;
}

async function getsong(folder) {
    currfolder = folder;
    songs = [];  // Clear the songs array to prevent appending to previous folder's songs
    let a = await fetch(`http://127.0.0.1:5500/SpotifyClone/Songs/${folder}/`);
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
    let songul = document.querySelector(".songlist ul");
    songul.innerHTML = "";  // Clear the song list to prevent duplication
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

    // Play the first song if there are any songs in the list
    if (songs.length > 0) {
        playmusic(songs[0]);
    }
}

async function displaysongs(folder) {
    let response = await fetch(`http://127.0.0.1:5500/SpotifyClone/Songs/${folder}/info.json`);
    let songInfo = await response.json();
    let cardContainer = document.querySelector(".imgname");
    cardContainer.innerHTML = `
        <img src="${songInfo.imglink}" alt="">
        <div class="singername">
            <h1>${songInfo.title}</h1>
            <p>${songInfo.discription}</p>
        </div>`;
}

async function displayalbums() {
    let a = await fetch(`http://127.0.0.1:5500/SpotifyClone/Songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let ancher = div.getElementsByTagName("a");
    let cardcontainer = document.querySelector(".cardContainer");
    cardcontainer.innerHTML = "";  // Clear existing cards
    Array.from(ancher).forEach(async e => {
        if (e.href.includes("/Songs")) {
            let folder = e.href.split("/").slice(-1)[0];
            let a = await fetch(`http://127.0.0.1:5500/SpotifyClone/Songs/${folder}/info.json`);
            let response = await a.json();
            cardcontainer.innerHTML += `<div data-folder="${folder}" class="card">
                        <div class="play">
                            <img src="img/play2.svg" alt="">
                        </div>
                        <img src="${response.imglink}" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.discription}</p>
                    </div>`;
        }
    });
    // Add event listeners to the cards after they are rendered
    setTimeout(() => {
        Array.from(document.getElementsByClassName("card")).forEach(e => {
            e.addEventListener("click", async item => {
                await getsong(item.currentTarget.dataset.folder);
            });
        });
    }, 1000);
}

const playmusic = (track, pause = false) => {
    currsong.src = `/SpotifyClone/Songs/${currfolder}/${encodeURIComponent(track)}`;
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
    await getsong('arijit');  // Specify the folder here
    if (songs.length > 0) {
        playmusic(songs[0], true);
    }

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
        }
    });

    document.querySelector("#next").addEventListener("click", () => {
        let index = songs.indexOf(decodeURIComponent(currsong.src.split("/").pop()));
        if (index < songs.length - 1) {
            playmusic(songs[index + 1]);
        }
    });

    displayalbums();

    document.addEventListener('click', function () {
        const cardContainer = document.querySelector('.cardContainer');
        const cards = document.querySelectorAll('.card');
        const cardplaylist=document.querySelector('.cardplaylist')
        const body=document.querySelector('.right')
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cardContainer.style.display = 'none';
                cardplaylist.style.display= 'block'
            });
        });
    });
    document.querySelector('.leftarrow').addEventListener('click',()=>{
        const cardContainer = document.querySelector('.cardContainer');
        const cards = document.querySelectorAll('.card');
        const cardplaylist=document.querySelector('.cardplaylist')
        const songss=document.querySelector('.slist ul')
          cardContainer.style.display = 'flex';
        cardplaylist.style.display= 'none'
        console.log("clicked");

    })

    // displaysongs();
    document.addEventListener('click', function () {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const folder = card.getAttribute('data-folder');
                displaysongs(folder);
                getsongs(folder)
            });
        });
    });

    document.querySelector('.rightarrow').addEventListener('click', () => {
        console.log("rightclicked");
        // Add any functionality you want to execute when right arrow is clicked
        // For example, you can clear the song list here:
        songs = [];
        let songul = document.querySelector(".slist ul");
        songul.innerHTML = "";
    });
}
let i=0;
async function getsongs(folder) {
    try {
        currfolder = folder;
        songs = [];  // Clear the songs array to prevent appending to previous folder's songs

        // Fetch songs from the server
        let response = await fetch(`http://127.0.0.1:5500/SpotifyClone/Songs/${folder}/`);
        let textResponse = await response.text();

        // Parse the fetched HTML response to extract MP3 file names
        let div = document.createElement("div");
        div.innerHTML = textResponse;
        let as = div.getElementsByTagName("a");
        
        for (let i = 0; i < as.length; i++) {
            const element = as[i];
            if (element.href.endsWith(".mp3")) {
                songs.push(decodeURIComponent(element.href.split("/").pop()));
            }
        }

        // Get the song list container and clear previous list items
        let songul = document.querySelector(".slist ul");
        songul.innerHTML = "";

        // Populate the song list with the fetched songs
        songs.forEach(song => {
            let songName = song.replaceAll("%20", " ").replaceAll("(PaglaSongs)", " ");
            songul.innerHTML += `<li>
                <div class="sinfo">
                    <img src="img/music.svg" alt="">
                    <p>${songName}</p>
                </div>
                <div class="stime">${secondsToMinSec(song.duration)}</div>
            </li>`;
        });

        // Add click event listeners to each song item
        Array.from(songul.getElementsByTagName("li")).forEach((e, index) => {
            e.addEventListener("click", () => {
                playmusic(songs[index]);
            });
        });

        // Play the first song if there are any songs in the list
        if (songs.length > 0) {
            playmusic(songs[0]);
        }
    } catch (error) {
        console.error('Error fetching or processing songs:', error);
    }
}

main();
