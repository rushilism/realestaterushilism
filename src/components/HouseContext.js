import React, { createContext, useState, useEffect } from 'react';

// import data
import { housesData } from '../data';

// create context
export const HouseContext = createContext();

// provider
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [day, setDay] = useState('Day (any)');
  const [days, setDays] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // return all countries
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // remove duplicates
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
  }, []);

  useEffect(() => {
    // return only countries
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // remove duplicates
    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];

    // set countries state
    setProperties(uniqueProperties);
  }, []);

  useEffect(() => {
    // return all countries
    const allDays = houses.map((house) => {
      return house.day;
    });

    // remove duplicates
    const uniqueDays = ['Day (any)', ...new Set(allDays)];

    // set countries state
    setDays(uniqueDays);
  }, []);

  const handleClick = () => {
    setLoading(true);
    // check the string if includes '(any)'
    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };

    // get first string (price) and parse it to number
    const minPrice = parseInt(price.split(' ')[0]);
    // get last string (price) and parse it to number
    const maxPrice = parseInt(price.split(' ')[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      // all values are selected
      if (
        house.country === country &&
        house.type === property &&
        house.day === day &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      // all values are default
      if (isDefault(country) && isDefault(property) && isDefault(day) && isDefault(price)) {
        return house;
      }
      // country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(day) && isDefault(price)) {
        return house.country === country;
      }
      // property is not default
      if (!isDefault(property) && isDefault(country) && isDefault(day) && isDefault(price)) {
        return house.type === property;
      }

      //  day  is not default
      if (isDefault(country) && isDefault(property) && !isDefault(day) && isDefault(price)) {
        return  house.day === day;
      }

      // price is not default
      if (!isDefault(price) && isDefault(country) && isDefault(property) && isDefault(day)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }
      // country and property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(day) && isDefault(price)) {
        return house.country === country && house.type === property;
      }
      // country and price is not default
      if (!isDefault(country) && isDefault(property) && isDefault(day) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }
      // property and price is not default
      if (isDefault(country) && !isDefault(property) && isDefault(day) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
       // country , day and property is not default
       if (!isDefault(country) && !isDefault(property) && !isDefault(day) && isDefault(price)) {
        return house.country === country && house.type === property && house.day === day;
      }

       // property, day and price is not default
       if (isDefault(country) && !isDefault(property) && !isDefault(day) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property && house.day ===day;
        }
      }
       // country, day and price is not default
       if (!isDefault(country) && isDefault(property) && !isDefault(day) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country && house.day === day;
        }
      }

      // country , day  is not default
      if (!isDefault(country) && isDefault(property) && !isDefault(day) && isDefault(price)) {
        return house.country === country && house.day === day;
      }
       
      //  day and property is not default
      if (isDefault(country) && !isDefault(property) && !isDefault(day) && isDefault(price)) {
        return  house.type === property && house.day === day;
      }

       //  day and price is not default
       if (isDefault(country) && isDefault(property) && !isDefault(day) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return  house.day === day;
        }
      }
    });
    
    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        day,
        setDay,
        days,
        price,
        setPrice,
        handleClick,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;