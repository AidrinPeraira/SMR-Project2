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
import LoaderButton from "@/components/reusable/loader-button";
import {
  RegisterUserRequest,
  RegisterUserSchema,
  UserRoles,
} from "@smr/shared";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronLeft, Previous } from "@hugeicons/core-free-icons";
import { Controller, Form, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { use, useState } from "react";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [pending, setPending] = useState<boolean>(false);

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

  /**
   * How does React Hook Form Work
   *
   * The useForm hook return somme methods.
   * most of these methods work by returning some props based on the input given
   * These porps injected into the component gives us controll
   *
   *  1. register("fieldName", {vlidation options as key value pairs})
   *      : to control that input field. and track and validate the data using the hook
   *  2. handleSubmit((data)=>{}) : this function is given in the onsubmit
   *  3. formState : ??
   */
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

  async function handleRegisterSubmit(data: RegisterUserRequest) {
    try {
      console.log("Register form data submitted: ", data);
    } catch (error: unknown) {
      console.log("Error handling register form: ", error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            id="register-form"
            className="p-6 md:p-8"
            onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
          >
            <Button type="button" variant="ghost" size="icon">
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
              <Field>
                <Field className="grid grid-cols-2 gap-4 relative">
                  {/* first name */}
                  <Controller
                    name="first_name"
                    control={registerForm.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Field>
                          <FieldLabel htmlFor="first_name">
                            First Name
                          </FieldLabel>
                          <Input {...field} />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  {/* last name */}
                  <Controller
                    name="last_name"
                    control={registerForm.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Field>
                          <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                          <Input {...field} />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </Field>
              </Field>

              {/* Email */}
              <Field>
                <Controller
                  name="email_id"
                  control={registerForm.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor="email_id">Email ID</FieldLabel>
                        <Input {...field} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </Field>

              {/* Phone */}
              <Field>
                <Controller
                  name="phone_number"
                  control={registerForm.control}
                  render={({ field, fieldState }) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor="phone_number">
                          Phone Number
                        </FieldLabel>
                        <Input {...field} />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    );
                  }}
                />
              </Field>

              {/* Password */}
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  {/* password */}
                  <Controller
                    name="password"
                    control={registerForm.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Field>
                          <FieldLabel htmlFor="password">Password</FieldLabel>
                          <Input {...field} type="password" />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  {/* confirm password */}
                  <Field>
                    <Controller
                      name="confirm_password"
                      control={registerForm.control}
                      render={({ field, fieldState }) => {
                        return (
                          <Field>
                            <FieldLabel htmlFor="confirm_password">
                              Confirm Password
                            </FieldLabel>
                            <Input {...field} type="password" />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        );
                      }}
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
