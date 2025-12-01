import { Command } from "commander";

export function addInitCommand(program: Command): Command {
  return program
    .command("init", { isDefault: true })
    .description("Set up Azure DevOps NPM registry authentication (default command)")
    .action(handleInitCommand);
}

async function handleInitCommand(program: Command) {
  console.log("TODO: implement init command");
}
