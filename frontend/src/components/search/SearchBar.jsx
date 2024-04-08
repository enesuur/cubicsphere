import { useState ,useEffect} from "react";
import useDebounce from "../../hooks/useDebounce";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm,1000);
  console.log(debouncedSearchTerm)
//   useEffect(() => {
//     if (debouncedSearchTerm.trim() !== "") {
//       fetch(`http://127.0.0.1:5000/events/filter-events`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ searchQuery: debouncedSearchTerm }),
//       })
//         .then(async (response) => {
//           if (response.status === 200) {
//             const data = await response.json();
//           } else if (response.status === 404 || response.status === 400) {
//             const data = await response.json();
//           }
//         })
//         .catch((error) => {
//           console.error("Hata:", error);
//         });
//     }
//   }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
