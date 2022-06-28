import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import customersService from '../../services'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
/*
const customer: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(customer);
*/


import { v4 } from "uuid";

export const getAllCustomers = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const customers = await customersService.getAllCustomers();
    return formatJSONResponse({
        customers
    })
})

export const createCustomer = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = v4();
        const customer = await customersService.createCustomer({
            customersId: id,
            name: event.body.name,
            lastname: event.body.lastname,
            creditAvailable: event.body.creditAvailable,
            createdAt: new Date().toISOString(),
            status: "0"
        })
        return formatJSONResponse({
            customer
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const getCustomer = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const customer = await customersService.getCustomer(id)
        return formatJSONResponse({
            customer, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const updateCustomer = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const customer = await customersService.updateCustomer(id, { 
            name: event.body.name,
            lastname: event.body.lastname,
            status: event.body.status 
        })
        return formatJSONResponse({
            customer, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const deleteCustomer = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const customer = await customersService.deleteCustomer(id)
        return formatJSONResponse({
            customer, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const addCredit = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const customer = await customersService.addCredit(id, { 
            creditAvailable: event.body.creditAvailable
        })
        return formatJSONResponse({
            customer, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const getAllCustomerByCredit = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const customers = await customersService.getAllCustomerByCredit();
    return formatJSONResponse({
        customers
    })
})