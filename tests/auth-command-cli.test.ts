import { test, expect, afterEach, vi } from "vitest";
import { AuthCommand } from "@test-utils/auth-command";
import { expectStdoutToMatchSnapshot, mockStdoutWrite } from "@test-utils/stdout";

afterEach(() => {
  vi.clearAllMocks();
});

/**
 * Tests that the auth command displays help text with:
 *
 * vsts-npm-auth-improved auth --help
 * vsts-npm-auth-improved auth -h
 */
test.each([{ useOptionAlias: true }, { useOptionAlias: false }])(
  "auth command help text (useOptionAlias: $useOptionAlias)",
  async ({ useOptionAlias }) => {
    const stdoutWriteFunctionMock = mockStdoutWrite();

    await AuthCommand.invokeAsync({
      type: "help",
      useOptionAlias,
    });

    expectStdoutToMatchSnapshot(stdoutWriteFunctionMock);
  },
);
