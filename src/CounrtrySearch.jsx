import React, { useEffect, useState } from 'react';

const CountrySearch = () => {
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCountries = apiData.filter((country) => {
    const countryName = country.name?.common || '';
    return countryName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="wrapper">
      <div className="headerStyle">
        <input
          type="text"
          placeholder="Search for countries..."
          className="searchStyle"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '700px', height: '40px', fontSize: '16px', padding: '5px 10px' }}
        />
      </div>
      <div className="countryContainer" >
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.cca3} >
            <img src={country.flags?.svg || country.flags?.png} alt={`${country.name.common} flag`}  />
            <h2 style={{ fontSize: '18px', margin: '10px 0' }}>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountrySearch;
