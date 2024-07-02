"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

const MainImage = () => {
  const pathname = useParams();
  console.log(pathname);
  return (
    <div className="w-[100%] h-[945px] absolute top-0 -z-10">
      <Image src={"/hero.png"} alt="hero" fill />
    </div>
  );
};

export default MainImage;
