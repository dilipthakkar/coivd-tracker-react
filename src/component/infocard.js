import React, { useEffect, useState } from "react";
import Store from "../redux/store";
import "../styles/info.css";

import { useDispatch, useSelector } from "react-redux";
import { setLoading2 } from "../redux/actions";

function Infocard({ title, info, classes}) {
  const [countrydata, setCountrydata] = useState({});

  //selector is used for getting state from redux store
  const selector = useSelector((state) => state.currentCountry);
  //dispatch is used for dispathcing actions to store
  const dispatch = useDispatch();
  //classes_ is used for getting classes and setting a string for classes of cards
  const classes_ = "infocard__card inline "+classes; 

  //selecting what info we want to display in card
  const infoselector = () => {
    switch (info) {
      case "totalcase":
        return countrydata.cases;
      case "recovered":
        return countrydata.recovered;
      case "deaths":
        return countrydata.deaths;
      default:
        return 0;
    }
  };

  const preload = () => {
    // now country is set to currentcountry from redux store
    const country = selector;
    // we are loading some data from API
    dispatch(setLoading2(true));
    const loadData = async () => {
      //setting up url for API call
      const url =
        selector === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${country}?strict=true`;
      fetch(url)
        .then((response) => response.json())  // converting data to json 
        .then((data) => {
          // now we get data from API so stop showing loading message
          dispatch(setLoading2(false));
          //set data to our state of component
          setCountrydata(data);
        });
    };
    loadData();
  };

  useEffect(() => {
    // load data before component load
    preload();
  }, [selector]);

  return (
      <div className={classes_}>
        <div className="card-title">
          <h5>{title}</h5>
        </div>
        <h2 className="card-text">{infoselector()} </h2>
      </div>
    );
}

export default Infocard;
