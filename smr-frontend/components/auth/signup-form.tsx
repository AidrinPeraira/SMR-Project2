"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  RegisterUserSchema,
  safeParseOrThrow,
  UserRoles,
} from "@smr/shared";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronLeft, Previous } from "@hugeicons/core-free-icons";
import { toast } from "sonner";

const initialState: RegisterState = {
  data: {
    first_name: "",
    last_name: "",
    email_id: "",
    confirm_password: "",
    password: "",
    phone_number: "",
    user_role: UserRoles.PASSENGER,
    email_verified: false,
  },
  success: false,
  message: "",
  eroors: {
    first_name: "",
    last_name: "",
    email_id: "",
    confirm_password: "",
    password: "",
    phone_number: "",
  },
};

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [registerState, setRegisterState] =
    useState<RegisterState>(initialState);
  const [pending, setPending] = useState<boolean>(false);

  async function handleRegisterSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    e.stopPropagation();
    try {
      setPending(true);
      setRegisterState((prev) => {
        return {
          ...prev,
          errors: {
            first_name: "",
            last_name: "",
            email_id: "",
            confirm_password: "",
            password: "",
            phone_number: "",
          },
        };
      });
      console.log("Data for regiter: ", registerState.data);
      const validatedData = safeParseOrThrow(
        RegisterUserSchema,
        registerState.data,
      );
      console.log("Validated Data");
    } catch (error: unknown) {
      if (error instanceof AppError) {
        console.log(
          "Handle Register Submit App Error: ",
          error.message,
          error.details,
        );

        if (error.code == AppErrorCode.VALIDATION_FAILED) {
          let issues = error.details;

          for (let issue of issues) {
            if (issue.field && issue.message) {
              setRegisterState((prev) => {
                return {
                  ...prev,
                  eroors: {
                    ...prev.eroors,
                    [issue.field]: issue.message,
                  },
                };
              });
            }
          }

          toast.error(error.message, {
            description: "Please check the information you have entered.",
          });
        } else {
          toast.error("Something went wrong!", {
            description: error.message,
          });
        }
      } else if (error instanceof Error) {
        console.log("Handle Register Error: ", error.message);
        toast.error("Something went wrong!", {
          description: error.message || "Please try again later",
        });
      } else {
        console.log("Handle Register Error: ", error);
        toast.error("Something went wrong!", {
          description: "Please try again later",
        });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={(e) => handleRegisterSubmit(e)}
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
              <Field>
                <Field className="grid grid-cols-2 gap-4 relative">
                  <Field>
                    <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                    <Input
                      id="first_name"
                      type="text"
                      name="first_name"
                      value={registerState.data.first_name}
                      onChange={(e) => {
                        setRegisterState((prev) => {
                          return {
                            ...prev,
                            data: { ...prev.data, first_name: e.target.value },
                          };
                        });
                      }}
                    />
                    {registerState.eroors.first_name && (
                      <FieldError>{registerState.eroors.first_name}</FieldError>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                    <Input
                      id="last_name"
                      type="text"
                      name="last_name"
                      value={registerState.data.last_name}
                      onChange={(e) => {
                        setRegisterState((prev) => {
                          return {
                            ...prev,
                            data: { ...prev.data, last_name: e.target.value },
                          };
                        });
                      }}
                    />
                    {registerState.eroors.last_name && (
                      <FieldError>{registerState.eroors.last_name}</FieldError>
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
                  value={registerState.data.email_id}
                  onChange={(e) => {
                    setRegisterState((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, email_id: e.target.value },
                      };
                    });
                  }}
                />
                {registerState.eroors.email_id && (
                  <FieldError>{registerState.eroors.email_id}</FieldError>
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
                  value={registerState.data.phone_number}
                  onChange={(e) => {
                    setRegisterState((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, phone_number: e.target.value },
                      };
                    });
                  }}
                />
                {registerState.eroors.phone_number && (
                  <FieldError>{registerState.eroors.phone_number}</FieldError>
                )}
              </Field>

              {/* Password */}
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      onChange={(e) => {
                        setRegisterState((prev) => {
                          return {
                            ...prev,
                            data: { ...prev.data, password: e.target.value },
                          };
                        });
                      }}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm_password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm_password"
                      type="password"
                      name="confirm_password"
                      onChange={(e) => {
                        setRegisterState((prev) => {
                          return {
                            ...prev,
                            data: {
                              ...prev.data,
                              confirm_password: e.target.value,
                            },
                          };
                        });
                      }}
                      onBlur={() => {
                        if (
                          registerState.data.password !==
                          registerState.data.confirm_password
                        ) {
                          setRegisterState((prev) => {
                            return {
                              ...prev,
                              data: {
                                ...prev.data,
                                confirm_password: "Passwords do not match",
                              },
                            };
                          });
                        } else {
                          setRegisterState((prev) => {
                            return {
                              ...prev,
                              data: {
                                ...prev.data,
                                confirm_password: "",
                              },
                            };
                          });
                        }
                      }}
                    />
                  </Field>
                </Field>
                {(registerState.eroors.password ||
                  registerState.eroors.confirm_password) && (
                  <FieldError>
                    {registerState.eroors.password ||
                      registerState.eroors.confirm_password}
                  </FieldError>
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
