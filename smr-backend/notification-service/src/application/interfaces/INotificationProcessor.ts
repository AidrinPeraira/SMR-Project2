import { DomainEvent } from "@smr/shared";

export interface INotificationProcessor {
  process(event: DomainEvent): Promise<void>;
}
