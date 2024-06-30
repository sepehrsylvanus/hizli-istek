import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cardDetails } from "@/constants/heroSpecCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" relative font-">
      <div className=" mt-[54px] ml-[80px] text-[34px] ">
        <p className="font-bold  mb-4">
          order easily by{" "}
          <span className=" text-primary font-mPlus">Hızlı istek</span>
        </p>
        <p className=" font-bold   w-[773px] ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, quod!
        </p>
      </div>
      <section className="flex mt-[9em]">
        <div className=" flex flex-col items-center ml-[10em]">
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
      </section>
      <section className="features mt-[12.3em] grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 px-[4.5em]">
        {cardDetails.map((cardDetail, index) => (
          <div
            key={index}
            className="px-3 py-5 flex flex-col items-center shadow-md rounded-md"
          >
            <Image src={cardDetail.icon} alt="truck" width={104} height={104} />
            <p>{cardDetail.title}</p>
            <p>{cardDetail.description}</p>
          </div>
        ))}
      </section>
      <section>
        <p>Steps</p>
      </section>
    </div>
  );
}
