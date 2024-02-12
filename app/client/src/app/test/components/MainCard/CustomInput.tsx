import { IconBrandYoutube } from "@tabler/icons-react";
import React from "react";

interface CustomInputProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function CustomInput({ url, setUrl }: CustomInputProps) {
  return (
    <div>
      <div className="relative mb-6"></div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Video URL
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <IconBrandYoutube />
        </span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          id="website-admin"
          className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="https://www.youtube.com/"
        />
      </div>
    </div>
  );
}
