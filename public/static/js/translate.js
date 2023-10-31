$ = (x) => { return document.getElementById(x) }

const elements = {
    // Page Elements
    // Sidebar
    home: $('home-text'),
    songs: $('usr-text'),
    addSong: $('add-text'),
    remove: $('remove-text'),
    lang: $('lang-text'),

    // Add Song Page
    downloadTitle: $('download-p-title'),
    textLink: $('text-link'),
    convert: $('convert'),
    downloadMP3: $('download-btn-mp3'),
    uploadTitle: $('upload-p-title'),
    submitUpload: $('submit-song-upload'), //submit button 
    uploadStatus: $('uploadStatus'),

    // Remove a song Page
    submitDelete: $('delete-input-submit'),

    // Change Language Button
    changeLanguageP: $('changeLanguageP'),
    changeLangSubmit: $('changeLangSubmit'), //submit button 

    // Music Player
    currentSong: $('currentSong')
}

//elements.submitUpload.setAttribute('value', '')

fetch('../../lang.txt')
    .then(response => response.text())
    .then(data => {

        if (data === 'en') {
            document.getElementById('container').style.display = 'grid'
        }

        else if (data === 'ro') {
            // Sidebar
            elements.home.innerHTML = 'Meniul Principal'
            elements.songs.innerHTML = 'Melodiile Tale'
            elements.addSong.innerHTML = 'Adaugă o Melodie'
            elements.remove.innerHTML = 'Șterge o Melodie'
            elements.lang.innerHTML = 'Schimbați Limba'

            // Add song Page
            elements.downloadTitle.innerHTML = 'Descărcați Melodii sub formatul .MP3 de pe YouTube'
            elements.textLink.setAttribute('placeholder', 'Introduce-ți Link-ul')
            elements.convert.innerHTML = 'Start'
            elements.downloadMP3.innerHTML = 'Descărcați Melodia'
            elements.uploadTitle.innerHTML = 'Adăugați Melodia în Aplicație'
            elements.submitUpload.setAttribute('value', 'Adăugați')
            elements.uploadStatus.innerHTML = 'Melodia a fost adăugată cu succes'

            // Remove song Page
            elements.submitDelete.setAttribute('value', 'Ștergeți')

            // Change language
            elements.changeLanguageP.innerHTML = 'Schimbați Limba'
            elements.changeLangSubmit.setAttribute('value', 'Schimbați')

            // Music Player
            elements.currentSong.innerHTML = 'Melodia Curentă:'

            document.getElementById('container').style.display = 'grid'
        }

        else if (data === 'ja') {
            // Sidebar
            elements.home.innerHTML = 'ホーム'
            elements.songs.innerHTML = 'ユーザー音楽'
            elements.addSong.innerHTML = '音楽をダウンロード'
            elements.remove.innerHTML = '音楽を取り去る'
            elements.lang.innerHTML = '言語を変更'

            // Add song Page
            elements.downloadTitle.innerHTML = 'YouTubeから音楽をダウンロード'
            elements.textLink.setAttribute('placeholder', 'リンク を書きます')
            elements.convert.innerHTML = 'スタート'
            elements.downloadMP3.innerHTML = '音楽をダウンロード'
            elements.uploadTitle.innerHTML = 'アプリに音楽を追加する'
            elements.submitUpload.setAttribute('value', '追加する')

            // Remove song Page
            elements.submitDelete.setAttribute('value', '取り去る')

            // Change language
            elements.changeLanguageP.innerHTML = '言語を変更'
            elements.changeLangSubmit.setAttribute('value', '変更')

            // Music Player
            elements.currentSong.innerHTML = '現在の歌:'

            document.getElementById('container').style.display = 'grid'
        }

    })
