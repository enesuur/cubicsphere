import { GoogleMap, Marker, useLoadScript,InfoWindow } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import "./MapViewer.css";

export default function MapViewer({eventAddress}) {
    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const [address, setAddress] = useState(eventAddress);
    const [coordinates, setCoordinates] = useState({});
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyA1Sg9N4CzhRcmb6U7WqZcHWhlHo4O-nIw"
    });
    console.log(address);

    const center = {
        lat: 41.015137,
        lng:28.979530,
    };

    useEffect(() => {
        if (isLoaded && !loadError) {
            async function geoCodeAddress(address) {
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ address: address }, (results, status) => {
                    if (status === "OK") {
                        if (results[0]) {
                            setInfoWindowData({address});
                            setCoordinates({
                                lat: Number(results[0].geometry.location.lat()),
                                lng: Number(results[0].geometry.location.lng())
                            })

                        } else {
                            console.error("No results found.");
                        }
                    } else {
                        console.error("Geocoder failed due to: " + status);
                    }
                });
            };
            geoCodeAddress(address);
        }
    }, [isLoaded, loadError,eventAddress]);

    useEffect


    function handleMarkerClick(){
        setIsOpen(true);
    }

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps...";

    return (
        <div className="map-wrapper">
            {Object.keys(coordinates).length === 0 ? (
                <div>
                    Map is loading...
                </div>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={{ lat: coordinates.lat, lng: coordinates.lng }}
                    zoom={17}
                >
                    <Marker
                        position={{ lat: coordinates.lat, lng: coordinates.lng }}
                        onClick={() => handleMarkerClick()}
                    />
                    {isOpen && infoWindowData && (
                        <InfoWindow
                            onCloseClick={() => setIsOpen(false)}
                            position={{ lat: coordinates.lat, lng: coordinates.lng }}
                        >
                            <div>
                                <h3>{infoWindowData.address}</h3>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            )}
        </div>
    );
}