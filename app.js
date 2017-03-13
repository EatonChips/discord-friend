const Cleverbot = require('cleverbot.io');
const Discord = require('discord.js');
const commands = require('./commands.js');

// Command prefix
const prefix = '!f';

// Authorize Discord Bot
let discordClient = new Discord.Client();
const discordToken = 'MjgxODcwNzQ1NjExNjY1NDA4.C4eQLQ.dJhPeFaCbr-plBBEDVQwX06qM_M';

discordClient.login(discordToken);

// Authorize Cleverbot Client
let cleverBot = new Cleverbot('1L584wc2C7F7vTHa', '5nCmXTdIZjgXymov3Xyg4fbKEEQxGqMz');
cleverBot.setNick('discord-friend');

// When Discord Bot Connects to Servers
discordClient.on('ready', function() {
    console.log('Discord Session: Connected');
});

// When message is sent to chat
discordClient.on('message', (message) => {
    if (message.content == 'ping') {
        message.channel.sendMessage('pong');
    }

    // Check if message is a command
    if (message.content.includes(prefix)) {
        switch (message) {
            case prefix + ' help': 
                commands.help.exec(message);
                return;
            case prefix + ' start':
                commands.start.exec(message, cleverBot);
                return;
            default:
                commands.help.exec(message);
                return;
        }
    }
        
    // if (e.message.author.id == discordClient.User.id) return;
    // //console.log(e.message.author.id);
    // cleverBot.ask(e.message.content, function(err, response) {
    //     e.message.channel.sendMessage(response);
    // });
});

cleverBot.create(function(err, session) {
    if (err) {
        console.log(err)
    }
    console.log('Cleverbot Session: ' + session);
});

// discordClient.on('ready', function() {
//     console.log('Discord Bot: ' + discordClient.username + " - (" + discordClient.id + ")");
// });
 

// cleverBot.create(function (err, session) {
//     if (err) {
//         console.log(err);
//     } 
//     console.log('Cleverbot Session: ' + session);
//     discordClient.on('message', function(user, userID, channelID, message, event) {
//         console.log(discordClient);
//         if (userID == discordClient.user.id) return;
//         cleverBot.ask(message, function(err, response) {
//             discordClient.sendMessage({
//                 to: channelID,
//                 message: response
//             });
//         });
//     });

// });