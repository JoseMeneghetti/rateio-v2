import Image from "next/image";
import { mockIcons } from "../create-rateio/constants/icons";
import { PopoverClose } from "@radix-ui/react-popover";

interface PopoverIconsProps {
  setIcon: React.Dispatch<string>;
}

const PopoverIcons = ({ setIcon }: PopoverIconsProps) => {
  return (
    <div className="flex flex-wrap max-h-[250px] overflow-y-scroll gap-2">
      {mockIcons.map((iconName) => (
        <div key={iconName} className="">
          <PopoverClose
            className="flex shrink-0 items-center justify-center cursor-pointer"
            onClick={() => {
              setIcon(iconName);
            }}
          >
            <Image
              src={`/icons/${iconName}.png`}
              width={50}
              height={50}
              alt={"icon"}
            />
          </PopoverClose>
        </div>
      ))}
    </div>
  );
};

export default PopoverIcons;
