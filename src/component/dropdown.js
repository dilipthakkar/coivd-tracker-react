import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import Store from "../redux/store"
import {setCountry} from "../redux/actions"
// import { Container } from './styles';

function Dropdown() {
  // a state that holds information of countries 
  const [countryList , setCountryList] = useState([]);

    // to load all data from fetching a api 
    const preload = ()=>{
        const loadData = async()=>{
          
            fetch("https://disease.sh/v3/covid-19/countries")
              .then((response) => response.json())  // convert data into json
              .then((data) => {
                const countries = data.map((item) => ({
                  name: item.country,
                  code: item.countryInfo.iso3,
                }));
                //setting data in our state
                setCountryList(countries);
              });
        }
        loadData();
    }

    useEffect(()=>{
      // to load data before component load
        preload();
    },[])

    // to style dropdown - this code is copy from official docs of material UI
    const useStyles = makeStyles((theme) => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }));
    const classes = useStyles();


    // function that handle the changes whenever we select an option 
    const onHandleChange = (event)=>{
        Store.dispatch(setCountry(event.target.value));
    }



  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Age"
          onChange={onHandleChange}
        >
          <MenuItem value="worldwide">
            <em>Worldwide</em>
          </MenuItem>
          {countryList.map(item=>(
              <MenuItem value={item.code}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;