import "dotenv/config";
import { validateEnv } from "./utils/startup.js";

// Validate configuration BEFORE the OpenAI/Discord clients are constructed,
// so a missing .env gives a helpful checklist instead of a dependency stack trace.
validateEnv();

const { discordClient, aiClient, discordToken } = await import("./construct/client.js");
const { handleMessage } = await import("./eventHandlers/message.js");
const { handleReady } = await import("./eventHandlers/ready.js");

discordClient.once("clientReady", handleReady);
discordClient.on("messageCreate", (msg) => handleMessage(msg, aiClient));

discordClient.login(discordToken);
