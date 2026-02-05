import React from 'react';
import { useState } from 'react'
import './App.css'
import { useRef } from 'react';
import axios from 'axios';
function App() {
  const urlRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState("");
  const handleOnclick = async () => {
    const res = await axios.post("http://localhost:3000/api/video/addVideo",{
      source:urlRef.current.value,
      platform:"youtube"
    });
    console.log(res.data);
    setVideoUrl(res.data.video.source);
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex justify-center items-center gap-4'>
        <input type="text" placeholder='"Enter Video Url' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none' ref={urlRef} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleOnclick}>submit</button>

      </div>
      <div className='flex justify-center items-center gap-4 mt-4'>
        {videoUrl && videoUrl.includes("youtube") && (
          <iframe width="560" height="315" src={videoUrl.replace("watch?v=","embed/")} title="youtube video player" allowFullScreen />
        )}

      </div>

    </div>
  )
}

export default App
