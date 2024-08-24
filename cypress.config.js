import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import testomatioReporter from "@testomatio/reporter/lib/adapter/cypress-plugin/index.js";

async function setupNodeEvents(on, config) {
  on("file:preprocessor", vitePreprocessor());
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  await addCucumberPreprocessorPlugin(on, config);

  testomatioReporter(on, config);

  return config;
}

export default defineConfig({
  projectId: 'kvdswy',
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.**",
    },
  },
  reporter: "mocha-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
  viewportHeight: 700,
  viewportWidth: 1400,
  e2e: {
    experimentalStudio: true,
    specPattern: "cypress/e2e/features/*.feature",
    setupNodeEvents,
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
