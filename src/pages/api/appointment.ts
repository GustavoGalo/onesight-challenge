import { VercelRequest, VercelResponse } from "@vercel/node";

import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../lib/ddbClient";

import { createAppointmentTable } from "../../bin/createTable";

export const listTables = async () => {
  try {
    const data = await ddbClient.send(new ListTablesCommand({}));

    if (!data?.TableNames?.includes("APPOINTMENT_TABLE")) {
      await createAppointmentTable();

      return await ddbClient.send(new ListTablesCommand({}));
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};

async function handler(req: VercelRequest, res: VercelResponse) {
  const data = await listTables();

  console.log(data);
  res.json(data?.TableNames);
}

export default handler;
