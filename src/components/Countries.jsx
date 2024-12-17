import React, { useEffect, useState } from 'react';
import Country from './Country';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  
  let debounceTimer; // Declare debounceTimer variable (not in state)

  const debounceSearch = (inputText) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredCountries(filtered.slice(0, 3));
  };

  const changeHandler = (e) => {
    const value = e.target.value;
    setInputText(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      debounceSearch(value);
    }, 500);
  };

  useEffect(() => {
    const url = "https://restcountries.com/v3.1/all";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        value={inputText}
        onChange={changeHandler}
        type="text"
        placeholder="Search for a country"
        style={{ width: '40%', marginTop: '30px', padding: '8px' }}
      />
      <div style={{ margin: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            <Country name={country.name.common} flag={country.flags.png} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
