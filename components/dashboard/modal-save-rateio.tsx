import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setModalSaveRateioClose } from "@/store/modal/modal.actions";
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
import { rateioSave } from "@/service/rateio/rateio-service";
import { selectModalSaveRateio } from "@/store/modal/modal.selectors";
import {
  selectActiveRateio,
  selectRateio,
} from "@/store/rateios/rateios.selectors";
import { useRouter } from "next/navigation";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { setActiveRateio, setClearActiveRateio } from "@/store/rateios/rateios.actions";

const ModalSaveRateio = () => {
  const dispatch = useAppDispatch();
  const modalSaveRateio = useAppSelector(selectModalSaveRateio);
  const selectedRateio = useAppSelector(selectActiveRateio);
  const router = useRouter();
  const [whiteListAccess, setWhiteListAccess] = useState(true);

  const onClose = () => {
    dispatch(setModalSaveRateioClose());
  };

  const schema = z.object({
    password: z.string().optional(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      try {
        const save = await rateioSave(
          selectedRateio,
          values?.password ?? "",
          whiteListAccess
        );
        dispatch(
          setClearActiveRateio()
        );
        router.push(`/dashboard/${save.data.id}`);
        router.refresh();

        toast({
          title: "Success!",
          description:
            "Your rateio has been saved at your account successefully",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error!",
          description:
            "An error happened trying to save your rateio. Please enter in contact.",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={modalSaveRateio.isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Add a password to your Rateio
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
                      <Label className="text-base">Add an Password</Label>
                      <p>Add a password to share it with Security</p>
                      <p>If you don't need a password, leave it in blank.</p>
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
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Access Control</Label>
                    <p className="text-sm">
                      Give access to other users edit this rateio
                    </p>
                  </div>
                  <div>
                    <Switch
                      checked={whiteListAccess}
                      onCheckedChange={setWhiteListAccess}
                      aria-readonly
                    />
                  </div>
                </div>
                <Button className="flex gap-2 items-center">
                  <PlusCircleIcon />
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSaveRateio;
