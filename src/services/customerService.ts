import { DocumentClient } from "aws-sdk/clients/dynamodb";

import Customer from "../model/Customer";

export default class CustomerServerice {

    private Tablename: string = "CustomersTable";

    constructor(private docClient: DocumentClient) { }

    async getAllCustomers(): Promise<Customer[]> {
        const customers = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()
        return customers.Items as Customer[];

    }

    async createCustomer(customer: Customer): Promise<Customer> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: customer
        }).promise()
        return customer as Customer;

    }

    async getCustomer(id: string): Promise<any> {

        const customer = await this.docClient.get({
            TableName: this.Tablename,
            Key: {
                customersId: id
            }
        }).promise()
        if (!customer.Item) {
            throw new Error("Id does not exit");
        }
        return customer.Item as Customer;

    }

    async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
        const updated = await this.docClient
            .update({
                TableName: this.Tablename,
                Key: { customersId: id },
                UpdateExpression:
                    "set #status = :status, #name = :name, #lastname = :lastname",
                ExpressionAttributeNames: {
                    "#status": "status",
                    "#name": "name",
                    "#lastname": "lastname",
                },
                ExpressionAttributeValues: {
                    ":status": customer.status,
                    ":name": customer.name,
                    ":lastname": customer.lastname,
                },
                ReturnValues: "ALL_NEW",
            })
            .promise();

        return updated.Attributes as Customer;
    }

    async deleteCustomer(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: this.Tablename,
            Key: {
                customersId: id
            }
        }).promise()

    }

    async addCredit(id: string, customer: Partial<Customer>): Promise<Customer> {
        const updated = await this.docClient
            .update({
                TableName: this.Tablename,
                Key: { customersId: id },
                UpdateExpression:
                    "set #creditAvailable = :creditAvailable",
                ExpressionAttributeNames: {
                    "#creditAvailable": "creditAvailable",
                },
                ExpressionAttributeValues: {
                    ":creditAvailable": customer.creditAvailable||77,
                },
                ReturnValues: "ALL_NEW",
            })
            .promise();

        return updated.Attributes as Customer;
    }
}