console.log("welcome to spotify")
// initialize the variables
// ye songIndex hai k konsa song play ho raha hai
let songIndex = 0;
let audioElement = new Audio('SONGS/0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));



let songs = [
    { songName: "Maan Meri Jaan", filePath: "SONGS/0.mp3", coverPath: "SONGS/cover pic/1.jpg" },
    { songName: "Arijit Singh Mashup-2022", filePath: "SONGS/1.mp3", coverPath: "SONGS/cover pic/2.jpg" },
    { songName: "BholeNaath", filePath: "SONGS/2.mp3", coverPath: "SONGS/cover pic/3.jpg" },
    { songName: "Kesariya", filePath: "SONGS/3.mp3", coverPath: "SONGS/cover pic/4.jpg" },
    { songName: "Oh Antava Mava", filePath: "SONGS/4.mp3", coverPath: "SONGS/cover pic/5.jpg" },
    { songName: "Piya Re", filePath: "SONGS/5.mp3", coverPath: "SONGS/cover pic/6.jpg" },
    { songName: "Raatan Lambiyan", filePath: "SONGS/6.mp3", coverPath: "SONGS/cover pic/7.jpg" },
    { songName: "Ram Ram", filePath: "SONGS/7.mp3", coverPath: "SONGS/cover pic/8.jpg" },
    { songName: "Srivalli", filePath: "SONGS/8.mp3", coverPath: "SONGS/cover pic/9.jpg" },
    { songName: "Tere Pyaar Mein", filePath: "SONGS/9.mp3", coverPath: "SONGS/cover pic/10.jpg" }
]
// niche vale code me humne (foreach loop) ko use kia hai jisse hum name and image ko set kar sake main page par......
songItem.forEach((element, i) => {
    // console.log(element, i) 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 0.3;
    } else {
        if (audioElement.play || audioElement.currentTime >= 0) {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    }
})


// listen to Events specially for time update k gaane ka time aage badh raha hai ya ni
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // update seekbar progressBar aage badhega ya ni matlab agar hum seekbar ko aage kheeche to gaana bhi aage badhe vhi na ruka rahe
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    //  console.log(progress);
    // yahi niche humne progressBar ki value ko (progress) ki value dedi hai.......
    myProgressBar.value = progress;

})
// ab hum change karenge value seekbar ki jab hum usko aage badhaenge matlab jab hum seekbar ko kheechenge to gaane ki duration bhi change ho jaye
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
        //   agar niche src me song line wise na chale to (index+1) kar dena qk ye ek array hai to 0 se start hota hai par humne upar songs ki aur id ki numbering 1 se start ki hui hai........
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 0.3;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})
// ye niche pura function (next button k liye hai)....k hum song aage kese badhaye...with next button....
document.getElementById("next").addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
// ye niche vala function (previous button k liye hai)...jisse hum gaana back krenge......
document.getElementById("previous").addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})




