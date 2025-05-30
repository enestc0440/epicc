"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { CategoryType } from "@/lib/types"

interface CategoryPanelProps {
  category: CategoryType
  onExecute: (apiName: string, params: Record<string, any>) => void
}

const CategoryPanel = ({ category, onExecute }: CategoryPanelProps) => {
  const [selectedApi, setSelectedApi] = useState<string>(Object.keys(category.apis)[0])
  const [params, setParams] = useState<Record<string, any>>({})

  useEffect(() => {
    // Reset params when API changes
    setParams({})
  }, [selectedApi])

  const handleApiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedApi(e.target.value)
  }

  const handleParamChange = (param: string, value: any) => {
    setParams((prev) => ({ ...prev, [param]: value }))
  }

  const handleExecute = () => {
    onExecute(selectedApi, params)
  }

  const renderInputField = (param: string) => {
    const api = category.apis[selectedApi]

    if (param === "type" && selectedApi === "hash") {
      return (
        <select
          id={`${category.id}-${param}`}
          value={params[param] || "sha256"}
          onChange={(e) => handleParamChange(param, e.target.value)}
          className="w-full p-2.5 bg-[#001000] text-[#00ff00] border border-[#00ff00] rounded hover:shadow-[0_0_10px_#00ff00,0_0_15px_#00ff00] hover:border-[#33ff33] focus:shadow-[0_0_15px_#00ff00,0_0_20px_#33ff33] focus:border-[#66ff66] outline-none transition-all duration-300"
        >
          {["md5", "sha1", "sha256", "sha512"].map((opt) => (
            <option key={opt} value={opt}>
              {opt.toUpperCase()}
            </option>
          ))}
        </select>
      )
    }

    if (param === "mode" && selectedApi === "urlencode") {
      return (
        <select
          id={`${category.id}-${param}`}
          value={params[param] || "encode"}
          onChange={(e) => handleParamChange(param, e.target.value)}
          className="w-full p-2.5 bg-[#001000] text-[#00ff00] border border-[#00ff00] rounded hover:shadow-[0_0_10px_#00ff00,0_0_15px_#00ff00] hover:border-[#33ff33] focus:shadow-[0_0_15px_#00ff00,0_0_20px_#33ff33] focus:border-[#66ff66] outline-none transition-all duration-300"
        >
          {["encode", "decode"].map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      )
    }

    if (["prompt", "codes", "text_to_scrape", "json_data", "text_to_encode"].includes(param)) {
      return (
        <textarea
          id={`${category.id}-${param}`}
          value={params[param] || ""}
          onChange={(e) => handleParamChange(param, e.target.value)}
          placeholder={param.replace(/_/g, " ").toUpperCase()}
          rows={3}
          className="w-full p-2.5 bg-[#001000] text-[#00ff00] border border-[#00ff00] rounded hover:shadow-[0_0_10px_#00ff00,0_0_15px_#00ff00] hover:border-[#33ff33] focus:shadow-[0_0_15px_#00ff00,0_0_20px_#33ff33] focus:border-[#66ff66] outline-none transition-all duration-300"
        />
      )
    }

    if (["include_uppercase", "include_numbers", "include_symbols"].includes(param)) {
      return (
        <div className="flex items-center">
          <input
            type="checkbox"
            id={`${category.id}-${param}`}
            checked={params[param] !== undefined ? params[param] : true}
            onChange={(e) => handleParamChange(param, e.target.checked)}
            className="mr-2"
          />
          <label htmlFor={`${category.id}-${param}`} className="ml-1">
            {param.replace("include_", "").replace(/_/g, " ").toUpperCase()}
          </label>
        </div>
      )
    }

    let inputType = "text"
    if (param === "tc" || param === "gsm" || ["count", "adet", "length", "port", "sayı"].includes(param)) {
      inputType = "number"
    } else if (param === "email" || (param === "query" && selectedApi === "leakcheck_ondex")) {
      inputType = "email"
    }

    return (
      <input
        type={inputType}
        id={`${category.id}-${param}`}
        value={params[param] || ""}
        onChange={(e) => handleParamChange(param, e.target.value)}
        placeholder={param.replace(/_/g, " ").toUpperCase()}
        className="w-full p-2.5 bg-[#001000] text-[#00ff00] border border-[#00ff00] rounded hover:shadow-[0_0_10px_#00ff00,0_0_15px_#00ff00] hover:border-[#33ff33] focus:shadow-[0_0_15px_#00ff00,0_0_20px_#33ff33] focus:border-[#66ff66] outline-none transition-all duration-300"
      />
    )
  }

  return (
    <div className="category bg-[rgba(0,20,0,0.7)] p-5 border border-[#008000] rounded-xl shadow-[0_0_10px_rgba(0,255,0,0.3),0_0_15px_rgba(0,255,0,0.2)_inset] flex flex-col">
      <h2 className="text-[#ff0000] font-orbitron text-xl mt-0 mb-4 shadow-[0_0_5px_#ff0000,0_0_10px_#ff0000] border-b border-[#ff3333] pb-2.5">
        {category.title}
      </h2>

      <select
        value={selectedApi}
        onChange={handleApiChange}
        className="w-full p-2.5 mb-4 bg-[#001000] text-[#00ff00] border border-[#00ff00] rounded hover:shadow-[0_0_10px_#00ff00,0_0_15px_#00ff00] hover:border-[#33ff33] focus:shadow-[0_0_15px_#00ff00,0_0_20px_#33ff33] focus:border-[#66ff66] outline-none transition-all duration-300"
      >
        {Object.entries(category.apis).map(([key, api]) => (
          <option key={key} value={key}>
            {api.title}
          </option>
        ))}
      </select>

      <div className="input-grid grid gap-3 mb-4">
        {category.apis[selectedApi]?.params.map((param) => (
          <div key={param} className="flex flex-col">
            <label htmlFor={`${category.id}-${param}`} className="mb-1 capitalize">
              {param.replace(/_/g, " ").toUpperCase()}:
            </label>
            {renderInputField(param)}
          </div>
        ))}

        {category.apis[selectedApi]?.message && <p className="text-[#00aaff]">{category.apis[selectedApi].message}</p>}
      </div>

      <button
        onClick={handleExecute}
        className="execute-button py-3 px-5 text-lg font-orbitron bg-[#ff0000] text-black border-none rounded cursor-pointer font-bold transition-all duration-300 shadow-[0_0_3px_#000] mt-auto hover:bg-[#00ff00] hover:shadow-[0_0_15px_#00ff00,0_0_20px_#00ff00]"
      >
        Execute
      </button>
    </div>
  )
}

export default CategoryPanel
