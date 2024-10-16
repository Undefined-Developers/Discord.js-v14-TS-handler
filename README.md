# Erry Bot Handler for Discord.js v14 (TypeScript)

Welcome to the Erry Bot Handler repository! This robust handler is designed to streamline your Discord bot development using the latest features of Discord.js v14 with TypeScript. This handler will be used for Erry bot.

## 🚀 Features

- **TypeScript Ready**: Crafted for the modern TypeScript ecosystem.
- **Up-to-Date Dependencies**: Always running on the latest versions for peak performance.
- **Advanced Sharding**: Implements `discord-hybrid-sharding` and `discord-cross-hosting` for efficient clustering and sharding.
- **Prisma Integration**: Utilizes `prisma` as a powerful database wrapper for PostgreSQL.
- **Comprehensive Tools**: Comes with an integrated database, Redis cache, cross-hosting, and sharding capabilities.
- **User-Friendly Commands**: Jumpstart your bot with pre-generated commands (`npm run ...`) for ease of use.

## ⚙️ Installation & Setup

1. **Clone the bridge branch**: ```git clone https://github.com/Undefined-Developers/Discord.js-v14-TS-handler -b bridge bridge```.
2. **Clone the main branch**: ```git clone https://github.com/Undefined-Developers/Discord.js-v14-TS-handler handler```.
   
### Bridge
1. **Configure**: Rename `config_sample.ts` to `config.ts` in bridge folder.
2. **Customize Configuration**: Fill in the `config.ts` as needed. Don't worry, not all fields are mandatory for initial setup, and defaults work just fine!
3. **Initialization**: Execute ```npm run init``` and await the magic.
4. **Launch**: Once you see `SETUP IS DONE` in the console, you're all set! Start bridge with ```npm run start```. Discover more commands in `package.json`.
   
### Handler
1. **Configure**: Rename `config/config_sample.ts` to `config/config.ts` in handler config folder.
2. **Customize Configuration**: Fill in the `config.ts` as needed. Don't worry, not all fields are mandatory for initial setup, and defaults work just fine!
3. **Initialization**: Execute ```npm run init``` and await the magic.
4. **Launch**: Once you see `SETUP IS DONE` in the console, you're all set! Start handler with ```npm run start```. Discover more commands in `package.json`.

**Success**: Your bot is now live and ready to engage!

## npm run init - Why?
I created this script to simplify and speed up setup, but if your host disallow file writes and/or you can't use scripts, there's manual way (same for both bridge and handler):

1. Run ```npm i```. This will install all the required packages
2. Run ```npm i -g pm2```. This will install pm2 so bot will run in background without any consoles open.
3. Create following entries in .env:
- `DATABASE_URL` and paste database link from config
- `BOT_PROCESS_NAME` and paste botName from config
- `TOKEN` and paste bot token from config
- `AUTH_KEY` and paste bridge_authToken from config
- `REDIS` and paste redis link from config
4. Paste following as scripts in package.json:
```
  "scripts": {
    "init": "npm install pm2 -g && npm install && npx tsx utils/init.ts && npx prisma db push && echo SETUP IS DONE",
    "start": "pm2 start --name 'erry_handler' npx -- tsx index.ts && pm2 save && pm2 log 'erry_handler'",
    "restart": "pm2 restart 'erry_handler' && pm2 log 'erry_handler'",
    "stop": "pm2 stop 'erry_handler'",
    "delete": "pm2 delete 'erry_handler' && pm2 save --force",
    "start:cmd": "npx tsx index.js"
  },
```
5. Run ```npx prisma db push```. This will upload schemas to database so it can save data. Only run this on handler init, bridge doesn't have database package
6. Init done!

## 🎥 Video Setup Guide

[![Youtube handler setup](https://img.youtube.com/vi/L6jpBGFcxu0/0.jpg)](https://www.youtube.com/watch?v=L6jpBGFcxu0)

## 🙌 Acknowledgments

Special thanks to Tomato6966/discord-js-v14-handler for the inspiration behind our code structure and select functions that we've adapted and enhanced.
