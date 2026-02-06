import React from 'react';
import { useState } from 'react'
import { useRef } from 'react';
import axios from 'axios';
function App() {
  const fileRef = useRef(null);
  const [videofile, setVideofile] = useState(null);
  const [url,setUrl] = useState("");
  const handleFilechange = (e) =>{
    const selectedFiles = e.target.files[0];
    if(!selectedFiles) return;
    if(!selectedFiles.type.endsWith("mp4")){
      console.log("select only video files");
      return;
    }
    setVideofile(selectedFiles);
  }
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video",videofile);
    const res = await axios.post("http://localhost:3000/api/cloudinary/upload",formData);
    if(res){
      console.log("video is uploaded to cloudinary successfully");
      console.log(res.data.url);
      setUrl(res.data.url);
    }
    else{
      console.log("there is an error while uploading");
    }

  }
  return (

      <div className='flex gap-4 top-4'>
        <input type="file" ref={fileRef} accept="video/*" style={{disply:"none"}} onChange={handleFilechange}/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md h-12 mt-20" onClick={() => fileRef.current.click()}>Add video</button>
         <button className="bg-blue-500 text-white px-4 py-2 rounded-md h-12 mt-20" onClick={handleUpload}>upload</button>
         <div className='flex mt-20'>
          <video src={url} controls className='w-200 h-100' />


         </div>
      </div>
      

  )
}

export default App
