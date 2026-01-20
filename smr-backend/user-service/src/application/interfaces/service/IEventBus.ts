import { DomainEvent } from "@smr/shared";

export interface IEventBus {
  /**
   * Publishes a domain event to the message broker.
   * It take a general event type (can swap broker if needed)
   */
  publish(event: DomainEvent): Promise<void>;
}

/**
 * ---Quick Reminder Note----
 * Event bus is somthing which carries an event to a broker.
 * a bus transporting a person
 */
