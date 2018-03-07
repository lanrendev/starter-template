const { Nuxt, Builder } = require('nuxt')
const https = require('https')
const fs = require('fs')
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3003

// initiate nuxt.js with the options
const config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with Nuxt.js

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt)
    .build()
    .then(listen)
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
} else {
  listen()
}

function listen() {
  const options = {
    key: fs.readFileSync('./certificate/private.pem'),
    cert: fs.readFileSync('./certificate/file.crt')
  }

  https.createServer(options, nuxt.render).listen(port)

  console.log('Server listening on `https://localhost:' + port + '`')
}
