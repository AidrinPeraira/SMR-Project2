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
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronLeft } from "@hugeicons/core-free-icons";
import { LoginUserRequest, LoginUserSchema, UserRoles } from "@smr/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import LoaderButton from "@/components/reusable/loader-button";
import { useState } from "react";
import { loginAction } from "@/actions/auth/login-action";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import useUserStore from "@/store/user-store";
import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/lib/axios-error-handler";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [pending, setPending] = useState<boolean>(false);
  const { setAccessToken } = useAuthStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  const loginForm = useForm<LoginUserRequest>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email_id: "",
      password: "",
    },
  });

  async function handleLoginSubmit(data: LoginUserRequest) {
    try {
      console.log("Login Data: ", data);

      const result = await loginAction(data);

      if (result.success) {
        toast.success("Login Successful", { description: result.message });
        setAccessToken(result.data.access_token);
        setUser(result.data.user);

        if (result.data.user.user_role === UserRoles.PASSENGER) {
          router.push("/passenger");
        } else if (result.data.user.user_role === UserRoles.DRIVER) {
          router.push("/driver");
        }

        return result.data;
      } else {
        toast.error("User Login Error!", {
          description: result.message || "Failed to login",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("User Login Error!", {
          description: error?.message,
        });
      } else {
        toast.error("User Login Error!", {
          description: "Failed to login",
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
            className="p-6 md:p-8"
            onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
          >
            <Button asChild type="button" variant="ghost" size="icon">
              <Link href="/">
                <HugeiconsIcon icon={ChevronLeft} />
                <span>Back</span>
              </Link>
            </Button>

            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Acme Inc account
                </p>
              </div>

              {/* Email */}
              <Field>
                <Controller
                  name="email_id"
                  control={loginForm.control}
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

              {/* Password */}
              <Field>
                <Controller
                  name="password"
                  control={loginForm.control}
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
                Or continue with
              </FieldSeparator>

              {/* Social placeholder */}
              <Field className="flex justify-center">
                <Button variant="outline" disabled>
                  Google
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup" replace>
                  Sign up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src={ImageAssets.LoginPageImage}
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
