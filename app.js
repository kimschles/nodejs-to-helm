// From Dan's Guides:
// https://github.com/justsml/guides/tree/master/express/setup-guide

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const app = module.exports = express()
const port = parseInt(process.env.PORT || 3000)

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan(process.env.NODE_ENV !== 'production'
    ? 'dev'
    : 'combined'))
app.use(cors({origin: true, credentials: true})) // <= Disable if you don't need CORS

app.use('/api/book', require('./routes/book'))
app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
    res
        .status(404)
        .send({error: 'Not found!', status: 404, url: req.originalUrl})
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack = process.env.NODE_ENV !== 'production'
        ? err.stack
        : undefined
    res
        .status(500)
        .send({error: err.message, stack, url: req.originalUrl})
}

app
    .listen(port)
    .on('error', console.error.bind(console))
    .on('listening', console.log.bind(console, 'Listening on http://0.0.0.0:' + port))
