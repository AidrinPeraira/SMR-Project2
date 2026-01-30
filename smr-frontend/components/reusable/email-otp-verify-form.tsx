"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";
import { OTPType } from "@smr/shared";
import { resendOTPAction } from "@/actions/otp/resend-otp-action";

interface ReusableOTPFormProps<T> extends React.ComponentProps<typeof Card> {
  email: string;
  otp_type: OTPType;
  onVerify: (otp: string) => Promise<T>;
  onSuccess: (data: T) => void;
  onResend?: () => Promise<void>;
  resendCooldown?: number; //seconds
}

export function OTPForm<T>({
  email,
  otp_type,
  onVerify,
  onSuccess,
  onResend,
  resendCooldown = 60,
  ...props
}: ReusableOTPFormProps<T>) {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(resendCooldown);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  //helper function to show time in correct format. min:sec
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = async () => {
    setError(null);
    const response = await resendOTPAction({
      email_id: email,
      otp_type,
    });

    if (response.success) {
      setTimeLeft(resendCooldown);
    } else {
      const errorMsg =
        typeof response.error === "string"
          ? response.error
          : response.error?.error_message ||
            response.message ||
            "Failed to resend OTP";
      setError(errorMsg);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;

    setError(null);
    startTransition(async () => {
      try {
        const result = await onVerify(otp);
        onSuccess(result);
      } catch (err: any) {
        setError(err.message || "Invalid verification code");
      }
    });
  };

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Enter verification code</CardTitle>
        <CardDescription>
          We sent a 6-digit code to <strong>{email}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>

              <div className="flex justify-center">
                <InputOTP
                  id="otp"
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  pattern="^\d+$"
                  disabled={isPending}
                >
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <p className="text-destructive text-sm text-center mt-2 font-medium">
                  {error}
                </p>
              )}

              <FieldDescription className="text-center mt-2">
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>

            <Button
              type="submit"
              className="w-full"
              disabled={isPending || otp.length < 6}
            >
              {isPending ? <Spinner className="mr-2" /> : null}
              Verify
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
              Didn&apos;t receive the code?{" "}
              {timeLeft === 0 ? (
                <button
                  type="button"
                  className="underline text-primary font-medium hover:text-primary/80 transition-colors"
                  onClick={handleResend}
                >
                  Resend
                </button>
              ) : (
                <span className="text-muted-foreground/60">
                  Resend in {formatTime(timeLeft)}
                </span>
              )}
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
