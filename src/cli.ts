import { Command, CommanderError } from "commander";
import { addInitCommand } from "./init/init-command";
import { addAuthCommand } from "./auth/auth-command";
import { packageVersion } from "./package-json-utils";

export async function cliAsync(argv: string[]): Promise<void> {
  try {
    console.log(); // Add a blank line before any CLI output for better readability
    const program = createProgram();
    await program.parseAsync(argv);
  } catch (error) {
    if (isCommanderError(error)) {
      process.exitCode = error.exitCode;
    } else {
      console.log("🚨 Unexpected error:", error);
      process.exitCode = 1;
    }
  }
}

function createProgram(): Command {
  const program = new Command();
  program
    .exitOverride()
    .name("vsts-npm-auth-improved")
    .description("Authenticates with Azure DevOps NPM registry.")
    .version(packageVersion, "-v, --version")
    .addHelpText(
      "after",
      `
Examples:
  $ vsts-npm-auth-improved
  $ vsts-npm-auth-improved init
  $ vsts-npm-auth-improved auth
  $ vsts-npm-auth-improved auth --config-path ~/.npmrc --force-refresh
  $ vsts-npm-auth-improved auth --config-path ~/.npmrc --write-token
`,
    );
  addInitCommand(program);
  addAuthCommand(program);
  return program;
}

function isCommanderError(error: unknown): error is CommanderError {
  return error instanceof CommanderError;
}
