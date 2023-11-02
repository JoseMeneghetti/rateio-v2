"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { setModalDeleteClose } from "@/store/modal/modal.actions";

import { Button } from "../ui/button";
import { AlertTriangleIcon, ImageIcon } from "lucide-react";
import { Label } from "../ui/label";

import Image from "next/image";
import { setDeleteExpense } from "@/store/rateios/rateios.actions";

const ModalDeleteParticipant = () => {
  const { modalDelete } = useAppSelector((state: RootState) => state.modal);

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setModalDeleteClose());
  };

  const onSubmit = () => {
    try {
      dispatch(
        setDeleteExpense({
          name: modalDelete?.participant?.name ?? "",
          original_expense:
            modalDelete?.participant?.expense?.expense_name ?? "",
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={modalDelete.isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1 capitalize">
              {modalDelete?.participant?.expense.expense_name}
              <Badge className="uppercase text-sm py-1" variant="default">
                Delete
              </Badge>
            </div>
          </DialogTitle>

          <div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
              <div>
                <AlertTriangleIcon width={50} height={50} />
              </div>
              <div className="space-y-0.5">
                <Label className="text-base">Delete this expense</Label>
                <p>Are you sure that you want to delete this expense?</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
              <div>
                {modalDelete.participant?.expense.icon ? (
                  <Image
                    src={`/icons/${modalDelete.participant?.expense.icon}.png`}
                    width={50}
                    height={50}
                    alt={"icon"}
                  />
                ) : (
                  <ImageIcon width={50} height={50} />
                )}
              </div>
              <div className="flex flex-grow justify-start flex-col gap-4">
                <div className="flex justify-start items-center gap-2">
                  <Label className="text-base">Expense</Label>
                  <p className="capitalize">
                    {modalDelete?.participant?.expense.expense_name}
                  </p>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <Label className="text-base">Value</Label>
                  <p>{modalDelete?.participant?.expense.expense_value}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="flex justify-end gap-8">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteParticipant;
