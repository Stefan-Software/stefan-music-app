const path = require('path')
const fs = require('fs')

function initializePage(musicPath, res, downloadLink, showDownloadButton, uploadStatus, displayHomeScreen, displayAddScreen) {
    fs.readdir(musicPath, (err, files) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Internal Server Error')
        }

        const songNames = files.map((file) => path.parse(file).name)

        fs.writeFileSync('./public/song.txt', songNames.join('\n'), 'utf8')

        res.render('app', {
            songs: songNames,
            downloadLink: downloadLink,
            showDownloadButton: showDownloadButton,
            uploadStatus: uploadStatus,
            displayHomeScreen: displayHomeScreen,
            displayAddScreen: displayAddScreen
        })
    })
}

module.exports = initializePage