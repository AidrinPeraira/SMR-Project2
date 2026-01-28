"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImageAssets } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { registerAction, RegisterState } from "@/actions/auth/register-action";
import { SyntheticEvent, useActionState, useState } from "react";
import LoaderButton from "@/components/reusable/loader-button";
import {
  AppError,
  AppErrorCode,
  RegisterUserRequest,
  RegisterUserSchema,
  safeParseOrThrow,
  UserRoles,
} from "@smr/shared";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronLeft, Previous } from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { Form, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function SignupForm() {
  const registerForm = useForm<RegisterUserRequest>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email_id: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      user_role: UserRoles.PASSENGER,
      email_verified: false,
    },
  });

  function handleRegisterSubmit() {}
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
              className="p-6 md:p-8"
              noValidate
            >
              <Button asChild type="button" variant="ghost" size="icon">
                <Link href={"/"}>
                  <HugeiconsIcon icon={ChevronLeft} />
                  <span>Back</span>
                </Link>
              </Button>

              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your details below to create your account
                  </p>
                </div>

                {/* Name */}
                <FormField
                  control={registerForm.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-2 gap-4 relative">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                {/* Submit */}
                <Field>
                  <LoaderButton
                    title="Create Account"
                    isPending={false}
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
          </Form>

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
