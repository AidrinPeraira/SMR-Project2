import { OTPType } from "@smr/shared";

/**
 *
 * This function takes the otp type as the purpose of the email
 * and other data needed to return the correct subject and body
 * for the email service
 *
 * @param type The type of OTP Email
 * @param otp the OTP Number
 * @param userName The user to which the mail is to be snt
 * @returns subject and html for the email
 */
export const getEmailContent = (
  type: OTPType,
  otp: string,
  userName: string,
) => {
  const baseStyles = `font-family: sans-serif; line-height: 1.6; color: #333;`;
  const codeStyles = `font-size: 32px; font-weight: bold; color: #4F46E5; letter-spacing: 4px;`;

  const templates = {
    [OTPType.REGISTER]: {
      subject: "Welcome! Verify your email address",
      title: `Hi ${userName}, welcome to Share My Ride!`,
      body: "We're excited to have you. Please use the verification code below to complete your registration.",
    },
    [OTPType.FORGOT_PASSWORD]: {
      subject: "Password Reset Request",
      title: "Reset your password",
      body: "We received a request to reset your password. If you didn't make this request, you can safely ignore this email.",
    },
    [OTPType.CHANGE_EMAIL]: {
      subject: "Confirm your new email address",
      title: "Update your account email",
      body: "You requested to change your email address. Use the code below to confirm this change.",
    },
  };

  const { subject, title, body } = templates[type];

  const html = `
    <div style="${baseStyles} max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #111827;">${title}</h2>
      <p>${body}</p>
      <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 6px;">
        <span style="${codeStyles}">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #6b7280;">This code will expire in 2 minutes. For security, do not share this code with anyone.</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="font-size: 12px; color: #9ca3af;">Sent by Share My Ride. Safe travels!</p>
    </div>
  `;

  return { subject, html };
};

export const getDriverApplicationStatusEmailContent = (
  status: string,
  userName: string,
  comment?: string,
) => {
  const baseStyles = `font-family: sans-serif; line-height: 1.6; color: #333;`;

  const isApproved = status === "approved";
  const title = isApproved
    ? `Congratulations ${userName}! You are now a driver.`
    : `Update on your Driver Application`;

  const body = isApproved
    ? `We are pleased to inform you that your driver application has been approved. You can now start accepting rides.`
    : `We regret to inform you that your driver application has been rejected.`;

  const commentHtml =
    comment && !isApproved
      ? `<div style="margin-top: 20px; padding: 15px; background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 6px;">
        <strong>Admin Comment:</strong>
        <p style="margin-top: 5px; color: #991b1b;">${comment}</p>
      </div>`
      : "";

  const html = `
    <div style="${baseStyles} max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <h2 style="color: #111827;">${title}</h2>
      <p>${body}</p>
      ${commentHtml}
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="font-size: 12px; color: #9ca3af;">Sent by Share My Ride. Safe travels!</p>
    </div>
  `;

  const subject = isApproved
    ? "Driver Application Approved"
    : "Driver Application Status Update";

  return { subject, html };
};
