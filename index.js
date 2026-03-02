const bedrock = require('bedrock-protocol')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Bot is Alive'))
app.listen(process.env.PORT || 3000)

const bot = bedrock.createClient({
  host: 'NehemiahGames.aternos.me', 
  port: 17876, 
  username: 'IWnetwork@outlook.com',
  auth: 'microsoft'
})

bot.on('player_list', (packet) => {
  packet.records.records.forEach(player => {
    if (player.username === 'NehemiahCraft') {
      bot.write('transfer', {
        server_address: 'NehemiahGames.aternos.me',
        port: 17876
      })
    }
  })
})

console.log("Check logs for the Microsoft Link code...")
