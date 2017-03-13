commands = {
    help: {
        desc: 'Prints out a list of Commands.',
        exec: function(message) {
            let commandKeys = Object.keys(commands);
            let helpMenu = '```'

            commandKeys.forEach(commandKey => {
                    helpMenu += commandKey + ' - ' + commands[commandKey].desc + '\n';
            });
            helpMenu += '```';

            message.channel.sendMessage(helpMenu);
        }
    },
    start: {
        desc: 'Starts a discussion.',
        exec: function(message, cleverBot) {

            cleverBot.create((err, session) => {
                if (err) {
                    console.log(err)
                }
                console.log('Cleverbot Session: ' + session);
            });

            message.channel.sendMessage('oi');
        }
    }
}

module.exports = commands;