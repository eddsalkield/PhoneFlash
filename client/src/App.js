import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import logo from './heysweetcheeks.png';
//import ImageCapture from './ImageCapture'


class App extends Component {

  constructor () {
    super()
    this.state = {
      username: ''
    }

    this.updatePhone = this.updatePhone.bind(this)
    this.getBuffer = this.getBuffer.bind(this)
    this.ping = this.ping.bind(this)
    this.onTorch = this.onTorch.bind(this)
    this.offTorch = this.offTorch.bind(this)

  }





  updatePhone () {
    var latit;
    var longit;
    navigator.geolocation.getCurrentPosition(function(location) {
      latit = location.coords.latitude;
      longit = location.coords.longitude;
      console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      //console.log(Math.round((new Date()).getTime() / 1000));
      console.log(new Date().getTime()/1000);
      console.log(Date.now());
      //console.log(location.coords.accuracy);
    });
    axios.post('https://35.178.120.95/updatePhone', {
      lat: latit,
      longi: longit
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  ping () {
    axios.post('https://35.178.120.95/ping', {})
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  getBuffer () {
    //updatePhone();
    var beforeTime = new Date().getTime()/1000;
    var afterTime;
    var myPing;
    axios.post('https://35.178.120.95/getBuffer', {})
    .then(function (response) {
      console.log(response);
      console.log(response.data.nextUpdateAt.toFixed(3));
      afterTime = new Date().getTime()/1000;
      console.log(afterTime);
      myPing = afterTime-beforeTime;
      while (new Date().getTime()/1000 < response.data.nextUpdateAt.toFixed(3)+10) {
        console.log(new Date().getTime()/1000);
      }
      //getBuffer();
      //this.getBuffer;
      console.log(new Date().getTime()/1000);
      console.log("YO");
    })
    .catch(error => console.log(error))
  }

  onTorch () {
    //Test browser support
    const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
    let ImageCapture = window.ImageCapture;
    if (SUPPORTS_MEDIA_DEVICES) {
    //Get the environment camera (usually the second one)
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const cameras = devices.filter((device) => device.kind === 'videoinput');
        if (cameras.length === 0) {
          throw 'No camera found on this device.';
        }
        const camera = cameras[cameras.length - 1];
        // Create stream and get video track
        navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: camera.deviceId,
            facingMode: ['user', 'environment'],
            height: {ideal: 1080},
            width: {ideal: 1920}
          }
        }).then(stream => {
          const track = stream.getVideoTracks()[0];
          //Create image capture object and get camera capabilities
          const imageCapture = new ImageCapture(track)
          const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {
            //todo: check if camera has a torch
            //let there be light!
            track.applyConstraints({
              advanced: [{torch: true}]
              
            })
            // const btn = document.querySelector('.switch');
            // btn.addEventListener('click', function(){
            //   track.applyConstraints({
            //     advanced: [{torch: true}]
            //   });
            // });
          });
        });
      });
    //The light will be on as long the track exists
    }
  }

  offTorch () {
    //Test browser support
    const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
    let ImageCapture = window.ImageCapture;
    if (SUPPORTS_MEDIA_DEVICES) {
    //Get the environment camera (usually the second one)
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const cameras = devices.filter((device) => device.kind === 'videoinput');
        if (cameras.length === 0) {
          throw 'No camera found on this device.';
        }
        const camera = cameras[cameras.length - 1];
        // Create stream and get video track
        navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: camera.deviceId,
            facingMode: ['user', 'environment'],
            height: {ideal: 1080},
            width: {ideal: 1920}
          }
        }).then(stream => {
          const track = stream.getVideoTracks()[0];
          //Create image capture object and get camera capabilities
          const imageCapture = new ImageCapture(track)
          const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {
            //todo: check if camera has a torch
            //let there be light!
            const btn = document.querySelector('.switch');
            btn.addEventListener('click', function(){
              track.applyConstraints({
                advanced: [{torch: false}]
              });
            });
          });
        });
      });
    //The light will be on as long the track exists
    }
  }

  render () {
    // while (true) {
    //   console.log("OI");
    // }
    return (
      <div className="Big-Container">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">PhoneFlash</h1>
        </header>
      </div>
      <div className='button__container'>
        <button className='button' onClick={this.updatePhone}>L0cate me daddy</button>
        <button className='button' onClick={this.getBuffer}>Buffer me up daddy</button>
        <button className='button' onClick={this.ping}>Ping me daddy</button>
        <button className='switch' onClick={this.onTorch}>Flash me daddy</button>
        <button className='switch' onClick={this.offTorch}>Unflash me daddy</button>
      </div>
      </div>
    )

  }
}

export default App
