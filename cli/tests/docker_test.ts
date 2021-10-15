import { assertEquals, assertStringIncludes } from "../deps.ts";
import {
  assertExpectedFiles,
  cleanGitHubFiles,
  output,
  test,
} from "./helpers.ts";

const releaseWarn = `
Creating a release Pipelinit. Make sure to create the following secrets generated on the workflow:
  REGISTRY_USERNAME -> Registry username
  REGISTRY_PASSWORD -> Registry password
  REGISTRY_ORGANIZATION -> Registry project organization
`;

test(
  { fixture: "docker/release-docker", args: [] },
  async (proc) => {
    const [stdout, _stderr, { code }] = await output(proc);
    assertStringIncludes(stdout, "Detected stack: docker, javascript");
    assertStringIncludes(stdout, "Found docker image on root");
    assertStringIncludes(stdout, "No JavaScript linter detected, using ESLint");
    assertStringIncludes(stdout, releaseWarn);
    assertStringIncludes(
      stdout,
      "No JavaScript linter detected, using ESLint",
    );
    assertStringIncludes(
      stdout,
      "No JavaScript formatter detected, using Prettier",
    );
    assertEquals(code, 0);
    await assertExpectedFiles("docker/release-docker");
    await cleanGitHubFiles("docker/release-docker");
  },
);

test(
  { fixture: "docker/release-github", args: [] },
  async (proc) => {
    const [stdout, _stderr, { code }] = await output(proc);
    assertStringIncludes(stdout, "Detected stack: docker, javascript");
    assertStringIncludes(stdout, "Found docker image on root");
    assertStringIncludes(stdout, "No JavaScript linter detected, using ESLint");
    assertStringIncludes(stdout, releaseWarn);
    assertStringIncludes(
      stdout,
      "No JavaScript linter detected, using ESLint",
    );
    assertStringIncludes(
      stdout,
      "No JavaScript formatter detected, using Prettier",
    );
    assertEquals(code, 0);
    await assertExpectedFiles("docker/release-github");
    await cleanGitHubFiles("docker/release-github");
  },
);
