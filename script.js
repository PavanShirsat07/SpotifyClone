console.log("hello");

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
            songs.push(element.href);
        }
    }
    return songs;
}

async function main() {
    let songs = await getsong();
    console.log(songs);
    let songul = document.querySelector(".songlist ul");
    for (const song of songs) {
        let songName = song.split("/SpotifyClone/Songs/")[1];




        songul.innerHTML += `<li>
          <img src="img/music.svg" class="invert" alt="">
                            <div class="info">
                                <div>${songName.replaceAll("%20", " ").replaceAll("(PaglaSongs)"," ")}</div>
                                <div>Pavan</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img src="img/play.svg"class="invert" alt="">
                            </div>
        </li>`;
    }
    try {
        var audio = new Audio(songs[0]);
        // audio.play();
    } catch (e) {
        console.log("error", e);
    }
}

main();
