# Erry Bot Handler for Discord.js v14 (TypeScript)

Welcome to the Erry Bot Handler repository! This robust handler is designed to streamline your Discord bot development using the latest features of Discord.js v14 with TypeScript. This handler will be used for Erry bot.

## 🚀 Features

- **TypeScript Ready**: Crafted for the modern TypeScript ecosystem.
- **Up-to-Date Dependencies**: Always running on the latest versions for peak performance.
- **Advanced Sharding**: Implements `discord-hybrid-sharding` and `discord-cross-hosting` for efficient clustering and sharding.
- **Prisma Integration**: Utilizes `prisma` as a powerful database wrapper for PostgreSQL.
- **Comprehensive Tools**: Comes with an integrated database, Redis cache, cross-hosting, and sharding capabilities.
- **User-Friendly Commands**: Jumpstart your bot with pre-generated commands (`npm run ...`) for ease of use.

## ✅ Used by:
- Contact me in my [discord server](https://discord.fish/undefined) to be added
1. **discord.fish Bot** - [Click](https://discord.fish)

## ⚙️ Installation & Setup

1. **Clone handler**: ```git clone https://github.com/Undefined-Developers/Discord.js-v14-TS-handler handler```.
2. **Configure**: Rename `config/config_sample.ts` to `config/config.ts` in config folder.
3. **Customize Configuration**: Fill in the `config.ts` as needed. Don't worry, not all fields are mandatory for initial setup, and defaults work just fine!
4. **Initialization**: Execute ```npm run init``` and await the magic.
5. **Launch**: Once you see `SETUP IS DONE` in the console, you're all set! Start handler with ```npm run start```. Discover more commands in `package.json`.

**Success**: Your bot is now live and ready to engage!

*P.S. Everything was tested on node v22.12.0 and v20.17.0*

## npm run init - Why?
I created this script to simplify and speed up setup, but if your host disallow file writes and/or you can't use scripts, there's manual way:

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
5. Run ```npx prisma db push```. This will upload schemas to database so it can save data.
6. Init done!

## 🎥 Video Setup Guide (a lil old)

[![Youtube handler setup](https://img.youtube.com/vi/L6jpBGFcxu0/0.jpg)](https://www.youtube.com/watch?v=L6jpBGFcxu0)