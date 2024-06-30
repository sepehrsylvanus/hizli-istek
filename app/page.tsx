import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" relative font-">
      <div className="relative top-[54px] left-[80px] text-[34px] ">
        <p className="font-bold  mb-4">
          order easily by{" "}
          <span className=" text-primary font-mPlus">Hızlı istek</span>
        </p>
        <p className="font-bold font-mPlus  w-[773px] ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, quod!
        </p>
      </div>
      <div className=" absolute top-[23em] left-[15em] flex flex-col items-center ">
        <div>
          <p>Add your link</p>
          <div className="w-[479px] border-tertiary border-[2px] rounded-lg flex justify-between text-onColor">
            <Input className=" outline-none border-none text-textColor" />
            <Button className="bg-tertiary hover:bg-tertiaryContainer rounded rounded-s-none">
              Confirm
            </Button>
          </div>
        </div>
        <Image
          src={"/companies.svg"}
          className=" mt-[4.6em]"
          alt="companies"
          width={660}
          height={42}
        />
      </div>
    </div>
  );
}
