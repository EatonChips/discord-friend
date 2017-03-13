const Cleverbot = require('cleverbot-api-node');
const _ = require('lodash');
const config = require('./config.js');

commands = {
    // Prints help menu
    help: {
        desc: 'Prints out a list of Commands.',
        exec: function(message) {
            let commandKeys = Object.keys(commands);
            // Build help menu from command descriptions
            let helpMenu = '```'
            commandKeys.forEach(commandKey => {
                helpMenu += commandKey + ' - ' + commands[commandKey].desc + '\n';
            });
            helpMenu += '```';
            // Send help menu to channel
            message.channel.sendMessage(helpMenu);
        }
    },
    // Starts instance of cleverbot
    start: {
        desc: 'Starts a discussion.',
        exec: function(message, cBots) {
            let channelID = message.channel.id;                     // Get channel ID
            // If this channel is already being used
            if (!cBots[channelID]) {
                cBots[channelID] = {};
                cBots[channelID].bot = new Cleverbot(config.CBOT_KEY);  // Save cleverbot instance with channelID key value
                cBots[channelID].user = message.author;                 // Save user who started cleverbot Instance
                message.channel.sendMessage('Hello friend, ' + message.author);
            } else {
                message.channel.sendMessage(cBots[channelID].user + ' is using the friend.');
            }
            return cBots;                                           // Return updated global cleverBot instances
        }
    },
    // Stops cleverbot instance
    stop: {
        desc: 'Stops a discussion.',
        exec: function(message, cBots) {
            let channelID = message.channel.id;    // Get channel ID
            if (cBots[channelID] === undefined) {  // If conversation not started
                message.channel.sendMessage('Conversation not started');
            } else if (message.author.id != cBots[channelID].user.id) {     // If another user tries to stop interaction
                message.channel.sendMessage(cBots[channelID].user + ' is using the friend.');
            } else {
                message.channel.sendMessage('Goodbye friend, ' + message.author);
            }
            return _.omit(cBots, channelID);       // Remove cleverbot instance
        }
    },
    ping: {
        desc: 'Responds with pong',
        exec: function(message) {
            message.channel.sendMessage('Pong');
        }
    }
}

module.exports = commands;