import {
  CreateTableCommand,
  ListTablesCommand,
  QueryCommand,
  ScanCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { ddbClient } from "../lib/ddbClient";
import { ddbDocClient } from "../lib/ddbDocClient";
import { AppointmentModel } from "../models/appointmentModel";
import { IAppointmentDTO } from "../interfaces/IAppointment";

export class AppointmentService {
  private constructor() {}

  private static _instance: AppointmentService;

  private static tableName = "APPOINTMENT_TABLE";

  public static async getInstance() {
    if (!AppointmentService._instance)
      AppointmentService._instance = new AppointmentService();

    return this._instance;
  }

  public static async appointmentTableExists() {
    const tables = await ddbClient.send(new ListTablesCommand({}));

    return tables.TableNames?.includes(this.tableName);
  }

  public static async createAppointmentTable() {
    try {
      const data = await ddbClient.send(
        new CreateTableCommand({
          TableName: this.tableName,
          ...AppointmentModel,
        })
      );
      console.log("[APPOINTMENT][LOG]: created appointment table");
      return data;
    } catch (err) {
      console.error("[APPOINTMENT][ERROR][on CREATE TABLE]: ", err);
    }
  }

  public static async create(appointment: IAppointmentDTO) {
    const params = { TableName: this.tableName, Item: appointment };

    try {
      const data = await ddbDocClient.send(new PutCommand(params));

      console.log("[APPOINTMENT][LOG]: appointment added or updated", data);
    } catch (err) {
      console.error("[APPOINTMENT][ERROR][on ADD ITEM]: ", err);
    }
  }

  public static async list() {
    const params = {
      TableName: this.tableName,
    };

    try {
      const data = await ddbDocClient.send(new ScanCommand(params));

      return data;
    } catch (err) {
      console.error("[APPOINTMENT][ERROR][on GET ITEM]: ", err);
    }
  }

  public static async getByDate(appointmentDate: string) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: "AppointmentDate = :s",
      ExpressionAttributeValues: {
        ":s": { S: appointmentDate },
      },
    };

    try {
      const data = await ddbDocClient.send(new QueryCommand(params));

      return data;
    } catch (err) {
      console.error("[APPOINTMENT][ERROR][on GET ITEM by DATE]: ", err);
    }
  }

  public static async update(
    appointmentToUpdate: IAppointmentDTO,
    appointmentNewData: IAppointmentDTO
  ) {
    const params = {
      TableName: this.tableName,
      Key: {
        primaryKey: { S: appointmentToUpdate.AppointmentDate },
        sortKey: { S: appointmentToUpdate.AppointmentTitle },
      },
      UpdateExpression: "SET AppointmentDate = :t, AppointmentTitle = :s",
      ExpressionAttributeValues: {
        ":t": { S: appointmentNewData.AppointmentDate },
        ":s": { S: appointmentNewData.AppointmentTitle },
      },
      ReturnValues: "ALL_NEW",
    };

    try {
      const data = await ddbClient.send(new UpdateItemCommand(params));

      return data;
    } catch (err) {
      console.error("[APPOINTMENT][ERROR][on UPDATE ITEM]: ", err);
    }
  }
}
