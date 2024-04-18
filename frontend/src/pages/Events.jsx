import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import toastNotify from "../utils/toastNotify";
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
        {
          name: "Ege Region",
          cities: ["Muğla", "İzmir", "Denizli", "Uşak"],
        },
      ]
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
    fetch(
      `http://127.0.0.1:5000/event/filter-events?${new URLSearchParams(
        formData
      )}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (response) => {
        if (response.status === 200) {
          const result = await response.json();
          setFilteredEvents(result.data);
          setMessage(result.message);
          toastNotify(response.status, result.message);
        }
        if (response.status === 404 || response.status === 400) {
          const result = await response.json();
          setMessage(result.message);
          toastNotify(response.status, result.message);
        }
      })
      .catch((error) => {
        setMessage(error.message);
        toastNotify(500, error.message);
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
                    value="Social"
                    onChange={handleInputChange}
                    checked={selectedCategory === "Social"}
                  />
                  Social
                </label>
                <label htmlFor="conference">
                  <input
                    type="checkbox"
                    name="category"
                    value="Conference"
                    onChange={handleInputChange}
                    checked={selectedCategory === "Conference"}
                  />
                  Conference
                </label>
                <label htmlFor="webinar">
                  <input
                    type="checkbox"
                    name="category"
                    value="Webinar"
                    onChange={handleInputChange}
                    checked={selectedCategory === "Webinar"}
                  />
                  Webinar
                </label>
                <label htmlFor="meetup">
                  <input
                    type="checkbox"
                    name="category"
                    value="Meetup"
                    onChange={handleInputChange}
                    checked={selectedCategory === "Meetup"}
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

            {filteredEvents.length === 0 &&
              filteredUsers.length === 0 &&
              latestEvents.length === 0 &&
              <p style={{textAlign:"center"}}>
                No events to show.. 🤕
              </p>
            }
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
