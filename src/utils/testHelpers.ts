import { build as buildApplication } from 'fastify-cli/helper';
import path from 'path';

const AppPath = path.join(__dirname, '..', 'app.js');

async function config() {
  return {};
}

// Automatically build and tear down our instance
async function build(t) {
  const argv = [AppPath];

  const app = await buildApplication(argv, config());

  t.teardown(app.close.bind(app));

  return app;
}

export { config, build };
