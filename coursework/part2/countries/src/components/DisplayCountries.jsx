import React from "react";

function CountryList({ countries }) {
  return (
    <>
    {countries.length !== 1 ?
        <ul>
            {countries.map((country) => (
                <li key={countries.indexOf(country)}>{country.name.common}</li>
            ))}
        </ul>
        :
        <div>
            {countries.map((country) => (
                <>
                    <h2>{country.name.common}</h2>
                    <span>Capital: {country.capital}</span>
                    <br />
                    <span>Population: {country.population}</span>

                    <h3>Languages spoken:</h3>
                    <ul>
                        {Object.values(country.languages).map((value) => (
                            <li>{value}</li>
                        ))}
                    </ul>

                    <img src={country.flags.png} alt={country.flags.alt} />
                </>
            ))}
        </div>
    }
    </>
  );
}

export default CountryList;