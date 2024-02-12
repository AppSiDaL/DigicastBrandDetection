import Image from "next/image";
import React from "react";

interface InferenceTabsProps {
  server: string;
  setServer: React.Dispatch<React.SetStateAction<string>>;
}
export default function InferenceTabs({
  server,
  setServer,
}: InferenceTabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="me-0.5">
          <a
            href="#"
            className={` inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg${
              server === "inference"
                ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                : " hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            }`}
            onClick={() => setServer("inference")}
          >
            <Image
              src="/server.png"
              className="m-1"
              style={{ width: "auto", height: "auto" }}
              width={20}
              height={20}
              alt="Roboflow Logo"
            />
            Inference Server
          </a>
        </li>
        <li className="me-0.5">
          <a
            href="#"
            className={` inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg${
              server === "roboflow"
                ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                : " hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            }`}
            aria-current="page"
            onClick={() => setServer("roboflow")}
          >
            <Image
              src="/roboflow.png"
              className="m-1"
              style={{ width: "auto", height: "auto" }}
              width={20}
              height={20}
              alt="Roboflow Logo"
            />
            Roboflow Server
          </a>
        </li>
      </ul>
    </div>
  );
}
