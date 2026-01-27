"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImageAssets } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { registerAction, RegisterState } from "@/actions/auth/register-action";
import { useActionState, useState } from "react";
import LoaderButton from "@/components/reusable/loader-button";
import { RegisterUserSchema, safeParseOrThrow, UserRoles } from "@smr/shared";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errors, setErrors] = useState({
    first_name: "a",
    last_name: "",
    email_id: "",
    confirm_password: "",
    password: "",
    phone_number: "",
  });
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    confirm_password: "",
    password: "",
    phone_number: "",
  });
  const [pending, isPending] = useState(false);

  function handleRegisterSubmit(formData: FormData) {
    try {
      const data = {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email_id: formData.get("email_id"),
        confirm_password: formData.get("confirm_password"),
        password: formData.get("password"),
        phone_number: formData.get("phone_number"),
        user_role: UserRoles.PASSENGER,
        email_verified: false,
      };
      const validatedData = safeParseOrThrow(RegisterUserSchema, data);
    } catch (error: unknown) {
      console.log(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={handleRegisterSubmit} className="p-6 md:p-8" noValidate>
            <Button type="button" variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Back</span>
            </Button>

            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>

              {/* Name */}
              <Field>
                <Field className="grid grid-cols-2 gap-4 relative">
                  <Field>
                    <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                    <Input id="first_name" type="text" name="first_name" />
                    {errors.first_name && (
                      <FieldDescription className="absolute left-0 bottom-0 text-destructive">
                        {errors.first_name}
                      </FieldDescription>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                    <Input id="last_name" type="text" name="last_name" />
                    {errors.last_name && (
                      <FieldDescription className=" text-destructive">
                        {errors.last_name}
                      </FieldDescription>
                    )}
                  </Field>
                </Field>
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email_id"
                  placeholder="m@example.com"
                />
                {errors.email_id && (
                  <FieldDescription className=" text-destructive">
                    {errors.email_id}
                  </FieldDescription>
                )}
              </Field>

              {/* Phone */}
              <Field>
                <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="9876543210"
                />
                {errors.phone_number && (
                  <FieldDescription className=" text-destructive">
                    {errors.phone_number}
                  </FieldDescription>
                )}
              </Field>

              {/* Password */}
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" name="password" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm_password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm_password"
                      type="password"
                      name="confirm_password"
                    />
                  </Field>
                </Field>
                {(errors.password || errors.confirm_password) && (
                  <FieldDescription className=" text-destructive">
                    {errors.password || errors.confirm_password}
                  </FieldDescription>
                )}
              </Field>

              {/* Submit */}
              <Field>
                <LoaderButton
                  title="Create Account"
                  isPending={pending}
                  type="submit"
                />
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                <span className="bg-card">Or continue with</span>
              </FieldSeparator>

              {/* Social placeholder */}
              <Field className="flex justify-center">
                <Button variant="outline" disabled>
                  Google
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href="/login" replace>
                  Log in
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src={ImageAssets.SignUpPageImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6]"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a>Terms of Service</a> and{" "}
        <a>Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
