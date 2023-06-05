const tmi = require('tmi.js');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;
const twitchEmoji = require('twitch-emoji');



const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: 'MosquiBot',
    password: '' //a recup sur https://twitchapps.com/tmi/
  },
  channels: ['elmosquitoooooo']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return;
	if(message.toLowerCase() === 'salut') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
	}


  const parsedMessage = twitchEmoji.parse(message);

  io.emit('message', { displayName: tags['display-name'], color: tags.color, message: parsedMessage });
});



// Définir la route pour la page racine
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
