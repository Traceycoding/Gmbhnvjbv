const { spawn } = require('child_process');
const express = require('express');
const app = express();

// 1. WEB SERVER (Required for Render's 24/7 check)
app.get('/', (req, res) => res.send('Xbox Broadcast System is Running'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Web interface active on port ${PORT}`));

// 2. START THE BROADCASTER
console.log("Starting MCXboxBroadcast...");

// We use 'stdbuf' to make sure the Microsoft login code shows up instantly in logs
const bot = spawn('java', ['-jar', 'MCXboxBroadcastStandalone.jar'], {
  shell: true
});

// 3. CAPTURE LOGS (This is how you get your login code)
bot.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(`[BOT]: ${output}`);
});

bot.stderr.on('data', (data) => {
  console.error(`[ERROR]: ${data.toString()}`);
});

bot.on('close', (code) => {
  console.log(`Bot exited with code ${code}. Restarting in 5s...`);
  // Auto-restart if it crashes
  setTimeout(() => process.exit(1), 5000); 
});
