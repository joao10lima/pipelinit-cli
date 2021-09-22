<p align="center">
  <a href="https://pipelinit.com">
    <img src="pipelinit-logo.png" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/pipelinit/pipelinit-cli/">
    <img src="https://img.shields.io/github/license/pipelinit/pipelinit-cli" />
  </a>
  <a href="https://github.com/pipelinit/pipelinit-cli/releases">
    <img src="https://img.shields.io/github/v/release/pipelinit/pipelinit-cli?sort=semver" alt="GitHub release (latest SemVer)">
  </a>
  <a href="https://twitter.com/pipelinit">
    <img src="https://img.shields.io/twitter/follow/pipelinit?style=social" alt="Twitter Follow">
  </a>
</p>

> Automatically create complete pipelines for your project

Say goodbye to YAML!

Pipelinit detects the stack of your project and automatically creates a fully
working pipeline configuration for multiple continous integration (CI) platforms
(currently supporting GitHub Actions).

Start by using the [Pipelinit Playgroud](https://pipelinit.com/playground) right
on your browser! 🚀

## How to install

### Using a Docker image

Run the command below inside a checkout of your project's source code:

```
docker run -it -v $(pwd):/app ghcr.io/pipelinit/pipelinit-cli
```

### Using package managers

Homebrew (macOS):

```
brew tap pipelinit/pipelinit-cli
brew install pipelinit/pipelinit-cli
```

Support for more package managers needed!

### Manual download

Download one of the executables from the
[Releases page](https://github.com/pipelinit/pipelinit-cli/releases) and add the
binary into your `PATH`.

We provide binaries for Linux, Windows and Mac.

## How to use

Just run `pipelinit` on the root of your project's source code and follow the
instructions:

```
pipelinit
```

### Examples

You can see the generated pipelines that ran, through our sample projects for
the following stacks:

- [Python Django](https://github.com/pipelinit/pipelinit-sample-python/pulls)
- [Docker](https://github.com/pipelinit/pipelinit-sample-docker/pulls)
- [Vue](https://github.com/pipelinit/pipelinit-sample-vue-html/pulls)
- [Java with Gradle](https://github.com/pipelinit/pipelinit-sample-java-gradle/pulls)

## Supported stacks overview

<table>
  <caption class="title">Pipelinit Support Matrix</caption>
  <colgroup>
    <col style="width: 33.3333%;">
    <col style="width: 33.3333%;">
    <col style="width: 33.3334%;">
  </colgroup>
  <thead>
    <tr>
      <th>Stack</th>
      <th>Stage</th>
      <th>GitHub Actions</th>
      <th>GitLab CI</th>
      <th>Travis CI</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">CSS</td>
      <td>Format</td>
      <td>✔️</td>
      <td rowspan="13">Coming soon</td>
      <td rowspan="13">Coming soon</td>
    </tr>
    <tr>
      <td>Lint</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td rowspan="2">HTML</td>
      <td>Format</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>Lint</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td rowspan="3">JavaScript / Typescript</td>
      <td>Format</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>Lint</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>Test</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td rowspan="3">Python</td>
      <td>Lint</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>Format</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>Test</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td rowspan="2">Docker</td>
      <td>Lint</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>Build</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>Java</td>
      <td>Build (Gradle)</td>
      <td>✔️</td>
    </tr>
  </tbody>
</table>

## Concepts

Pipelinit generates pipeline configuration based on these core concepts:

- Stacks
- CI Stage
- CI Platform

### Stacks

A _Stack_ is a set of technologies used by a project, such as programming
languages, frameworks, libraries, and tools. Pipelinit introspects a project
searching for technologies that a CI pipeline can check.

### CI Stage

A _Stage_ is a step in a CI pipeline that performs tasks with **similar goals**
independent from the _stack_. Each step can have multiple substeps. Pipelinit
generates standardized CI pipelines with well-defined _stages_. The tools that
each step uses change to fit the stack but serve the same purpose.

Every stage uses Free or Open Source software.

### CI Platform

A _CI Platform_ is a public SaaS or self-hosted solution that runs the CI
pipeline. Every platform has its capabilities, features, and configurations.
Pipelinit leverages the platform features and generates configuration files to
build a pipeline tuned for the chosen platform.

## How it works

When you run Pipelinit in the root of a software project:

1. It checks what kind of files exists there to detect the _stacks_.
2. It collects more detailed data about each _stack_.
3. It uses that data to build the CI configuration files.

### Stages

Which stages are present in the final CI pipeline depends on the identified
stacks and their support. You can check a complete reference of supported tools,
stacks, and which stages are available to each one further down in this
document.

Here is a list of available stages and what is the goal of each one:

#### Format

The format step checks if the code follows the format style from an automated
code formatter.

Formatters are valuable for most programming languages and text files because:

- It makes the code style looks the same regardless of the project
- It removes style discussions from code review
- It free developers from thinking about code style

#### Lint

The lint step uses static analysis tools to improve overall code quality. It
enforces some rules in the code base and can detect bugs before execution.

Linters are valuable for most programming languages and text files because:

- It helps to build more standardized codebases, which is easier to read and
  maintain
- It can prevent some bugs
- It helps to delete unused code
- It is a great tool to teach how to write better code

#### SAST

The SAST (Static application security testing) step uses static analysis tools
to improve overall code security. This step is distinct from the _Lint_ step
because of the security focus.

One issue with SAST tools is that they generate false positives. That's why the
default behavior for this step is to allow failure.

SAST tools are valuable for most applications and libraries because:

- It prevents vulnerabilities early
- It improves application reliability
- It is a great tool to teach how to write safer code

#### Test

The test step runs automated tests detected in the project.

The scope of this step isn't individual files but the application or library.
This stage may start extra services if the application or library requires it.

Any application or library, no matter how small the codebase or the team,
benefits from automated tests because:

- It prevents bugs from (re)appearing
- It helps to onboard new contributors
- It's required to refactor the codebase towards something better
- It documents how the software behaves

The benefits far outweigh the costs.

## Detailed stack support

In this section you can check details about what each stack supports.

When one of the supported tools can't be detected, pipelinit generates a
pipeline configuration with the tool marked as _default_. If your project
doesn't use one of those tools with custom configurations, the pipeline
generated uses _sensible defaults_ from the picked tools.

If this isn't desired, you can disable this with the flag `--no-default-stage`.

### CSS Support

#### Package Managers

- [npm](https://www.npmjs.com/) _default_
- [yarn](https://yarnpkg.com/)

#### Flavors

- CSS
- [Sass](https://sass-lang.com/)
- [Less](https://lesscss.org/)

#### Tools

| Stage  | Tools                                          |
| ------ | ---------------------------------------------- |
| Format | [Prettier](https://prettier.io/) (_default_)   |
| Lint   | [stylelint](https://stylelint.io/) (_default_) |

### HTML Support

#### Package Managers

- [npm](https://www.npmjs.com/) _default_
- [yarn](https://yarnpkg.com/)

#### Flavors

- HTML
- [Vue](https://v3.vuejs.org/guide/single-file-component.html)

#### Tools

| Stage  | Tools                                                                         |
| ------ | ----------------------------------------------------------------------------- |
| Format | [Prettier](https://prettier.io/) (_default_)                                  |
| Lint   | [ESLint](https://eslint.org/) (_default_), [stylelint](https://stylelint.io/) |

### JavaScript Support

#### Package Managers

- [npm](https://www.npmjs.com/) _default_
- [yarn](https://yarnpkg.com/)

#### Flavors

- JavaScript _default_
- [TypeScript](https://www.typescriptlang.org/)

#### Runtime

- [Node.js](https://nodejs.org/) _default_
- [Deno](https://deno.land/)

#### Tools

| Stage  | Tools                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------ |
| Format | [Prettier](https://prettier.io/) (_default_), [Deno](https://deno.land/manual@v1.13.1/tools/formatter) |
| Lint   | [ESLint](https://eslint.org/) (_default_), [Deno](https://deno.land/manual@v1.13.1/tools/linter)       |
| Test   | [Deno](https://deno.land/manual@v1.13.1/testing)                                                       |

### Python

#### Tools

| Stage  | Tools                                                      |
| ------ | ---------------------------------------------------------- |
| Lint   | [Flake8](https://flake8.pycqa.org/) _default_              |
| Format | [Black](https://black.readthedocs.io/en/stable/) _default_ |

## Developing and contributing

We love contributions and our [Contributing Guide](CONTRIBUTING.md) is the best
place to start!

### Building and installing from source code

- [Building the @pipelinit/core package](core/README.md)
- [Building the CLI executable](cli/README.md)
