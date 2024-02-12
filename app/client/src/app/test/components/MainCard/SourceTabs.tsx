import { IconBrandYoutube, IconPhoto } from "@tabler/icons-react";
import React from "react";

interface SourceTabsProps {
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
}

export default function SourceTabs({ source, setSource }: SourceTabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="me-2">
          <a
            href="#"
            className={`${
              source === "youtube"
                ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            } inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg`}
            onClick={() => setSource("youtube")}
          >
            <IconBrandYoutube className="w-4 h-4 me-2" />
            Youtube Video
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            className={`${
              source === "image"
                ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            } inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg`}
            onClick={() => setSource("image")}
            aria-current="page"
          >
            <IconPhoto className="w-4 h-4 me-2" />
            Image File
          </a>
        </li>
      </ul>
    </div>
  );
}
