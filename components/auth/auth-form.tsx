"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GithubIcon, LoaderIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  formAuthSignupSchema,
  formAuthSigninSchema,
} from "../../app/(auth)/(routes)/auth/constants";
import { usePathname } from "next/navigation";
import { authSignup } from "@/service/auth/auth-service";
import { useToast } from "../ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const pathname = usePathname();

  const schema = pathname.includes("signin")
    ? formAuthSigninSchema
    : formAuthSignupSchema;

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);

    try {
      if (pathname.includes("signin")) {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        console.log(res)
        if (res?.ok) {
          toast({
            title: "Success!",
            description: "Welcome, thank you for sign-in!",
          });
          router.replace("/home");
        } else {
          toast({
            variant: "destructive",
            title: "Error!",
            description: "an error happened trying to sign-in!",
          });
        }
      } else {
        await authSignup(values.email, values.password);

        toast({
          title: "Success!",
          description: "Welcome, thank you for sign-up!",
        });
        router.replace("/home");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error!",
        description: error?.response?.data?.message
          ? error.response.data.message
          : "an error happened!",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full p-4 px-3 md:px-6 grid grid-cols-1 gap-4"
            >
              <div className="flex flex-col gap-4">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormMessage className="text-xs" />
                      <FormControl className="m-0 p-0">
                        <Input
                          className="px-4 border outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="Eg. johndoe@gmail.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormMessage className="text-xs" />
                      <FormControl className="m-0 p-0">
                        <Input
                          className="px-4 border outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading}>
                  {isLoading && (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GithubIcon className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
