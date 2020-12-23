import fs from "fs";
import path from "path";
import Ajv from "ajv";
import fetch, { FetchError } from "node-fetch";
import chalk from "chalk";

const ajvErrors = require("ajv-errors");

let passedTests = 0;
let failedTests = 0;

const logTestResult = ({ passed, type, name, filePath }) => {
  if (passed) {
    console.log(
      `${chalk.green(type)} ${chalk.bold(name)} - ${chalk.blackBright(
        filePath.replace(process.cwd(), "")
      )}`
    );
  } else {
    console.log(
      `${chalk.red.bold(type)} ${chalk.bold(name)} - ${chalk.blackBright(
        filePath.replace(process.cwd(), "")
      )}`
    );
  }
};

const validateSchema = async ({ name, schema, hydrate }, filePath) => {
  const ajv = Ajv({ allErrors: true, jsonPointers: true });
  ajvErrors(ajv);

  try {
    const validate = ajv.compile(schema);

    if (hydrate) {
      const data = await fetch(hydrate.url, hydrate.options);
      const json = await data.json();
      const isContractValid = validate(json);

      if (isContractValid) {
        passedTests++;

        logTestResult({ passed: true, type: "Passed:", name, filePath });
      } else {
        failedTests++;

        logTestResult({ passed: false, type: "Failed:", name, filePath });

        validate.errors.forEach((error) => {
          console.log("----");
          console.log(`${chalk.red("Keyword:")} ${error.keyword}`);
          console.log(`${chalk.red("dataPath:")} ${error.dataPath}`);
          console.log(`${chalk.red("schemaPath:")} ${error.schemaPath}`);
          console.log(
            `${chalk.red("params:")} ${JSON.stringify(error.params)}`
          );
          console.log(`${chalk.red("message:")} ${error.message}`);
        });
      }
    }
  } catch (error) {
    failedTests++;

    if (error instanceof FetchError) {
      logTestResult({
        passed: false,
        type: "API call failed:",
        name,
        filePath,
      });
    } else {
      logTestResult({ passed: false, type: "Invalid schema:", name, filePath });
      console.log(error);
    }
  }
};

const allFilesSync = async (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isFile()) {
      const data = fs.readFileSync(filePath);
      const buckets = data.toString().match(/Bucket\(\s*([^)]+?)\s*\)/g);

      if (buckets) {
        for (const bucket of buckets) {
          const Bucket = async (bucketData) =>
            await validateSchema(bucketData, filePath);

          const AsyncFunction = Object.getPrototypeOf(async () => {})
            .constructor;
          await AsyncFunction("Bucket", `return await ${bucket}`)(Bucket);
        }
      }
    }

    if (fs.statSync(filePath).isDirectory()) {
      await allFilesSync(filePath);
    }
  }
};

const runContractTests = async ({ cmd }) => {
  const dir = `${process.cwd()}/${cmd.dir}`;

  console.log(chalk.bold("Running contract tests...\n========"));

  await allFilesSync(dir);

  console.log(
    chalk.bold(
      `========\n${chalk.green(`${passedTests} passed`)}, ${chalk.red(
        `${failedTests} failed`
      )}`
    )
  );
};
export { runContractTests };
