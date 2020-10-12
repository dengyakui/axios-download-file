const Axios = require('axios')
const Fs = require('fs')
const Path = require('path')

async function download() {
    const url = 'https://unsplash.com/photos/dpbXgTh0Lac/download?force=true'
    const path = Path.join(__dirname, 'result', 'file.jpg')

    const response = await Axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    })
    const writer = Fs.createWriteStream(path)
    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            console.log('download finish')
            resolve()
        })

        response.data.on('error', (err) => reject(err))
    })
}

download().then(() => {
    console.log("ok")
})