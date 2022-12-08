import React, { useContext, useEffect, useMemo, useState } from "react";
import './EventDetails.css'
import { AppContext } from "../context/appContext";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";


function EventDetails() {

    const { currentEvent, directionsResponse, setDirectionsResponse } = useContext(AppContext);

    //const [ directionsResponse, setDirectionsResponse ] = useState(null);
    const [ currentLat, setCurrentLat ] = useState();
    const [ currentLon, setCurrentLon ] = useState();

    navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLat(position.coords.latitude)
        setCurrentLon(position.coords.longitude)
    })
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCj4iJvd7Ir_ck6Pxj08v7MTF2MlPDhA0o",
      });
    if (!currentEvent) return(
        <div></div>
    )
    
    //const center = { lat: 42.3402146, lng: -71.0893039 }
    const center = { lat: currentEvent.latlng.lat, lng: currentEvent.latlng.lng }

// 42.3402146,-71.0893039
    async function getDirectionsHandler() {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: { lat: currentLat, lng: currentLon },
          destination: center,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
    }

    // async function getDirection() {
    //     // eslint-disable-next-line no-undef
    //     const directionsService = new google.maps.DirectionsService()
    //     const results = await directionsService.route({
    //       origin: { lat: currentLat, lng: currentLon },
    //       destination: center,
    //       // eslint-disable-next-line no-undef
    //       travelMode: google.maps.TravelMode.DRIVING,
    //     })
    //     console.log("DirectionsResponse - ", results)
    //     setDirectionsResponse(results)
    // }
    function handleMapClick(e){
        console.log("handleMapClick ---", e)
        console.log("Lat ---", e.latLng.lat())
        console.log("Lng ---", e.latLng.lng())
    }


    if (!isLoaded) return <div>Loading...</div>;

  return (
     
        <div className='descContainer'>
        
            <h3>{currentEvent.title}</h3>
            <p>{currentEvent.description}</p>
            
            <div className="add-map-container">
            <GoogleMap zoom={10} center={center} mapContainerClassName="map-container" onClick={(e)=>{handleMapClick(e)}}>
                <Marker position={center} />
                {directionsResponse && currentLat != undefined && currentLon != undefined && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}        
            </GoogleMap>
                <div className="display-center">
                {currentLat && currentLon && (
                    <button className="btn btn-primary btn-get-directions" onClick={ () => { getDirectionsHandler() }}>Get Directions</button>
                )}  
                </div> 
            </div>
            
            <p> <b>Event Date:</b> {currentEvent.date.substring(0,10)}</p>
            <p> <b>Event Time:</b> {currentEvent.time}</p>

        </div>


  )
}

export default EventDetails
