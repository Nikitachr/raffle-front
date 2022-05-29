/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const ENV_VARS = {}

module.exports = {
  env: ENV_VARS,
  publicRuntimeConfig: ENV_VARS,
  poweredByHeader: false,
}
