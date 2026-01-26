import { DriverApplicationStatus } from "enums/DriverEnums.js";
import { DomainEvent } from "./DomainEvent";

export interface DriverApplicationActionData {
  email_id: string;
  user_name: string;
  application_id: string;
  application_status: DriverApplicationStatus;
  admin_comment: string;
}

export type DriverApplicationActionEvent =
  DomainEvent<DriverApplicationActionData>;
