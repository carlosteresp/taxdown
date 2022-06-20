import dynamoDBClient from "../model";
import CustomerServerice from "./customerService"

const customerService = new CustomerServerice(dynamoDBClient());

export default customerService;