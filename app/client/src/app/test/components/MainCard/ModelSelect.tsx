import React from 'react'

interface ModelSelectProps {
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  modelsURL: {value: string, url: string, label: string}[];
}

export default function ModelSelect({model,setModel,modelsURL}: ModelSelectProps) {

  return (
    <div>
    <label
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Select Model
    </label>
    <select
      id="countries"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      defaultValue={model}
      onChange={(e) => setModel(e.target.value)}
   >
      <option selected>Choose a Model</option>
      {modelsURL.map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
    </select>
  </div>
  )
}
