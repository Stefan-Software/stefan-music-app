const initializePage = require('./initializePage')
const multer = require('multer')
const path = require('path')

function uploadSong(app) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const destinationPath = path.join(__dirname, '../public/music')
            cb(null, destinationPath)
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    })

    const upload = multer({
        storage: storage,
    })

    app.post('/upload', upload.single('file'), (req, res) => {
        res.redirect('/')
    })
}


module.exports = uploadSong
