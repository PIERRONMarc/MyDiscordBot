const Discord = require('discord.js')
const bot = new Discord.Client()
const Prison = new require('./commands/PrisonClass')

let token = 'inserer token içi'
bot.login(token)

bot.on('ready', function() {
    bot.user.setActivity('Octogone avec mamie').catch(console.error)
})

bot.on('message', function (message){
    if(message.content === '!ping')
    {
        message.reply('pong')
    }

    Prison.parse(message)
})

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    if(oldMember.voiceChannelID === '333711354714259468' && Prison.prisonniers[oldMember.displayName] !== undefined)
    {
        oldMember.setVoiceChannel('333711354714259468').then(() => console.log(`Moved ${oldMember.displayName}`)).catch(console.error)
    }
})