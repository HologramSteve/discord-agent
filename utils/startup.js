// Startup validation: catches missing .env / missing keys BEFORE the bot
// crashes with a wall of dependency stack traces.
//
// A new user who forgets to create .env should see a clear checklist,
// not an OpenAIError from deep inside node_modules.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const REQUIRED_ENV = [
    {
        name: "DISCORD_TOKEN",
        hint: "Your bot token from the Discord Developer Portal (Application > Bot > Token).",
    },
    {
        name: "DEEPSEEK_API_KEY",
        hint: "Your DeepSeek API key from https://platform.deepseek.com.",
    },
];

export function validateEnv() {
    const problems = [];

    if (!fs.existsSync(path.join(PROJECT_ROOT, ".env"))) {
        problems.push(
            "Missing .env file. Create one by copying the template:\n" +
                "    copy .env.example .env   (Windows)\n" +
                "    cp .env.example .env     (macOS / Linux)\n" +
                "Then fill in the keys below and start again."
        );
    }

    for (const { name, hint } of REQUIRED_ENV) {
        const value = process.env[name];
        if (!value || value.trim() === "") {
            problems.push(`${name} is missing or empty. ${hint}`);
        }
    }

    if (problems.length > 0) {
        console.error("\n[discord-agent] Can't start - configuration is incomplete:\n");
        problems.forEach((problem, i) => console.error(`  ${i + 1}. ${problem}\n`));
        console.error("Fix the items above and run `npm start` again.\n");
        process.exit(1);
    }

    console.log("[discord-agent] Configuration OK. Starting bot...");
    return {
        discordToken: process.env.DISCORD_TOKEN,
        deepseekApiKey: process.env.DEEPSEEK_API_KEY,
    };
}
