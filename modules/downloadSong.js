const initializePage = require('./initializePage')
const axios = require('axios')

async function downloadSong(req, res) {
    const videoURL = req.body.videoURL

    const options = {
        method: 'GET',
        url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/',
        params: {
            url: videoURL
        },
        headers: {
            'X-RapidAPI-Key': '247b30772cmsh16b93012d36695ap1de618jsn2909923d091f',
            'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options)
        console.log(response.data)
        let link = response.data.link

        initializePage('./public/music', res, link, 'block', 'none', 'none', 'block')
    } catch (error) {
        console.error(error)
    }
}

module.exports = downloadSong