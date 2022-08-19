import { VercelRequest, VercelResponse } from "@vercel/node";
import { IAppointmentDTO } from "../../interfaces/IAppointment";
import { AppointmentService } from "../../services/appointmentService";

async function handler(req: VercelRequest, res: VercelResponse) {
  const appointmentTableIsCreated =
    await AppointmentService.appointmentTableExists();

  if (!appointmentTableIsCreated)
    await AppointmentService.createAppointmentTable();

  const { method, body, query } = req;

  switch (method) {
    case "POST":
      const createdAppointment = await AppointmentService.create(body);

      res.json(createdAppointment);
      break;
    case "PUT":
      const updatedAppointment = await AppointmentService.update(
        body.oldData,
        body.newData
      );

      res.json(updatedAppointment);
      break;
    case "GET":
      if (query && query.AppointmentDate) {
        const data = await AppointmentService.getByDate(
          query.AppointmentDate as string
        );

        res.json(data);
      } else {
        const items = await AppointmentService.list();

        res.json(items?.Items || items);
      }

      break;
  }
}

export default handler;
