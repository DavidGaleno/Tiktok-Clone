import { useEffect, useState,useRef } from 'react';
import './App.css';
import videoSource1 from './videos/video-1.mp4'
import videoSource2 from './videos/video-2.mp4'
import videoSource3 from './videos/video-3.mp4'
import videoSource4 from './videos/video-4.mp4'

import VideoBox from './components/videoBox';
function App() {
  const sources = [videoSource1,videoSource2,videoSource3,videoSource4]
    const wrapper = useRef()
  
  const handleVideoEnd = (index)=>{
  if(wrapper.current.offsetHeight + wrapper.current.scrollTop >= wrapper.current.scrollHeight){
    wrapper.current.scrollTop = 0
  } 
  else if(wrapper.current.scrollTop === 0 || (wrapper.current.scrollTop%wrapper.current.offsetHeight) === 0){
  wrapper.current.scrollTop += wrapper.current.offsetHeight
  } 
  else{
    wrapper.current.scrollTop = wrapper.current.offsetHeight*(index+1)
  } 
}

  return (
    <div class="wrapper" ref={wrapper}>
      {sources.map((item,index)=>(
          <VideoBox source={item} key={index} index={index} handleVideoEnd={handleVideoEnd}/>
      ))}
    </div>
  );
}

export default App;
