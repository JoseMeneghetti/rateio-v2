import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setModalAuthRateioClose } from "@/store/modal/modal.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { Button } from "../ui/button";
import { LockIcon, PlusCircleIcon } from "lucide-react";

import { toast } from "../ui/use-toast";
import { rateioAuth } from "@/service/rateio/rateio-service";
import { selectModalAuthRateio } from "@/store/modal/modal.selectors";
import { useRouter } from "next/navigation";

const ModalAuthRateio = () => {
  const dispatch = useAppDispatch();
  const modalAuthRateio = useAppSelector(selectModalAuthRateio);
  const router = useRouter();

  const onClose = () => {
    dispatch(setModalAuthRateioClose());
  };

  const schema = z.object({
    password: z.string().min(1, {
      message: "password is required",
    }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      if (values.password) {
        const response = await rateioAuth(
          modalAuthRateio.rateioId,
          values.password
        );

        router.refresh();
        toast({
          title: "Success!",
          description: "We are redirecting you to this Rateio",
        });
        onClose();
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error!",
        description:
          error?.response?.data?.message ?? "An unexpected error happened!",
      });
      console.error(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Dialog open={modalAuthRateio.isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Rateio protected by Password
              <Badge className="uppercase text-sm py-1" variant="default">
                + Security
              </Badge>
            </div>
          </DialogTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-1 gap-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <LockIcon className="mx-4" />
                    <div className="space-y-0.5 text-sm">
                      <Label className="text-base">Input the password</Label>
                      <p>
                        This rateio is protected by password, ask the password
                        for the owner!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <FormField
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormMessage className="text-xs" />
                        <FormControl className="m-0 p-0">
                          <Input
                            type="password"
                            className="px-4 border outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                            // disabled={isLoading}
                            placeholder="A strong password"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button className="flex gap-2 items-center">
                  <PlusCircleIcon />
                  Enter
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAuthRateio;
