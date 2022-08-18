import {
  DynamoDBClient,
  BatchExecuteStatementCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: process.env.REGION });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  GET: (itemId?: string) => {},
};

async function fetchAppointmentById(id: string) {
  const input = new GetItemCommand({
    TableName: "appointment",
    Key: {
      // appointmentId: id
    },
  });

  const output = await client.send(input);
}
