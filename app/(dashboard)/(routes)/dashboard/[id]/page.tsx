"use client";

import Heading from "@/components/common/heading";
import ModalAuthRateio from "@/components/dashboard/modal-auth-rateio";
import TabsComponent from "@/components/dashboard/tabs-component";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setModalAuthRateioOpen } from "@/store/modal/modal.actions";
import { fetchRateio } from "@/store/rateios/rateios.actions";
import { selectFetechedRateio } from "@/store/rateios/rateios.selectors";
import { FileWarningIcon, SplitIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = ({ params }: { params: { id: string } }) => {
  const rateio = useAppSelector(selectFetechedRateio);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      try {
        dispatch(fetchRateio({ id: params.id }))
          .unwrap()
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            if (error.message.includes("403")) {
              dispatch(setModalAuthRateioOpen(params.id));
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [params.id]);

  if (rateio?.total.length < 1 || !params.id) {
    return (
      <div className="p-4 lg:p-8">
        <Heading
          title="DashBoard - Rateio not Found"
          description="We have no information about your rateio, try to create a new one"
          icon={FileWarningIcon}
          iconColor="text-pink-700"
          bgColor="bg-pink-700/10"
        />
        <ModalAuthRateio />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex justify-between">
        <Heading
          title={`DashBoard - ${rateio.nameRateio}`}
          description="See infos and control you rateio"
          icon={SplitIcon}
          iconColor="text-pink-700"
          bgColor="bg-pink-700/10"
        />
        {
          <Button onClick={() => router.push(`/edit/${rateio.id}`)}>
            Edit
          </Button>
        }
      </div>

      <TabsComponent rateio={rateio} />
    </div>
  );
};

export default DashboardPage;
