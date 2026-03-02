const { spawn } = require('child_process');
const express = require('express');
const app = express();

// 1. Keep Render Happy
app.get('/', (req, res) => res.send('Broadcaster is Online!'));
app.listen(process.env.PORT || 3000);

// 2. Run the JAR file
// Make sure your file is named exactly 'MCXboxBroadcastStandalone.jar'
const bot = spawn('java', ['-jar', 'MCXboxBroadcastStandalone.jar'], {
  stdio: 'inherit' // This shows the Microsoft Login code in Render's logs
});

bot.on('close', (code) => {
  console.log(`Bot process exited with code ${code}`);
});
