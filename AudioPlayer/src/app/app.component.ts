import { Component } from '@angular/core';
//Installed rxjs and moment
import { Observable } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AudioPlayer';
audioObj =new Audio();
//used for displaying current time
audioEvents=[
  "ended",
  "error",
  "play",
  "playing",
  "pause",
  "timeupdate",
  "canplay",
  "loadedmetdata",
  "loadstart"
]

files=[
  {
    url:'./assets/song1.mp3',
    name:'All is Well Song'
  },
  {
    url:'./assets/song2.mp3',
    name:'Aasha Hai Zindagi Song'
  },
  {
    url:'./assets/song3.mp3',
    name:'Zindagi ka Safar Song'
  }

];

currentTime='00:00:00';
duration='00:00:00';
seek=0;

//used for displaying current time
streamObserver(url:any){
  return new Observable(observer =>{
    this.audioObj.src=url;
  this.audioObj.load();
  this.audioObj.play();
  const handler=(event:Event)=>{
  console.log(event);
  this.seek=this.audioObj.currentTime;
  this.duration=this.timeFormat(this.audioObj.duration);
  this.currentTime=this.timeFormat(this.audioObj.currentTime);
  }
  this.addEvent(this.audioObj,this.audioEvents,handler);
return()=>{
this.audioObj.pause();
this.audioObj.currentTime=0;
this.removeEvent(this.audioObj,this.audioEvents,handler);
}
  });
}

addEvent(obj:any,events:any,handler:any){
events.forEach((event:any)=>{
  obj.addEventListener(event,handler);
})

}
removeEvent(obj:any,events:any,handler:any){
  events.forEach((event:any)=>{
    obj.removeEventListener(event,handler);
  })

}

seekTime(ev:any){
  this.audioObj.currentTime=ev.target.value;
}


setVolume(ev:any)
{
  this.audioObj.volume=ev.target.value;
console.log("ev");
}

openFile(url:any){
  // this.audioObj.src=url;
  // this.audioObj.load();
  // this.audioObj.play();
  this.streamObserver(url).subscribe(event=>{});
}

  play()
  {
    this.audioObj.play();
  }
  
  pause()
  {
    this.audioObj.pause();
  }
  
  stop()
  {
    this.audioObj.pause();
    this.audioObj.currentTime=0;
  }

  timeFormat(time:any,format="HH-mm-ss"){
const momentTime=time * 1000;
return moment.utc(momentTime).format(format)
  }
}
