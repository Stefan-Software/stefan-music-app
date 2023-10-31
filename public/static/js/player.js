let songData = []

let index = 0

fetch('../../song.txt')
    .then(response => response.text())
    .then(data => {
        const songNames = data.split('\n').filter(songName => songName.trim() !== '')
        songData.push(songNames)
        index = songData[0].indexOf(localStorage.getItem('lastPlayedSong'))
        console.log(data)
    })
    .catch(error => {
        console.error(error)
    })


const $ = (id) => document.getElementById(id)

const playerElement = {
    previousSong: '',
    back: $('previousButton'),
    next: $('nextButton'),
    play: {
        id: $('playButton'),
        init: true,
        isPaused: true
    },
    sliderInput: $('slider-input'),
    timer: $('timer'),
    audio: $('audio'),
    volumeInput: $('volume-input'),
    currentArtist: $('currentArtist')
}

let lastPlayedSong = localStorage.getItem('lastPlayedSong')
playerElement.currentArtist.innerText = lastPlayedSong

function playSong(song, init) {
    audio.pause()

    let previousParentElement

    if (playerElement.previousSong === '') { }

    else {
        previousParentElement = document.getElementById(playerElement.previousSong)
        previousParentElement.classList.remove('active')
    }

    parentElement = document.getElementById(song)
    parentElement.classList.add('active')


    if (playerElement.play.init && playerElement.play.isPaused) {
        playerElement.play.isPaused = false
        playerElement.play.init = false
        playerElement.play.id.setAttribute('ico', '../ico/play.png')
    }

    index = songData[0].indexOf(song)

    playerElement.audio.src = `./music/${song}.mp3`
    playerElement.audio.preload = "auto"

    playerElement.audio.addEventListener("loadedmetadata", function () {
        playerElement.sliderInput.max = String(playerElement.audio.duration)
        playerElement.audio.play()
    })

    currentArtist.innerText = song

    playerElement.previousSong = song

    localStorage.setItem('lastPlayedSong', song)

    setInterval(updateTimer, 1000)
}

function updateTimer() {
    const { audio, sliderInput, timer } = playerElement

    const currentTime = audio.currentTime
    const roundedCurrentTime = Math.round(currentTime)

    sliderInput.value = String(roundedCurrentTime)

    // Format Time
    const minutes = String(Math.floor(roundedCurrentTime / 60)).padStart(2, '0')
    const seconds = String(roundedCurrentTime % 60).padStart(2, '0')
    timer.innerText = `${minutes}:${seconds}`
}

// Play button logic
function playPause() {
    if (playerElement.play.init) {
        playSong(lastPlayedSong, true)
        playerElement.play.id.setAttribute('ico', '../ico/play.png')
    }

    else {

        if (playerElement.play.isPaused) {
            playerElement.audio.play()
            playerElement.play.id.setAttribute('ico', '../ico/play.png')
            playerElement.play.isPaused = false
        }

        else {
            playerElement.audio.pause()
            playerElement.play.id.setAttribute('ico', '../ico/pause.png')
            playerElement.play.isPaused = true
        }

    }
}

playerElement.play.id.addEventListener('click', () => {
    playPause()
})

// Play next song
function playNext() {
    if (playerElement.play.isPaused) {
        playerElement.play.id.setAttribute('ico', '../ico/play.png')
    }

    if (index + 1 > songData[0].length - 1) {
        index = 0 // Wrap around to the first song
    } else {
        index += 1
    }

    playSong(songData[0][index], false)
}

playerElement.next.addEventListener('click', () => {
    playNext()
})

function playPrev() {
    if (playerElement.play.isPaused) {
        playerElement.play.id.setAttribute('ico', '../ico/play.png')
    }

    if (index - 1 < 0) {
        index = songData[0].length - 1 // Wrap around to the last song
    } else {
        index -= 1
    }

    playSong(songData[0][index], false)
}

playerElement.back.addEventListener('click', () => {
    playPrev()
})


// Slider Logic for player + volume
playerElement.volumeInput.addEventListener('input', () => {
    playerElement.audio.volume = parseInt(playerElement.volumeInput.value) / 100
})

let isSeeking = false
function updateTime() {
    const { audio, sliderInput } = playerElement
    const currentTime = audio.currentTime
    sliderInput.value = currentTime.toString()
}

playerElement.sliderInput.addEventListener('mousedown', () => {
    playerElement.audio.removeEventListener('timeupdate', updateTime)
    isSeeking = true
})

playerElement.sliderInput.addEventListener('mouseup', () => {
    playerElement.audio.pause()
    setTimeout(() => {
        if (isSeeking) {
            const seekTime = Number(playerElement.sliderInput.value)
            playerElement.audio.currentTime = seekTime
            playerElement.audio.addEventListener('timeupdate', updateTime)
            isSeeking = false
            playerElement.audio.play()
        }
    }, 1)
})


if ('mediaSession' in navigator) {
    setupMediaSession()
}

// Shortcut functions
function setupMediaSession() {
    // Add event handlers for media keys
    navigator.mediaSession.setActionHandler('previoustrack', function () {
        navigator.mediaSession.setActionHandler('previoustrack', null) // Temporarily disable the handler

        playPrev()

        setTimeout(() => {
            navigator.mediaSession.setActionHandler('previoustrack', function () {
               setupMediaSession()
            })
        }, 100) // Adjust the duration of the delay as needed
    })

    navigator.mediaSession.setActionHandler('nexttrack', function () {
        navigator.mediaSession.setActionHandler('nexttrack', null) // Temporarily disable the handler

        playNext()

        setTimeout(() => {
            setupMediaSession()
        }, 100) // Adjust the duration of the delay as needed
    })


    navigator.mediaSession.setActionHandler('play', function (event) {
        playPause()
    })

    navigator.mediaSession.setActionHandler('pause', function (event) {
        playPause()
    })

    // Add additional handlers for other media keys as needed
    // Register a visibility change event handler to control media session
    document.addEventListener('visibilitychange', () => {
        document.visibilityState === 'visible'
    })
}
