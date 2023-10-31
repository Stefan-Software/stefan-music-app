const initializePage = require('./modules/initializePage')
const downloadSong = require('./modules/downloadSong')
const uploadSong = require('./modules/uploadSong')

const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Home page
app.get('/', (req, res) => {
    const musicPath = path.join(__dirname, './public/music')
    initializePage(musicPath, res, '', 'none', 'none', 'block', 'none')
})

app.post('/download', (req, res) => {
    downloadSong(req, res)
})

app.post('/delete', (req, res) => {
    const selectedSongs = req.body
    const musicPath = path.join(__dirname, './public/music')

    for (const song in selectedSongs) {
        const filePath = path.join(musicPath, song)
        fs.unlink(filePath + '.mp3', (err) => {
            if (err) {
                console.error(`Failed to delete ${song}:`, err)
            } else {
                console.log(`${song} deleted successfully.`)
            }
        })
    }

    // Assuming initializePage function is defined elsewhere
    res.redirect('/')
})

uploadSong(app)

app.post('/lang', (req, res) => {
    const lang = req.body.languageSelector
    console.log(lang)

    fs.writeFileSync('./public/lang.txt', lang, 'utf-8')

    res.redirect('/')
})

app.use(express.static('public'))

app.listen(2391, 'localhost', () => {
    console.log('Server running at http://localhost:2391\n')
})