# discord-agent

A Discord bot powered by a DeepSeek AI that lives in Discord. It uses `discord.js` for the bot connection, the OpenAI SDK against the DeepSeek API, and local markdown files under `prompts/` and `brain/` to shape behavior and store memory.

## What it does

- Replies to messages with an AI backend (DeepSeek).
- Supports a small command language for memory, todos, notes, moderation, and Discord actions.
- Stores memory data in the `brain/` folder.

## Quickstart

### Prerequisites

- Node.js 20 or newer (18.18+ also works; `npm run dev` needs 18.11+ for `--watch`).
- A Discord bot token and a DeepSeek API key.

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your `.env` file:

   ```bash
   copy .env.example .env   # Windows
   cp .env.example .env     # macOS / Linux
   ```

   Then fill in the two keys:

   ```env
   DISCORD_TOKEN=your_discord_bot_token
   DEEPSEEK_API_KEY=your_deepseek_api_key
   ```

   - `DISCORD_TOKEN`: from the [Discord Developer Portal](https://discord.com/developers/applications) > your application > Bot > Token.
   - `DEEPSEEK_API_KEY`: from [platform.deepseek.com](https://platform.deepseek.com).

3. In the Discord Developer Portal, enable the bot intents it needs:
   - **Message Content Intent** must be enabled, or the bot silently never sees messages.
   - The bot needs to be invited to the servers / DMs where you want it to reply.

4. Start the bot:

   ```bash
   npm start
   ```

   You should see `Configuration OK.` followed by `Ready! Logged in as ...`.

## Scripts

| Command       | What it does                                     |
| ------------- | ------------------------------------------------ |
| `npm start`   | Start the bot.                                   |
| `npm run dev` | Start with auto-restart on file changes.         |
| `npm test`    | Run the offline smoke test (no network needed).  |

## Troubleshooting

- **"Can't start - configuration is incomplete"** - your `.env` is missing or has missing keys. Follow the checklist printed by the bot: copy `.env.example` to `.env` and fill in both keys.
- **Bot starts but never replies** - the Message Content Intent is probably not enabled in the Developer Portal. Check Application > Bot > Privileged Gateway Intents.
- **Errors mentioning `api.deepseek.com`** - the DeepSeek key is wrong, out of credits, or the API is down. Verify the key in `.env`.
- **Bot can't see the server** - make sure you invited it with the right scopes (`bot`) and that the intents above are enabled.

## Notes

- The bot model is configured in `construct/client.js` (`MODEL`).
- Prompt text is loaded from the markdown files in `prompts/`.
- To change behavior, edit `prompts/sysprompt.md` and `prompts/lang.md`.
- Memory (notes, todos, blocked users, server context) is stored as plain files under `brain/` and is gitignored.

## Environment

| Variable           | Required | Description                                |
| ------------------ | -------- | ------------------------------------------ |
| `DISCORD_TOKEN`    | yes      | Discord bot token.                         |
| `DEEPSEEK_API_KEY` | yes      | API key for the DeepSeek OpenAI endpoint.  |
