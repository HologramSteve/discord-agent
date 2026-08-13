// Generic markdown file store shared by notes and todos.
import fs from "fs";
import path from "path";
import { io } from "./helpers.js";

export function createMdStore(dir) {
    const withExt = (name) => (name.endsWith(".md") ? name : `${name}.md`);

    return {
        // content defaults to "" so a missing content arg never crashes writeFileSync
        add(name, content = "") {
            const filePath = path.join(dir, withExt(name));
            io.write(filePath, content);
            return filePath;
        },
        get(name) {
            return io.read(path.join(dir, withExt(name)));
        },
        list() {
            if (!fs.existsSync(dir)) return [];
            return fs.readdirSync(dir)
                .filter((f) => f.endsWith(".md"))
                .map((f) => ({ name: f, content: io.read(path.join(dir, f)) }));
        },
        remove(name) {
            const filePath = path.join(dir, withExt(name));
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        },
        clear() {
            if (!fs.existsSync(dir)) return;
            fs.readdirSync(dir).forEach((f) => fs.unlinkSync(path.join(dir, f)));
        },
    };
}
