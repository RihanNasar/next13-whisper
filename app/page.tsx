"use client"
import React, {useState} from 'react'
import Image from 'next/image'

export default function Home() {
  
  const [theFile,setFile] = useState<any>(null);
  const [loading,setLoading] = useState(false)
  const [response,setResponse] = useState("")

  const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    setFile(file)

    
  }
  const getTranscription = async () => {
    setLoading(true)
    if (!theFile) {
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.set("file", theFile);
    try {
      const response = await fetch("/api",{
        method: "POST",
        body: formData
      })
      if(response.ok){
        console.log("request is successfull")
      }else {
        console.log("print not successful")
      }
      const data = await response.json();
      setResponse(data.output.text)
    } catch (error) {
      console.log("an error occured")
    }
    setFile(null);
    setLoading(false)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-5">
    <h1 className="text-5xl font-sans">Whisperer</h1>

    <div className="flex  h-[35rem] w-[40rem] flex-col items-center bg-gray-600 rounded-xl">
      <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
        <input type="file" accept=".wav, .mp3" onChange={handleFileChange} />

        <div className="w-[90%] h-max border-2 break-words">
          {loading ? "Loading..." : response ? response : ""}
        </div>
      </div>
      <div className="relative  w-[80%] bottom-4 flex justify-center">
        <button
          onClick={getTranscription}
          className="w-max bg-blue-500 px-4 py-2 rounded-sm "
        >
          Upload
        </button>
      </div>
    </div>
  </main>
  )
}
