
import { expect, MockInstance, vi } from "vitest";

type StdoutWriteFunction = typeof process.stdout.write;

export function mockStdoutWrite(): MockInstance<StdoutWriteFunction> {
  return vi.spyOn(process.stdout, "write").mockImplementation(() => true);
}

export function expectStdoutToMatchSnapshot(
  stdoutWriteFunctionMock: MockInstance<StdoutWriteFunction>,
): void {
  const commandOutput = normalizeStdout(stdoutWriteFunctionMock);
  expect(commandOutput).toMatchSnapshot();
}

export function normalizeStdout(stdoutWriteFunctionMock: MockInstance<StdoutWriteFunction>): string {
  const stringOutputs = stdoutWriteFunctionMock.mock.calls
    .map(args => args[0])
    .filter((output): output is string => typeof output === "string");
  if (stringOutputs.length === 0) {
    return "";
  }

  // Return the output as-is, just filtering empty lines
  const cliOnlyOutput = stringOutputs
    .flatMap(outputEntry => outputEntry.split("\n")) // a single output entry could contain multiple lines (e.g., "line1\nline2\nline3"). We need to split them first.
    .filter(outputEntry => outputEntry.trim() !== "")
    .join("\n");
  return "\n" + cliOnlyOutput;
}
