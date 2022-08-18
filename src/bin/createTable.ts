import { CreateTableCommand } from "@aws-sdk/client-dynamodb";

import { ddbClient } from "../lib/ddbClient";

// appointment columns
export const params = {
  TableName: "APPOINTMENT_TABLE",
  AttributeDefinitions: [
    {
      AttributeName: "AppointmentDate",
      AttributeType: "S",
    },
    {
      AttributeName: "Customer",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "AppointmentDate",
      KeyType: "HASH",
    },
    {
      AttributeName: "Customer",
      KeyType: "RANGE",
    },
  ],
  StreamSpecification: {
    StreamEnabled: false,
  },
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

export const createAppointmentTable = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Table Created", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
