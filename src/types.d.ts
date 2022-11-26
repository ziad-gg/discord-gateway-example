declare module 'node:events' {
  class EventEmitter {
    public static once<E extends EventEmitter, K extends keyof ClientEvents>(
      eventEmitter: E,
      eventName: E extends Client ? K : string,
    ): Promise<E extends Client ? ClientEvents[K] : any[]>;
    public static on<E extends EventEmitter, K extends keyof ClientEvents>(
      eventEmitter: E,
      eventName: E extends Client ? K : string,
    ): AsyncIterableIterator<E extends Client ? ClientEvents[K] : any>;
  }
}


declare module 'socket.io'
declare module 'socket.io-client'

export interface ClientUser {
  v: number
  user_settings_proto: string,
  user_settings: {
    detect_platform_accounts: boolean,
    animate_stickers: number,
    inline_attachment_media: boolean,
    status: string,
    message_display_compact: boolean,
    view_nsfw_guilds: boolean,
    timezone_offset: number,
    enable_tts_command: boolean,
    disable_games_tab: boolean,
    stream_notifications_enabled: boolean,
    animate_emoji: boolean,
    guild_folders: Array<Array<Object>>
    activity_joining_restricted_guild_ids: Array
    friend_source_flags: Object<all<boolean>>
    convert_emoticons: boolean,
    afk_timeout: number,
    passwordless: boolean,
    contact_sync_enabled: boolean,
    gif_auto_play: boolean,
    custom_status: any,
    native_phone_integration_enabled: boolean,
    allow_accessibility_detection: boolean,
    friend_discovery_flags: number
    show_current_game: boolean
    restricted_guilds: Array
    developer_mode: boolean
    view_nsfw_commands: boolean
    render_reactions: boolean
    locale: string
    render_embeds: boolean
    inline_embed_media: boolean
    default_guilds_restricted: boolean
    explicit_content_filter: number
    activity_restricted_guild_ids: Array
    theme: string
  }
  user_guild_settings: Array<Object< version <number>, suppress_roles <boolean>, suppress_everyone <boolean>, notify_highlights <number>, muted <boolean>, mute_scheduled_events <boolean>, mute_config <any>, mobile_push <boolean>, message_notifications <number>, hide_muted_channels <boolean>, guild_id <string>, flags <number>, hannel_overrides <Array> >>
  user: {
    verified: boolean
    username: string     
    purchased_flags: number
    public_flags: number
    premium_type: number
    premium: boolean
    phone: string
    nsfw_allowed: boolean
    mobile: boolean
    mfa_enabled: boolean
    id: string
    flags: number
    email: string
    discriminator: string
    desktop: boolean
    bio: string
    banner_color: string
    banner: any
    avatar_decoration: any
    avatar: string | any
    accent_color: number
  }
}

export interface message_reference {
  content: string,
  flags: number,
  payload_json: string
  embeds: Array<Object<
  title<string>, 
  type<string>, 
  description<string>, 
  url<string>, 
  color<number>, 
  footer<Object<text<string>, icon_url<string>, proxy_icon_url<string>>>, 
  author<Object<name<string>, icon_url<string>, proxy_icon_url<string>>>,
  fields<Object<name<string>, value<string>, inline<boolean>>>,
  thumbnail<Object<url<string>, proxy_icon_url<string>, height<string>, width<string>>>,
  image<Object<url<string>, proxy_icon_url<string>, height<string>, width<string>>>
  >>,
  components: Array<Object>
}

export interface Message {
  type: number
  id: string
  timestamp: string
  tts: boolean
  referenced_message: any
  pinned: boolean
  mention_roles: Array<Object>
  mention_everyone: boolean
  member: {
    roles: Array<Object>
    premium_since: any
    pending: boolean
    nick: any
    mute: boolean
    joined_at: string
    flags: number
    deaf: boolean
    communication_disabled_until: any
    avatar: any
  },
  components: Array<object>
  channel_id: string,
  flags: number
  edited_timestamp: any | string,
  content?: string,
  author: {
    id: string
    username: string
    avatar_decoration: any
    public_flags: number
    avatar: string
    discriminator: string
  }
  attachments: Array<any>
  guild_id: string
  embeds?: Array<Object<title<string>, description<string>, color<number>>>,
  channel: {
    send: (args: message_reference) => Object<name<string>>
  }
}

interface MessageEvent {
  t: string | number
  s: string | number,
  op: string | number,
  d: object| any
}

export interface payloadType {
  op: number
  d: {
    token: string
    intents: number,
    properties: {
      $os?: string,
      $browser?: string,
      $device?: string
    }

    presence?: {
      activities: Array<Object>
      since: number
      assets: Object<any>
      status: string
      afk: boolean
    }
    
  }
}

export type MessageEventOption = keyof MessageEvent