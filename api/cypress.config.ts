import { defineConfig } from "cypress";
import { assetsFolder, baseUrl, defaultWatingTime } from "./cypress/support/constants/constants";


export default defineConfig({
  e2e: {
    specPattern: "api/cypress/api/**/*.cy.ts",
    baseUrl,
    defaultCommandTimeout: defaultWatingTime,
    supportFile: "api/cypress/support/index.ts",
    videosFolder: `${assetsFolder}/videos`,
    downloadsFolder: `${assetsFolder}/downloads`,
    screenshotsFolder: `${assetsFolder}/screenshots`
  },
});
