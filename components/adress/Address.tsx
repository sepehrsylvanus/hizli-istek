"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/Button";
import L from "leaflet";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa";
import { DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu";
import { useGetCountries } from "@/hooks/useGetCountries";
import { all_cities } from "@/constants/orders";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
import { nextLeve } from "@/features/orderStepSlice";
// ======== MAP SETTINGS ======
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});
// ======== END OF MAP SETTINGS ======
type Code = {
  image: string;
  code: string;
  alt: string;
};

const Address: React.FC = () => {
  const [codes, setCodes] = useState<Code[]>([]);
  const { data: countries, isLoading: countriesLoading } = useGetCountries();
  const dispatch = useDispatch();
  const standardCountries = useMemo(() => {
    return countries?.filter(
      (country) =>
        country.name.common === "Iran" ||
        country.name.common === "Cyprus" ||
        country.name.common === "Turkey"
    );
  }, [countries]);
  // ======= FORM CONFIGS =========

  const formSchema = z.object({
    addressName: z.string().min(3).max(50),
    receiverName: z.string(),
    country: z.string(),
    phoneNumber: z.string(),
    postalCode: z.string(),
    city: z.string(),
    address: z.string(),
    code: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressName: "",
      receiverName: "",
      phoneNumber: "",
      postalCode: "",
      city: "Nicosia",
      address: "",
      code: "+357",
      country: "Cyprus",
    },
  });
  const codeVal = form.watch("code");
  const city = form.watch("city");
  const country = form.watch("country");
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const buttonThings: Code[] = codes.filter((item) => item.code === codeVal);

  useEffect(() => {
    const codes: { image: string; code: string; alt: string }[] = [];
    standardCountries?.forEach((country) => {
      console.log(country.flags.svg);
      console.log(country.idd);

      const code = {
        image: country.flags.svg,
        code: `${country.idd.root}${country.idd.suffixes}`,
        alt: country.flags.alt,
      };
      codes.push(code);
    });
    setCodes(codes);
  }, [countries]);
  // ======= END OF FORM CONFIGS =========

  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <div className="h-full flex flex-col items-center justify-between pb-[2em]">
      <div className="flex justify-between w-full">
        <div className="left flex flex-col gap-9 ml-[9em]">
          <p className="text-[18px] font-[500] text-textColor flex gap-3">
            <Image
              src={"/icons/circleOrange.svg"}
              alt="marker"
              width={12}
              height={12}
            />
            Choose the address on the map
          </p>
          <p>
            If you choose delivery option, please detect your address on map
          </p>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
            className="w-[489px] h-[429px] rounded-xl "
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler />
            {markerPosition && (
              <Marker position={markerPosition}>
                <Popup>
                  Latitude: {markerPosition[0]} <br /> Longitude:{" "}
                  {markerPosition[1]}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
        <Separator orientation="vertical" />
        <div className="right mr-[4.75em]">
          <p className="text-[18px] font-[500] text-textColor flex gap-3">
            <Image
              src={"/icons/circleOrange.svg"}
              alt="marker"
              width={12}
              height={12}
            />
            Post info:
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-x-[9em] gap-y-6"
            >
              <FormField
                control={form.control}
                name="addressName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-center py-4 rounded-xl"
                        placeholder="Home..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receiverName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of receiver:</FormLabel>
                    <FormControl>
                      <Input
                        className="text-center py-4 rounded-xl h-[19px]"
                        placeholder="Maria Amman"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country:</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center w-full">
                          <Button className="bg-transparent hover:bg-transparent outline-none  pr-0 font-normal border border-gray2 rounded-xl w-full flex justify-between px-6 py-3">
                            <p>{country}</p>
                            <FaAngleDown className="ml-[1em] " />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56">
                          <Controller
                            name="country"
                            control={form.control}
                            render={({ field }) => (
                              <DropdownMenuRadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                {["Iran", "Turkey", "Cyprus"].map(
                                  (country, index) => (
                                    <div key={index}>
                                      <DropdownMenuRadioItem
                                        value={country}
                                        className="my-2 px-2"
                                      >
                                        {country}
                                      </DropdownMenuRadioItem>
                                      {index !== 2 && <Separator />}
                                    </div>
                                  )
                                )}
                              </DropdownMenuRadioGroup>
                            )}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" font-normal">
                          Add your phone number
                        </FormLabel>
                        <FormControl>
                          <div className="border rounded-xl flex items-center px-2 ">
                            <DropdownMenu>
                              <DropdownMenuTrigger className="flex items-center ">
                                <Button className="bg-transparent hover:bg-transparent outline-none  pr-0">
                                  <Image
                                    src={buttonThings[0]?.image}
                                    alt={buttonThings[0]?.alt}
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                  />
                                  {buttonThings[0]?.code}
                                </Button>
                                <FaAngleDown className="ml-[1em]" />
                              </DropdownMenuTrigger>
                              <Separator
                                orientation="vertical"
                                className="mx-[10px]"
                              />
                              <DropdownMenuContent className="w-56">
                                <Controller
                                  name="code"
                                  control={form.control}
                                  render={({ field }) => (
                                    <DropdownMenuRadioGroup
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      {codes.map((code, index) => (
                                        <DropdownMenuRadioItem
                                          key={index}
                                          value={code.code}
                                        >
                                          <Image
                                            src={code.image}
                                            alt={code.alt}
                                            width={24}
                                            height={24}
                                            className="mr-2"
                                          />
                                          {code.code}
                                        </DropdownMenuRadioItem>
                                      ))}
                                    </DropdownMenuRadioGroup>
                                  )}
                                />
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Input
                              placeholder="22XXXXXX"
                              {...field}
                              // onChange={handleChangeTest}
                              className="border-none outline-none rounded-xl  bg-transparent pl-0 text-center"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City:</FormLabel>
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center w-full">
                          <Button className="bg-transparent hover:bg-transparent outline-none  pr-0 font-normal border border-gray2 rounded-xl w-full flex justify-between px-6 py-3">
                            <p>{city}</p>

                            <FaAngleDown className="ml-[1em]" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56">
                          <Controller
                            name="city"
                            control={form.control}
                            render={({ field }) => (
                              <DropdownMenuRadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                {all_cities.map((city, index) => (
                                  <div key={index}>
                                    <DropdownMenuRadioItem
                                      value={city}
                                      className="my-2 px-2"
                                    >
                                      {city}
                                    </DropdownMenuRadioItem>
                                    {index !== all_cities.length - 1 && (
                                      <Separator />
                                    )}
                                  </div>
                                ))}
                              </DropdownMenuRadioGroup>
                            )}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal code:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12323345"
                        {...field}
                        className="text-center py-4 rounded-xl"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-2 w-full">
                    <FormLabel>Address:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="No.13, 45th alley, Sasian st. Nicosia, Cyprus"
                        className="resize-none  rounded-xl h-[8em]"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      <div className="flex flex-col gap-10 mb-[5em]">
        <Button
          className="bg-tertiary hover:bg-tertiaryHover w-fit text-white font-normal text-[20px]  px-[4em] py-8 rounded-2xl"
          onClick={() => dispatch(nextLeve())}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Address;
