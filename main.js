const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");
const closeListButton = document.getElementById("close-button");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//sira
let index;

//dongu
let loop = true;

//sarki listesi
const songsList = [
  {
    name: "Bu Son Olsun",
    link: "assets/CEM KARACA - BU SON OLSUN.mp3",
    artist: "Cem Karaca",
    image: "assets/cemkaraca-busonolsun.jpg",
  },
  {
    name: "Tamirci Çırağı",
    link: "assets/Cem Karaca - Tamirci Çırağı.mp3",
    artist: "Cem Karaca",
    image: "assets/cemkaraca.jpg",
  },
  {
    name: "Cheri Cheri Lady",
    link: "assets/Cheri Cheri Lady.mp3",
    artist: "Modern Talking",
    image: "assets/cherilady.jpg",
  },
  {
    name: "Feeling Good",
    link: "assets/Feeling Good.mp3",
    artist: "Michael Buble",
    image: "assets/michael-buble.jpg",
  },
  {
    name: "Keyfi Yolunda Aşkı Sonunda",
    link: "assets/Keyfi Yolunda Aşkı Sonunda.mp3",
    artist: "Yalın",
    image: "assets/yalin.jpg",
  },
  {
    name: "Hanfendi",
    link: "assets/Mabel Matiz - Hanfendi.mp3",
    artist: "Mabel Matiz",
    image: "assets/mabel.jpg",
  },
  {
    name: "Öyle Kolaysa",
    link: "assets/Mabel Matiz - Öyle Kolaysa.mp3",
    artist: "Mabel Matiz",
    image: "assets/mabel.jpg",
  },
  {
    name: "Bedelini Ödedim",
    link: "assets/Melike Sahin- BedeliniOdedim.mp3",
    artist: "Melike Sahin",
    image: "assets/melikesahin.jpg",
  },
  {
    name: "Until I Found You",
    link: "assets/Stephen Sanchez - Until I Found You (Official Video).mp3",
    artist: "Stephen Sanchez",
    image: "assets/stephen-sanchez.jpg",
  },
  {
    name: "Sevda Sinemalarda",
    link: "assets/Yaşar - Sevda Sinemalarda.mp3",
    artist: "Yaşar",
    image: "assets/yasar-sevda.jpg",
  },
  {
    name: "Gelo Ew Ki Bu",
    link: "assets/gelo-ew-ki-bu.mp3",
    artist: "Aram Tigran",
    image: "assets/aram-tigran.jpeg",
  },
  {
    name: "Gitme Kal",
    link: "assets/yara-bere-icindeyim.mp3",
    artist: "Hira-i Zerdust",
    image: "assets/hirai.jpeg",
  },
  {
    name: "Aramam",
    link: "assets/aramam.mp3",
    artist: "Ibrahim Tatlises",
    image: "assets/ibrahim-tatlises.jpeg",
  },
  {
    name: "Ax Eman",
    link: "assets/ax-eman.mp3",
    artist: "Rewsan Celiker",
    image: "assets/rewsan-celiker.jpeg",
  },
  {
    name: "Dinle",
    link: "assets/dinle.mp3",
    artist: "Mahsun Kirmizigul",
    image: "assets/mahsun.jpeg",
  },
];

//sarki atama
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration); //240
  };
  playAudio();

  playListContainer.classList.add("hide");
};

//oynatma listesini goster
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});
//oynatma listesini kapat
closeListButton.addEventListener("click", () => {
    playListContainer.classList.add("hide");
  });
  
//tekrar tiklanildiginda
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = true;
    console.log("tekrar kapatildi");
  } else {
    repeatButton.classList.add("active");
    audio.loop = false;
    console.log("tekrar acildi");
  }
});

//karistirici tiklanildiginda
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = false;
    console.log("karistirma kapali");
  } else {
    shuffleButton.classList.add("active");
    loop = true;
    console.log("karistirma acik");
  }
});

//ilerleme cubuguna tiklanildiginda
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  console.log(coordStart);

  let coordEnd = event.clientX;
  console.log(coordEnd);

  console.log(progressBar.offsetWidth);
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;

  playAudio();
});

//zaman tutucu
setInterval(() => {
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

//sarkiyi oynat
const playAudio = () => {
  audio.play();
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
};

//sarkiyi durdur
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//sonraki sarki
const nextSong = () => {
  if (loop) {
    //dongu aciksa
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    //karistirici acikla
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};

//onceki sarki
const previousSong = () => {
  pauseAudio();

  if (index > 0) {
    index = index - 1;
  } else {
    index = songsList.length - 1;
  }

  setSong(index);
};

//sarki bittiginde
audio.onended = () => {
  nextSong();
};

//zaman duzenlemesi
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//sarki suresi degistikce
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//sarki listesini olustur
const initPlaylist = () => {
  for (const i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
       onclick="setSong(${i})">
       <div class="playlist-image-container">
        <img src="${songsList[i].image}"/>
       </div>
       <div class="playlist-song-details">
        <span id="playlist-song-name">
         ${songsList[i].name}
         </span>
         <span id="playlist-song-artist-album">
         ${songsList[i].artist}
         </span>
        </div>
       </li>`;
  }
};

//oynata tiklanildiginda
playButton.addEventListener("click", playAudio);

//dura tiklanildiginda
pauseButton.addEventListener("click", pauseAudio);

//sonrakine gec tiklanildiginda
nextButton.addEventListener("click", nextSong);

//onceye git tiklanilirsa
prevButton.addEventListener("click", previousSong);

window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initPlaylist();
};
