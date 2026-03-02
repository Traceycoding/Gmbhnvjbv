const bedrock = require('bedrock-protocol')
const express = require('express')
const app = express()

// Keep Render alive
app.get('/', (req, res) => res.send('Redirect Bot is Active'))
app.listen(process.env.PORT || 3000)

console.log("Starting bot for NehemiahGames...")

const client = bedrock.createClient({
  host: 'NehemiahGames.aternos.me', 
  port: 17876, 
  username: 'IWnetwork@outlook.com',
  auth: 'microsoft'
})

// This catches the login code for your iPad
client.on('client.onMsaCode', (data) => {
  console.log(`!!! LOGIN CODE: ${data.user_code} !!!`)
  console.log(`Go to ${data.verification_uri} to sign in.`)
})

client.on('player_list', (packet) => {
  packet.records.records.forEach(player => {
    if (player.username === 'NehemiahCraft') {
      console.log("Nehemiah found! Transferring...")
      client.write('transfer', {
        server_address: 'NehemiahGames.aternos.me',
        port: 17876
      })
    }
  })
})

client.on('error', (err) => console.log("Error:", err.message))
