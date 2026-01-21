import { EventName } from "enums";

export interface DomainEvent<T = unknown> {
  event: EventName;
  data: T;
  timestamp: Date;
}
