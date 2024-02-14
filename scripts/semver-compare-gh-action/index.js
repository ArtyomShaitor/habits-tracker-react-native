const semver = require("semver");
const core = require("@actions/core");

const { getInput, setOutput } = core;

let OUTPUT = {};

async function run() {
  try {
    const currentVersion = getInput("currentVersion");
    const latestVersion = getInput("latestVersion");

    if (!semver.valid(currentVersion)) {
      throw new Error(
        `Current version "${currentVersion}" is not valid semver version`,
      );
    }
    if (!semver.valid(latestVersion)) {
      throw new Error(
        `Latest version "${latestVersion}" is not valid semver version`,
      );
    }

    const matches = semver.eq(currentVersion, latestVersion);

    OUTPUT.matches = matches;

    const newer = semver.gt(currentVersion, latestVersion);
    OUTPUT.newer = newer;

    const diff = semver.diff(currentVersion, latestVersion);
    OUTPUT.diff = diff;

    Object.entries(OUTPUT).forEach(([name, value]) => {
      setOutput(name, value);
    });
  } catch (e) {
    console.error(e);
  }
}

(async function () {
  await run();
})();
