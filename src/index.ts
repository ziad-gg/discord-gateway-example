import axios, { AxiosHeaders, formToJSON } from "axios"
import { EventEmitter } from "events"
import { WebSocket } from "ws"
import { Message, MessageEvent, payloadType, MessageEventOption, ClientUser, message_reference } from "./types"

class Client {
  
   private auth = "" as string
   private events = new EventEmitter() as (any | VoidFunction)
   public fetchApi: (string | any) = "notlogin"
   private stats = false as (null | boolean | undefined | never)
   private user = "" as any
   public ws = "" as any

   private payload = {
      op: 2,
      d: {
         token: "",
         intents: 131071,
         properties: {
            $os: 'linux',
            $browser: 'chrome',
            $device: 'chrome'
         },
         presence: {
            activities: [{
               "name": "Ziath",
               "type": 0,
               "application_id": "921682283239456768",
               "state": "Made by Typescript",
               "details": "Typescript",
               "timestamps": {
                  "start": 1507665886,
               },
               "assets": {
                  "large_image": "default",
               },
            }],
            status: "online",
            since: 91879201,
            afk: false
         },
      }
   } as unknown as payloadType
   
   constructor(s: string) {}

   async login(token: string | any) {
    this.auth = token
    this.fetchApi = axios.create({headers: {'Authorization': `${this.auth}`, "Content-Type": "application/json", "Accept": "application/json" }});
    this.stats = true // open
    this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json") // save the socket
    this.payload.d.token = token // set the token
    await this.fetchApi({url: DiscordAPI("/users/@me"), method: "GET"}).then((data: any) => {
      this.ws.on('open', () => this.ws.send(JSON.stringify(this.payload)));
      this.ws.addEventListener('message', (event:  any | never ) => {
         const { t,  op, d } = JSON.parse(event.data.toString()) as MessageEvent;
         if (op === 10) {
            setInterval(() => {
               console.log("start Refreshing");
               this.ws.send(JSON.stringify({op: 1, d: null}))
            }, d.heartbeat_interval)
         };
         if (t === "MESSAGE_CREATE") this.events.emit("messageCreate", d);
         if (t === "READY") this.events.emit("ready", d);
      });

    }).catch((e: any) => {
      this.stats = null
     throw new Error(e);
    })
   }

   async send(channelId: (string | number), _data: any) {
    if (!this.stats) throw new Error("Invalid Token");
    this.fetchApi({url: DiscordAPI(`/channels/${channelId}`), method: "GET"}).then(async (data: JSON) => {
      this.fetchApi({url: DiscordAPI(`/channels/${channelId}/messages`), method: "POST", data: {content: _data.conent}}).catch((e: JSON) => { // users accounts cant send embeds :)
         throw new Error(`error ${e.toString()}`);
      })
    }).catch((e: JSON) => {
      throw new Error("Invalid channel")
    });
   }

   public on(name: string, callback: any ) {
     this.events.on(name, callback)
   }
  
   public once(name: string, callback: any ) {
      this.events.once(name, callback)
   }
}

function DiscordAPI(url: string) { return 'https://discord.com/api/v9/' + url };

export default Client