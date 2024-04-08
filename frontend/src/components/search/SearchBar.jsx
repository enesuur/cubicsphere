import { useState,useEffect } from 'react';

export default function SearchBar({ onSearch }){
    const [searchTerm, setSearchTerm] = useState('');

    const debounce = (func, delay) => {
        let timer;
        return function(...args) {
            const context = this;
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const handleSearch = debounce((searchQuery) => {
        onSearch(searchQuery);
    }, 300);

    const handleChange = (event) => {
        const query = event.target.value;
        setSearchTerm(query);
        handleSearch(query);
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/events/filter-events`, {
          method: "POST",
          credentials: "include",
        })
          .then(async (response) => {
            if (response.status === 200) {
              const data = await response.json();
              console.log(data)
            }
            if (response.status === 404 || response.status === 400) {
              const data = await response.json();
            }
          })
          .catch((error) => {
            setMessage(error.message);
          });
      }, []);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};
