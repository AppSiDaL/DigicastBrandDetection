import React from 'react'

export default function ModelSelect() {
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
    >
      <option selected>Choose a Model</option>
      <option value="US">Nestle Roboflow 3.0</option>
      <option value="CA">Nestle YOLOv8</option>
      <option value="US">Bimbo Roboflow 3.0</option>
      <option value="CA">Bimbo YOLOv8</option>
      <option value="US">Bacardi YOLOv8</option>
    </select>
  </div>
  )
}
