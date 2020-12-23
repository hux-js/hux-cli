#!/usr/bin/env node
import { runContractTests } from "./contractTests";

const program = require("commander");

program
  .command("test")
  .description("Run API contract tests")
  .option("-d, --dir <dir>", "Run contract tests on this directory")
  .action((cmd) => {
    runContractTests({ cmd });
  });

program.parse(process.argv);
