This will be used as handler for bot Erry in discord

# Quick info
  1. Uses TS language
  2. Uses latest dependencies versions
  3. Uses `discord-hybrid-sharding` and `discord-cross-hosting` to cluster and shard
  4. Uses `prisma` database wrapper for PostgreSQL database
  5. Built-in database, redis cache, cross-hosting and sharding
  6. Easy to use with pre-generated commands (npm run ...)

# Video Setup
  [![Youtube handler setup](https://img.youtube.com/vi/sNgils10YMw/0.jpg)](https://www.youtube.com/watch?v=sNgils10YMw)

# How to setup
  1. Download code
  2. rename `config/config_sample.ts` to `config/config.ts`
  3. fill config (Yes, there is much data needed, but some of that not required to start or you can left default value)
  4. run `npm run init` and wait
  5. While you'll see `SETUP IS DONE` in console - you're good to start bot. Use `npm run start` for starting bot, `npm run bridge_start` to start bridge. Other commands see in `package.json`
  6. OMG IT'S ONLINE!!

# Credits
  [Tomato6966/discord-js-v14-handler](https://github.com/Tomato6966/discord-js-v14-handler) - Inspired by code structure. Also few functions was copied and modified from here
