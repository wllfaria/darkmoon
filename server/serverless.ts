import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'DarkmoonCloud',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    info: {
      handler: 'src/handlers/info.getInfo',
      events: [
        {
          http: {
            method: 'get',
            path: 'info'
          }
        }
      ]
    },
    verifyToken: {
      handler: 'src/handlers/auth.checkAuthentication',
      events: [
        {
          http: {
            method: 'get',
            path: 'auth/verify'
          }
        }
      ]
    },
    authenticate: {
      handler: 'src/handlers/auth.authenticate',
      events: [
        {
          http: {
            method: 'post',
            path: 'auth/verify'
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
