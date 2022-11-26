import Client from "./index"
import axios from "axios"
import { Message, ClientUser, message_reference } from "./types"

function DiscordAPI(url: string) { return 'https://discord.com/api/v9/' + url };
const content = async () => {
    const { data } = await axios.get('https://random-word-api.herokuapp.com/all').then(e => e)
    let index: number = Math.floor(Math.random() * data.length)
    let _content: string = data[index]+data[index+1]+data[index+2]
    if (typeof _content === "string") return _content
    else throw Error("invalid type")
}

const client: Client = new Client("hello");

client.on("ready", (data: (ClientUser)) => {
    console.log("%s Is Ready", data.user.username.toString());
    setInterval(async() => {
        const _content = await content();
        client.send("1045431515556880405", {conent: _content.toString()});
    }, 5500)
});

client.on("messageCreate", (message:Message) => {
    const prefix: string = "?"
    if (!message.content?.startsWith(prefix)) return
    const args = message.content?.slice(prefix.length).split(/ +/g) as Array<string>
    const command = <string>args.shift()?.toLocaleLowerCase()

    if (command === "greet") client.fetchApi({url: DiscordAPI(`/channels/${message.channel_id}/messages`), method: "POST", data: {content: `**Welcome** <@!${message.author.id}>`} as message_reference });
    if (command === "hello") client.fetchApi({url: DiscordAPI(`/channels/${message.channel_id}/messages`), method: "POST", data: {content: `**Hello** <@!${message.author.id}>`} as message_reference });
    if (command === "say") {
        const Tosay = <string> args.join(" ").toString();
        if (!Tosay?.length) return client.fetchApi({url: DiscordAPI(`/channels/${message.channel_id}/messages`), method: "POST", data: {content: `**invalid arguments** <@!${message.author.id}>`} as message_reference });
        client.fetchApi({url: DiscordAPI(`/channels/${message.channel_id}/messages`), method: "POST", data: {content: Tosay} as message_reference });
        client.fetchApi({url: DiscordAPI(`channels/${message.channel_id}/messages/${message.id}/reactions/%E2%9C%85/@me`), method: "PUT"});
    }    
})

client.login("token");