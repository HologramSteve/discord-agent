/*
easy gateway to get MD files from ../prompts
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getPrompts() {
    const promptsDir = path.join(__dirname, "..", "prompts");
    const promptFiles = fs.readdirSync(promptsDir).filter(file => file.endsWith(".md"));

    const prompts = {};
    for (const file of promptFiles) {
        const filePath = path.join(promptsDir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const promptName = path.basename(file, ".md");
        prompts[promptName] = content;
    }
    return prompts;
}
