import { IntrospectFn } from "../../introspection/mod.ts";

interface Node {
  name: "node";
}

interface Deno {
  name: "deno";
}

export type Runtime = Node | Deno;

// Search for an import statement from https://deno.land/ or usage from
// the runtime api, such as Deno.cwd(), in JavaScript and TypeScript files
const DENO_IMPORT = /import.*from ["']https:\/\/deno\.land/;
const DENO_RUNTIME = /Deno\..*/;

export const introspect: IntrospectFn<Runtime> = async (context) => {
  const { helpers } = context;

  for await (const file of helpers.files("**/*.[j|t]s")) {
    const fileReader = await Deno.open(file.path);
    for await (const line of helpers.readLines(fileReader)) {
      if (DENO_IMPORT.test(line) || DENO_RUNTIME.test(line)) {
        return {
          name: "deno",
        };
      }
    }
    fileReader.close();
  }

  return {
    name: "node",
  };
};
