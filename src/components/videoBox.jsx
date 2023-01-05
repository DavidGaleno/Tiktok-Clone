import './videoBox.css'

import {useState,useEffect} from 'react'
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';


export default function VideoBox({source,index,handleVideoEnd}){

  const observer = new IntersectionObserver((entries)=>{
    for (let i = 0; i <=entries.length-1;i++){
    if(entries[i].isIntersecting){
      entries[i].target.play()
    }
    else{
      entries[i].target.pause()
    }
   }
},{
  threshold: 0.5
})
useEffect(()=>{
  const videos = document.querySelectorAll('.video')
  videos.forEach(video=>{
    observer.observe(video)
  })
},[])

  const [play,setPlay] = useState(true)
  const [volume,setVolume] = useState(false)
  const [fillHeart,setFillHeart] = useState(false)
  const [showIcons,setShowIcons] = useState(false)

  function handleVideoClick(number){
    const videos = document.querySelectorAll('.video')
    if (play === false){
      videos[number].play()
      setPlay(true)
      setShowIcons(false)
    }
    else{
      videos[number].pause()
      setPlay(false)
      setShowIcons(true)
    }
  
  }
  
  const handleVolumeButton = (number)=>{
    const videos = document.querySelectorAll('.video')
      setVolume(!volume)
      videos[number].muted = !videos[number].muted
      
  } 
  
  const handleHeart = ()=>{
    setFillHeart(!fillHeart)
  }
  

    return(
        <div className="container">
        <div className='video--box'>
                {!play &&  <div className='playerButton playButton' onClick={()=>handleVideoClick(index)}><PlayArrowIcon style={{fontSize:70,color:'white'}}/></div>}
              <div className='playerButton volumeButton' onClick={()=> handleVolumeButton(index)}>
                {showIcons && <>{volume ? <VolumeUpIcon style={{fontSize:30,color:'white'}}/> : <VolumeOffIcon style={{fontSize:30,color:'white'}}/>}</>}
              </div>
            <video className='video' onClick={()=>handleVideoClick(index)} onPause={()=>{setPlay(false)
            setShowIcons(true)}} onPlay={()=>{setPlay(true)
            setShowIcons(false)}}  onEnded={()=>handleVideoEnd(index)} muted>
              <source src={source} type='video/mp4'></source>
            </video>
            {showIcons && <div className='right-icons'>
              <div className="icon">
                <SmsOutlinedIcon style={{fontSize:30,color:'white'}}/>
              </div>
              <div className="icon">
                <PersonOutlineIcon style={{fontSize:30,color:'white'}}/>
              </div>
              <div className="icon" onClick={()=>handleHeart()}>
                {fillHeart ? <FavoriteOutlinedIcon style={{fontSize:30,color:'red'}}/> : <FavoriteBorderOutlinedIcon style={{fontSize:30,color:'white'}}/>}
              </div>
            </div>}
        </div>
      </div>
    )
}