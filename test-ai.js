// Smoke test: verifies prompts, skills, memory stores and the tool registry load
// without requiring network access or a Discord connection.
// Run with: npm test
import assert from "node:assert/strict";
import { getPrompts } from "./utils/prompts.js";
import { getAllSkills } from "./utils/skills.js";
import {
    add_note, get_note, delete_note,
    add_todo, get_todo, delete_todo,
    block_user, unblock_user, get_blocked,
} from "./utils/brain.js";
import { AnswerInterpreter } from "./utils/answerInterpreter.js";

const UNIQUE = `__smoke_${Date.now()}`;

async function main() {
    // Prompts load from prompts/*.md
    const p = getPrompts();
    assert.ok(p.sysprompt && p.sysprompt.includes("Discord agent system prompt"), "sysprompt.md should load");
    assert.ok(p.lang && p.lang.includes("execute_commands"), "lang.md should load");

    // Skills load from prompts/skills/*.md
    const skills = getAllSkills();
    assert.ok("server-creation" in skills, "server-creation skill should load");

    // Notes roundtrip (writes then cleans up inside brain/, which is gitignored)
    add_note(UNIQUE, "hello");
    assert.equal(get_note(UNIQUE), "hello");
    delete_note(UNIQUE);
    assert.equal(get_note(UNIQUE), null);

    // Todo roundtrip, including the no-content path that used to crash writeFileSync
    add_todo(UNIQUE, "");
    assert.equal(get_todo(UNIQUE), "");
    delete_todo(UNIQUE);
    add_todo(UNIQUE);
    assert.equal(get_todo(UNIQUE), "");
    delete_todo(UNIQUE);
    assert.equal(get_todo(UNIQUE), null);

    // Blocked users roundtrip
    block_user(UNIQUE, "smoke test");
    assert.ok(get_blocked().some((x) => (typeof x === "string" ? x : x.identifier) === UNIQUE), "block should register");
    unblock_user(UNIQUE);
    assert.ok(!get_blocked().some((x) => (typeof x === "string" ? x : x.identifier) === UNIQUE), "unblock should remove");

    // Tool registry: every exported function in utils/tools/* becomes a command
    const tools = await AnswerInterpreter.loadTools();
    for (const name of ["add_note", "get_note", "add_todo", "block", "kick", "send_msg", "end"]) {
        assert.equal(typeof tools[name], "function", `tool "${name}" should be registered`);
    }

    console.log("All smoke tests passed.");
}

main().catch((err) => {
    console.error("Smoke test failed:", err);
    process.exit(1);
});
