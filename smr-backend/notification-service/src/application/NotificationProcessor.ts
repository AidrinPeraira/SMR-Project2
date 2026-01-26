import { IEmailService } from "@/application/interfaces/IEmailService.js";
import { INotificationProcessor } from "@/application/interfaces/INotificationProcessor.js";
import { DomainEvent, EventName, SendEmailOTPEvent } from "@smr/shared";

/**
 * Router to handle differnt types of events
 */
export class NotificationProcessor implements INotificationProcessor {
  constructor(private _emailService: IEmailService) {}

  /**
   * This function handles the evnet.
   * Based on the type of event the action is done.
   * Calls the correct service
   *
   * @param event event from message queue
   */
  async process(event: DomainEvent): Promise<void> {
    switch (event.event) {
      // email verification otp
      case EventName.SEND_EMAIL_OTP:
        const typedEvent = event as SendEmailOTPEvent;
        await this._emailService.sendOtpEmail(typedEvent.data);
        break;

      //driver application status
      case EventName.DRIVER_APPLICATION_APPROVED:
      case EventName.DRIVER_APPLICATION_REJECTED:
        const driverEvent = event as any;
        await this._emailService.sendDriverApplicationStatusEmail(
          driverEvent.data,
        );
        break;

      //unhandled events
      default:
        break;
    }
  }
}
