import React from 'react';

const DataDisplay = ({ data }) => {
  return (
    <table className="countryTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Capital</th>
          <th>Population</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>
        {data.map(country => (
          <tr key={country.name.common}>
            <td>{country.name.common}</td>
            <td>{country.capital}</td>
            <td>{country.population}</td>
            <td>
              <img src={country.flags.png} alt={`${country.name.common} Flag`} width="50" height="30" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataDisplay;
