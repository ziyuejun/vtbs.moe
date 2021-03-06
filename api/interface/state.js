const io = require('socket.io-client')
const socket = io('http://0.0.0.0:9200?name=vtbs.moe')

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

socket.on('connect', () => {
  socket.emit('join', 'all')
  console.log('hello State')
})

const get = ({ name, key }) => new Promise(resolve => {
  socket.emit('state', { name, key }, resolve)
})

const getPending = () => Promise.race([get({ name: 'cluster', key: 'pending' }), wait(1000)]).then(number => {
  if (typeof number === 'number') {
    return number
  } else {
    console.error('getPending timeout')
    return Infinity
  }
})

module.exports = { getPending, socket }
