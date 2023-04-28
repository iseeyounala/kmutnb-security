import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  InfoWindow,
  Marker,
  LoadScript,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
// import ImageTask from "./ImageTask";
import axios from "axios";

const logo = require("./image/bus.png");

let lastPosition, lastTime;
let isRunning = false;

function GoogleMapCom({ tasks }) {
  const [dataCar, setDataCar] = useState([]);

  const getDataLocationCar = () => {
    axios
      .post("http://192.168.1.5:3001/web/user/getLocationCar", {}) // เปลี่ยน IP เป็น Local IP ห้ามใช้ Localhost
      .then((res) => {
        let { status, result } = res.data;
        console.log(res.data);
        status && setDataCar(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getDataLocationCar();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  function calcDistance(pos1, pos2) {
    const R = 6371e3; // radius of Earth in meters
    const lat1 = pos1.lat * (Math.PI / 180);
    const lat2 = pos2.lat * (Math.PI / 180);
    const deltaLat = (pos2.lat - pos1.lat) * (Math.PI / 180);
    const deltaLng = (pos2.lng - pos1.lng) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  }

  const handlePositionUpdate = (latitude, longitude) => {
    const currentTime = Date.now();
    const currentLocation = {
      lat: latitude,
      lng: longitude,
    };

    if (lastPosition) {
      const distance = calcDistance(lastPosition, currentLocation);
      const timeDiff = (currentTime - lastTime) / 1000; // convert to seconds
      const speed = distance / timeDiff; // in meters per second

      if (speed > 10) {
        console.log("Car is running");
        return isRunning = true;
      } else {
        console.log("Car is not running");
        return isRunning = false;
      }
    }

    lastPosition = currentLocation;
    lastTime = currentTime;
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyBHBTkH9fICG5hTL1xNFkyLXaQGyZU6fek">
        <GoogleMap
          options={{
            streetViewControl: true,
            zoom: 15,
            center: { lat: 14.162782696749133, lng: 101.35487649815568 },
          }}
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
        >
          {dataCar.map((val, idx) => {
            return (
              <MarkerF
                key={idx}
                position={{ lat: val.driver_lat, lng: val.driver_long }}
                icon={{ url: `${logo}`, scaledSize: { width: 72, height: 72 } }}
              >
                <InfoWindow
                  position={{ lat: val.driver_lat, lng: val.driver_long }}
                >
                  <>
                    {handlePositionUpdate(val.driver_lat, val.driver_long) == true && (
                      <div style={{ color: "black" }}>กำลังวิ่ง</div>
                    )}
                    {handlePositionUpdate(val.driver_lat, val.driver_long) == false && (
                      <div style={{ color: "black" }}>จอดอยู่</div>
                    )}
                  </>
                </InfoWindow>
              </MarkerF>
            );
          })}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default GoogleMapCom;
