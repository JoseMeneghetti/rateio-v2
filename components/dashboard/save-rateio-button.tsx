import React from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectActiveNomeRateio } from "@/store/rateios/rateios.selectors";
import { setModalSaveRateioOpen } from "@/store/modal/modal.actions";

const SaveRateioButton = () => {
  const nameRateio = useAppSelector(selectActiveNomeRateio);
  const dispatch = useAppDispatch();
  
  return (
    <Button onClick={() => dispatch(setModalSaveRateioOpen(nameRateio))}>
      Save it!
    </Button>
  );
};

export default SaveRateioButton;
