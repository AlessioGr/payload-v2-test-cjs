import { buildConfig } from '@alessiogr/payloadtest/config';
import { resolve } from 'path';
import Users from './collections/Users';
import { adapter } from './adapter.js';



export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    webpack(config) {

      config.resolve.fallback = {
        ...config.resolve.fallback,
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        /*'/Users/alessio/Documents/GitHub/payload-v2-test/node_modules/@alessiogr/payloadtestdb-mongodb/dist/index.js': '/Users/alessio/Documents/GitHub/payload-v2-test/node_modules/@alessiogr/payloadtestdb-mongodb/dist/cjs/mock.js',*/
        [resolve(__dirname, './adapter.js')]: resolve(__dirname, './mock.js'),
        "/Users/alessio/Documents/GitHub/payload-v2-test-cjs/node_modules/@alessiogr/payloadtest/dist/esm/bundlers/webpack/bundler.ts": "/Users/alessio/Documents/GitHub/payload-v2-test-cjs/node_modules/@alessiogr/payloadtest/dist/esm/bundlers/mocks/emptyModule.js",
        "/Users/alessio/Documents/GitHub/payload-v2-test-cjs/node_modules/@alessiogr/payloadtest/dist/esm/bundlers/webpack/bundler.js": "/Users/alessio/Documents/GitHub/payload-v2-test-cjs/node_modules/@alessiogr/payloadtest/dist/esm/bundlers/mocks/emptyModule.js",
      }

      console.log('Webpack config resolve:', JSON.stringify(config.resolve, null, 2));

      return config;
    },
  },
  db: adapter,
  collections: [
    Users,
  ],
  typescript: {
    outputFile: resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
  ]
});
