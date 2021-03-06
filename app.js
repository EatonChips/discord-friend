const Discord = require('discord.js');
const commands = require('./commands.js');
const config = require('./config.js');

// Command prefix
const prefix = config.prefix

// Global cleverbot instances
let cleverBots = {};

// Authorize Discord Bot
var discordClient = new Discord.Client();
const discordToken = config.DBOT_KEY;
discordClient.login(discordToken);

// Authorize Cleverbot Client
let key = process.env.CLEVERBOT_KEY || config.CBOT_KEY;

// When Discord Bot Connects to Servers
discordClient.on('ready', function() {
    console.log('======== Connections ========');
    discordClient.guilds.forEach(guild => {         // Print server ids
        console.log('Guild id: ' + guild.id);
    });
});

// When message is sent to chat
discordClient.on('message', (message) => {
    // Message is not from Discord-friend
    if (!(message.author.id === discordClient.user.id)) {

        // Check if message is a command
        if (message.content.includes(prefix)) {
            switch (message.content) {
                case prefix + ' help':                                       // User wants help
                    commands.help.exec(message);                            // Display commands
                    return;
                case prefix + ' start':                                      // User starts conversation
                    cleverBots = commands.start.exec(message, cleverBots);  // Run start command
                    return;
                case prefix + ' stop':                                       // User stops conversation
                    cleverBots = commands.stop.exec(message, cleverBots);   // Run stop command
                    return;
                case prefix + ' ping':
                    commands.ping.exec(message);                            // Run ping/pong command
                    return;
                default:                                                    // User typed in wrong command
                    commands.help.exec(message);                            // Display commands
                    return;
            }
        }

        var channelID = message.channel.id;
        // If user using bot messages channel
        if (cleverBots[channelID] != undefined && message.author === cleverBots[channelID].user) {
            interact(message, cleverBots);
        }

    } else {
        // Discord-friend Response
    }
});

function interact(message, cleverbots) {
    // Get channel id
    let channelID = message.channel.id;   

    // Make bot 'type'
    message.channel.startTyping();

    // Query cleverbot api
    cleverBots[channelID].bot.request(message.content).then((res => {
        // Send response to chat
        message.channel.send(res.output);
        // Make bot stop 'typing'
        message.channel.stopTyping();
    })).catch((err) => {
        console.error(err);
    })
}