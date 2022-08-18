import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({
  region: process.env.REGION || "sa-east-1",
});

export { ddbClient };
