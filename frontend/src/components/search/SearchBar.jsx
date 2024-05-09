import { useState ,useEffect} from "react";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBar( {setFilteredEvents,setFilteredUsers}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm,1000);

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== "") {
      fetch(`http://127.0.0.1:5000/search?q=${debouncedSearchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then(async (response) => {
          if (response.status === 200) {
            const data = await response.json();
            if(data.events){
                setFilteredEvents(data.events);
            }
            if(data.users){
                setFilteredUsers(data.users);
            }
          } else if (response.status === 404 || response.status === 400) {
            if(data.events.length === 0){
                setFilteredEvents([]);
            }
            if(data.users.length === 0){
                setFilteredUsers([]);
            }
          }
        })
        .catch((error) => {
          console.error("Hata:", error);
        });
    }
  }, [debouncedSearchTerm]);

  function handleOnChange(e){
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
        setFilteredEvents([]);
        setFilteredUsers([]);
      } 
  }

  return (
    <input
      type="text"
      placeholder="Search... 🔍"
      value={searchTerm}
      onChange={handleOnChange}
    />
  );
}
