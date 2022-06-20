import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const getAllCustomer = {
  handler: `${handlerPath(__dirname)}/handler.getAllCustomers`,
  events: [
      {
          http: {
              method: 'get',
              path: 'customer/',
              request: {
                schemas: {
                  'application/json': schema,
                },
              },
          },
      },
  ],
};

export const createCustomer = {
  handler: `${handlerPath(__dirname)}/handler.createCustomer`,
  events: [
      {
          http: {
              method: 'post',
              path: 'customer',
              request: {
                schemas: {
                  'application/json': schema,
                },
              },
          },
      },
  ],
};

export const getCustomer = {
  handler: `${handlerPath(__dirname)}/handler.getCustomer`,
  events: [
      {
          http: {
              method: 'get',
              path: 'customer/{id}',
              request: {
                schemas: {
                  'application/json': schema,
                },
              },
          },
      },
  ],
};

export const updateCustomer = {
  handler: `${handlerPath(__dirname)}/handler.updateCustomer`,
  events: [
      {
          http: {
              method: 'put',
              path: 'customer/{id}',
              request: {
                schemas: {
                  'application/json': schema,
                },
              },
          },
      },
  ],
};

export const deleteCustomer = {
  handler: `${handlerPath(__dirname)}/handler.deleteCustomer`,
  events: [
      {
          http: {
              method: 'delete',
              path: 'customer/{id}',
              request: {
                schemas: {
                  'application/json': schema,
                },
              },
          },
      },
  ],
};
