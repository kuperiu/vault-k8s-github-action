const core = require('@actions/core');

const setup = require('./lib/terraform');

(async () => {
  try {
    await setup();
  } catch (error) {
    core.setFailed(error.message);
  }
})();