import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cardDetails, steps } from "@/constants/mainPage";
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
      <section className="steps mt-[3em]">
        <p className="ml-[5em] text-xl font-semibold">Steps</p>
        <div className="stepContainer grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1">
          {steps.map((step, index) => (
            <div
              key={index}
              className="eachStep h-[25em] flex flex-col bg-secondary pt-3 gap-7"
            >
              <div className="upperCard bg-secondaryContainer h-[5em]  px-[4.5rem] flex items-center gap-2 py-8">
                <p className="bg-white border-tertiary border-2 px-2 rounded-full text-tertiary">
                  {index + 1}
                </p>
                <p className=" text-[18px] ">{step.title}</p>
              </div>
              <div className="lowerCard h-[14.8em] my-6 px-[4.5rem] mt- text-center flex flex-col justify-between gap-7">
                <p className="text-start">{step.description}</p>
                <Image
                  src={`/step${index + 1}.svg`}
                  alt={`step${index + 1}`}
                  width={186}
                  height={156}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
