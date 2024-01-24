import React from "react";
import NavBar from "./components/NavBar";
import Description from "./components/Description";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex flex-col h-screen relative ">
      <NavBar />
      <div className="flex flex-col flex-grow relative ">
        <div className="bg2 absolute w-full h-full ">
          <svg
            id="visual"
            viewBox="0 0 900 600"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <clipPath id="blob">
              <path
                d="M366 0L389.5 20C413 40 460 80 429.5 120C399 160 291 200 270.7 240C250.3 280 317.7 320 316.8 360C316 400 247 440 242.3 480C237.7 520 297.3 560 346.5 600C395.7 640 434.3 680 453.7 700L473 720L0 720L0 700C0 680 0 640 0 600C0 560 0 520 0 480C0 440 0 400 0 360C0 320 0 280 0 240C0 200 0 160 0 120C0 80 0 40 0 20L0 0Z"
                fill="#0066FF"
              ></path>
            </clipPath>
          </svg>
        </div>
        <div className="bg1 w-full h-full diference"></div>
        <div className="absolute w-full h-full flex justify-center items-center bg3">
          <div className="w-1/2 flex justify-end mr-40">
            <Description />
          </div>
          <div className="w-1/2 flex">
            <div>
            <Image
              src="/ilustration.png"
              width={500}
              height={500}
              alt="Flowbite Logo"
            />
            </div>
            <Image
              src="/bacardi.gif"
              width={200}
              height={200}
              className="absolute left-2/4 top-2/3 4 border-cyan-900 border-4"
              alt="Bacardi Detection Gif"
            />
            <Image
              src="/bimbo.gif"
              width={200}
              height={200}
              className="absolute left-3/4 top-10 border-cyan-700 border-4"
              alt="Bimbo Detection Gif"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
