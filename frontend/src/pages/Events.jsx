import { useEffect, useState } from "react";
import { ToastContainer, toast,Bounce } from "react-toastify";
import SearchBar from "../components/search/SearchBar";
import EventCard from "../components/cards/EventCard";
import UserCard from "../components/cards/UserCard";
import "./Events.css";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const [latestEvents, setLatestEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    startDate: "",
    dueDate: "",
    country: "",
    state: "",
    city: "",
    isOnline: "",
  });

  const countryData = [
    {
      name: "Turkey",
      states: [
        {
          name: "Marmara Region",
          cities: ["İstanbul", "Bursa", "Çanakkale", "Kocaeli"],
        },
      ],
    },
    {
      name: "Germany",
      states: [
        {
          name: "Bavaria",
          cities: ["Munich", "Nuremberg", "Augsburg"],
        },
        {
          name: "Berlin",
          cities: ["Berlin", "Potsdam", "Cottbus"],
        },
      ],
    },
    {
      name: "Russia",
      states: [
        {
          name: "Central Federal District",
          cities: ["Moscow", "Belgorod", "Kursk"],
        },
        {
          name: "Northwestern Federal District",
          cities: ["Saint Petersburg", "Pskov", "Murmansk"],
        },
      ],
    },
    {
      name: "France",
      states: [
        {
          name: "Île-de-France",
          cities: ["Paris", "Versailles", "Boulogne-Billancourt"],
        },
        {
          name: "Provence-Alpes-Côte d'Azur",
          cities: ["Marseille", "Nice", "Cannes"],
        },
      ],
    },
  ];

  function handleInputChange(e) {
    const { name, value } = e.target;

    if (name === "category") {
      setSelectedCategory(value);
    }
   
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function notify(status, serverMessage) {
    if (status === 200) {
      toast.success(serverMessage, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    if (status === 404 || status === 400) {
      toast.warn(serverMessage, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    if (status === 500) {
      toast.error(serverMessage, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }


  useEffect(() => {
    fetch(`http://127.0.0.1:5000/event/latest-events`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          setLatestEvents(data);
          setMessage(data.message);
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

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/event/filter-events?${new URLSearchParams(formData)}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(async (response) => {
        if (response.status === 200) {
          const result = await response.json();
          setFilteredEvents(result.data);
          setMessage(result.message)
          notify(response.status, result.message);
        }
        if (response.status === 404 || response.status === 400) {
          const result = await response.json();
          setMessage(result.message)
          notify(response.status, result.message);
        }
      })
      .catch((error) => {
        setMessage(error.message)
        notify(500, error.message);
      });
  }
  return (
    <>
      <section className="container">
        <h2 className="events-header">Events 🎫</h2>
        <div className="events-dashboard">
          <form onSubmit={handleFormSubmit}>
            <ul className="events-aside">
              <li>
                <h3>Category</h3>
                <label htmlFor="workshop">
                  <input
                    type="checkbox"
                    name="category"
                    value="workshop"
                    onChange={handleInputChange}
                    checked={selectedCategory === "workshop"}
                  />
                  Social
                </label>
                <label htmlFor="conference">
                  <input
                    type="checkbox"
                    name="category"
                    value="conference"
                    onChange={handleInputChange}
                    checked={selectedCategory === "conference"}
                  />
                  Conference
                </label>
                <label htmlFor="webinar">
                  <input
                    type="checkbox"
                    name="category"
                    value="webinar"
                    onChange={handleInputChange}
                    checked={selectedCategory === "webinar"}
                  />
                  Webinar
                </label>
                <label htmlFor="meetup">
                  <input
                    type="checkbox"
                    name="category"
                    value="meetup"
                    onChange={handleInputChange}
                    checked={selectedCategory === "meetup"}
                  />
                  Meetup
                </label>
              </li>
              <li>
                <h3>Date</h3>
                <label htmlFor="startDate">
                  Start Date
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="dueDate">
                  Due Date
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                  />
                </label>
              </li>
              <li>
                <label htmlFor="quota" className="quota-selection">
                  Quota: {formData.quota}
                  <input
                    type="range"
                    name="quota"
                    min="0"
                    max="1000"
                    step="1"
                    onChange={handleInputChange}
                  />
                </label>
              </li>
              <li>
                <h3>Country</h3>
                <label htmlFor="country">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    {countryData.map((countryObj, idx) => {
                      return (
                        <option key={idx} value={countryObj.name}>
                          {countryObj.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </li>
              <li>
                <h3>State</h3>
                <label htmlFor="state">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={!formData.country}
                  >
                    <option value="">Select State</option>
                    {formData.country &&
                      countryData.find(
                        (countryObj) => countryObj.name === formData.country
                      )?.states &&
                      countryData
                        .find(
                          (countryObj) => countryObj.name === formData.country
                        )
                        .states.map((stateObj, idx) => (
                          <option key={idx} value={stateObj.name}>
                            {stateObj.name}
                          </option>
                        ))}
                  </select>
                </label>
              </li>
              <li>
                <label htmlFor="city">
                  City
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.state}
                  >
                    <option value="">Select City</option>
                    {formData.country &&
                      formData.state &&
                      countryData
                        .find(
                          (countryObj) => countryObj.name === formData.country
                        )
                        ?.states.find(
                          (stateObj) => stateObj.name === formData.state
                        )
                        ?.cities.map((city, idx) => (
                          <option key={idx} value={city}>
                            {city}
                          </option>
                        ))}
                  </select>
                </label>
              </li>

              <li>
                Event Type
                <label className="event-type-filter">
                  <label
                    htmlFor="onlineTrue"
                    style={{ display: "inline-block", marginBottom: "0px" }}
                  >
                    Online
                  </label>
                  <input
                    id="onlineTrue"
                    type="radio"
                    name="isOnline"
                    value={true}
                    checked={formData.isOnline === "true"}
                    onChange={handleInputChange}
                  />

                  <label
                    htmlFor="onlineFalse"
                    style={{ display: "inline-block", marginBottom: "0px" }}
                  >
                    Physical
                  </label>
                  <input
                    id="onlineFalse"
                    type="radio"
                    name="isOnline"
                    value={false}
                    checked={formData.isOnline === "false"}
                    onChange={handleInputChange}
                  />
                </label>
              </li>
              <li>
                <button type="submit" className="btn-search">
                  Search
                </button>
              </li>
            </ul>
          </form>
          <div className="events">
            <SearchBar
              setFilteredEvents={setFilteredEvents}
              setFilteredUsers={setFilteredUsers}
            />
            {filteredEvents.length > 0 &&
              filteredEvents.map((eventObj, key) => {
                return <EventCard key={key} eventObj={eventObj} />;
              })}
            {filteredUsers.length > 0 &&
              filteredUsers.map((user, key) => {
                return <UserCard key={key} user={user} />;
              })}
            {filteredEvents.length === 0 &&
              filteredUsers.length === 0 &&
              latestEvents.length > 0 &&
              latestEvents.map((eventObj, key) => {
                return <EventCard key={key} eventObj={eventObj} />;
              })}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
