import { assertEquals, assertExists } from "../../../../deps.ts";

import plugin from "./python.ts";

interface FileEntry {
  path: string;
  name: string;
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
}

Deno.test("Template > GitHub > Lint Python - project with Python file", async () => {
  async function* filesFixture(): AsyncIterableIterator<FileEntry> {
    for (let i = 0; i < 1; i++) {
      yield {
        name: "foo.py",
        path: "./src/foo.py",
        isFile: true,
        isSymlink: false,
        isDirectory: false,
      };
    }
  }

  const output = await plugin.process(filesFixture());
  assertExists(output);
});

Deno.test("Template > GitHub > Lint Python - project without Python", async () => {
  // deno-lint-ignore require-yield
  async function* projectWithoutPython(): AsyncIterableIterator<FileEntry> {
    return;
  }

  const output = await plugin.process(projectWithoutPython());
  assertEquals(output, null);
});
