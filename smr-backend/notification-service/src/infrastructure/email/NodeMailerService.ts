import { AppConfig } from "@/application.config.js";
import { IEmailService } from "@/application/interfaces/IEmailService.js";
import { getEmailContent } from "@/infrastructure/email/EmailTemplates.js";
import { logger, SendEmailOTPData } from "@smr/shared";
import nodemailer from "nodemailer";

export class NodemailerEmailService implements IEmailService {
  private _transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: AppConfig.NODEMAILER_EMAIL_USER,
        pass: AppConfig.NODEMAILER_EMAIL_PASS,
      },
    });
  }

  async sendOtpEmail(data: SendEmailOTPData): Promise<void> {
    const { email_id, otp, user_name, otp_type } = data;

    try {
      const { subject, html } = getEmailContent(otp_type, otp, user_name);

      await this._transporter.sendMail({
        from: `"Share My Ride" <${AppConfig.NODEMAILER_EMAIL_USER}>`,
        to: email_id,
        subject: subject,
        html: html,
      });

      logger.info(`[${otp_type}] email sent successfully to ${email_id}`);
    } catch (err) {
      logger.error(`Failed to send [${otp_type}] email to ${email_id}:`, err);
    }
  }
}
