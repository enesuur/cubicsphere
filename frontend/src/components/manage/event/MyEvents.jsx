
import { useState,useEffect } from "react";
import EventCard from "../../cards/EventCard"
export default function MyEvents(){
    const [userEvents,setUserEvents] = useState([]);
    const [message,setMessage] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/event/user-events`, {
          method: "GET",
          credentials: "include",
        })
          .then(async (response) => {
            if (response.status === 200) {
              const data = await response.json();
              setUserEvents(data);
              console.log(data, data.message);
            }
            if (response.status === 404 || response.status === 400) {
              const data = await response.json();
              setMessage(data.message);
            }
          })
          .catch((error) => {
            setMessage(error.message);
          });
      }, []);
    return(
        <>
        <div className="events">
            {userEvents.length > 0 &&
              userEvents.map((eventObj, key) => {
                return (
                  <EventCard
                    key={key}
                    eventObj={eventObj}
                  />
                );
              })}
          </div>
        </>


    )
}