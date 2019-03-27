const Command = require('./CommandClass')

let prisonniers = new Array()

module.exports = class Prison extends Command {

    static get prisonniers() {
        return prisonniers
    }

    static match(message) {
        return message.content.startsWith("!prison")
    }

    static action(message) {
        let args = message.content.split(' ')
        args.shift();

        //Cherche le membre dont l'username correspond au premier paramètre de la commande
        message.guild.members.forEach(guildMember => {
            if (guildMember.user.username == args) {
                prisonniers[guildMember.displayName] = guildMember

                //Envoi en prison
                let voiceChannelID = guildMember.voiceChannelID
                guildMember.setVoiceChannel('333711354714259468').then(() => {
                    message.channel.send('Pour sortir de prison, @' + guildMember.displayName + " doit écrire \"!prison Je suis desole d'avoir importuné " + message.member.displayName + "\"")
                }).catch(console.error)

                //Le libère de prison après 15sec
                setTimeout(function () {
                    guildMember.setVoiceChannel(voiceChannelID)
                    prisonniers[guildMember.displayName] = undefined
                }, 15000)
            }
        })
    }

    static liberation()


}