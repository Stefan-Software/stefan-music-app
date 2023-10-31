const path = require('path')
const fs = require('fs')

async function handleUserRoute(req, res) {
    const musicPath = path.join(__dirname, '../public/music')
    fs.readdir(musicPath, (err, files) => {
        if (err) {
            console.error(err)
            return res.status(500).send('Internal Server Error')
        }
        const songNames = files.map((file) => path.parse(file).name)
        console.log(songNames)

        fs.writeFileSync('./public/song.txt', songNames.join('\n'), 'utf8')

        res.render('user', { songs: songNames })

    })
}

module.exports = handleUserRoute
