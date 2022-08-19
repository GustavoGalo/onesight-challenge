export const AppointmentModel = {
  AttributeDefinitions: [
    {
      AttributeName: "AppointmentDate",
      AttributeType: "S",
    },
    {
      AttributeName: "AppointmentTitle",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "AppointmentDate",
      KeyType: "HASH",
    },
    {
      AttributeName: "AppointmentTitle",
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
