const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
  baseExampleUrl: 'http://localhost:4300/#',
  video: false,
  viewportWidth: 1200,
  viewportHeight: 950,
  fixturesFolder: 'fixtures',
  projectId: 'hqnfoi',
  screenshotsFolder: 'screenshots',
  videosFolder: 'videos',
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'http://localhost:4300',
    specPattern: 'e2e/**/*.{js,ts}',
    supportFile: 'support/index.js',
    setupNodeEvents(on, config) {
      on("task", {
        updateListOfTests() {
          const UPDATE_TESTS_LIST_CY_JS = "000 update tests list.spec.js";
          const RUN_ALL_TESTS_CY_JS = "001 run all tests.spec.js";
          const PATHNAME_OF_RUN_ALL_TESTS_CY_JS =
            "./e2e/" + RUN_ALL_TESTS_CY_JS;

          const testsOnDisk = fs
            .readdirSync("./e2e/")
            .filter(filename => filename.endsWith(".cy.js"))
            .filter(
              filename =>
                ![UPDATE_TESTS_LIST_CY_JS, RUN_ALL_TESTS_CY_JS].includes(
                  filename
                )
            );
          const scriptImportingAllTests =
            `// This script was autogenerated by ${UPDATE_TESTS_LIST_CY_JS}\n` +
            testsOnDisk.map(test => `import "./${test}"`).join("\n");
          fs.writeFileSync(
            PATHNAME_OF_RUN_ALL_TESTS_CY_JS,
            scriptImportingAllTests
          );
          return true;
        },
      });
      return require('./plugins/index.js')(on, config);
    },
  },
})
