import { cliAsync } from "@vsts-npm-auth-improved";

class VstsNpmAuthImprovedCli {
  static async invokeAsync(argv: string[]): Promise<void> {
    // The first two arguments are normally "node" and the script name/bin executable.
    // For testing purposes they can be anything, Commander doesn't validate them.
    const args = ["node", "main.js", ...argv];
    await cliAsync(args);
  }
}

type AuthCommandOptions = AuthOptions | HelpOptions | VersionOptions;

type FromCli<T> = { from: "cli"; value: T; useOptionAlias?: boolean };
type FromPrompt = { from: "prompt" };

type AuthOptions = {
  type: "auth";
  configPath: FromCli<string> | FromPrompt;
  read: FromCli<boolean> | FromPrompt;
  force: FromCli<boolean> | FromPrompt;
};

type HelpOptions = {
  type: "help";
  useOptionAlias?: boolean;
};

type VersionOptions = {
  type: "version";
  useOptionAlias?: boolean;
};

export class AuthCommand {
  static async invokeAsync(options: AuthCommandOptions): Promise<void> {
    const args = ["auth"];

    switch (options.type) {
      case "auth": {
        if (options.configPath.from === "cli") {
          args.push(
            options.configPath.useOptionAlias ? "-c" : "--config-path",
            options.configPath.value,
          );
        }

        if (options.read.from === "cli") {
          args.push(options.read.value ? "--read" : "--no-read");
        }

        if (options.force.from === "cli") {
          args.push(options.force.value ? "--force" : "--no-force");
        }

        break;
      }
      case "help": {
        args.push(options.useOptionAlias ? "-h" : "--help");
        break;
      }
      case "version": {
        args.push(options.useOptionAlias ? "-v" : "--version");
        break;
      }
      default: {
        const never: never = options;
        throw new Error(`Unhandled options type: ${JSON.stringify(never)}`);
      }
    }

    await VstsNpmAuthImprovedCli.invokeAsync(args);
  }
}
