import type { AWS } from '@serverless/typescript';

import {getAllCustomer, createCustomer, getCustomer, updateCustomer, deleteCustomer, addCredit } from '@functions/customer';

const serverlessConfiguration: AWS = {
  service: 'taxdown',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:us-east-1:*:table/CustomersTable",
        }],
      },

    },
  },
  // import the function via paths
  functions: { getAllCustomer, createCustomer, getCustomer, updateCustomer, deleteCustomer, addCredit },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start:{
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      CustomersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "CustomersTable",
          AttributeDefinitions: [{
            AttributeName: "customersId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "customersId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
          
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
