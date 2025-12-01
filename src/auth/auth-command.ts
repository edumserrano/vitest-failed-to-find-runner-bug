import { Command } from "commander";

export function addAuthCommand(program: Command): Command {
  return program
    .command("auth")
    .description("Authenticate on Windows using vsts-npm-auth NPM package")
    .option("-c, --config-path <path>", "Path to the .npmrc config file")
    .option("--read", "Request a token with Packaging (Read) scope")
    .option("--no-read", "Request a token with Packaging (Read & Write)")
    .option("--force", "Force authentication token acquisition")
    .option("--no-force", "Do not force authentication token acquisition")
    .action(handleAuthCommandAsync);
}

type AuthCommandOptions = {
  readonly configPath?: string;
  readonly read?: boolean;
  readonly force?: boolean;
};

async function handleAuthCommandAsync(options: AuthCommandOptions, _: Command): Promise<void> {
  console.log("TODO: implement init command");
}
