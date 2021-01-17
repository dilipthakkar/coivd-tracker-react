import React, { useEffect, useState } from "react";
import "../styles/table.css"
// import { Container } from './styles';

// a function to check if 'b' is prefix of 'a' or not
const prefixmatch = (a, b) => {
  if (a.length < b.length) {
    return false;
  }
  // match every single character of b to a 
  for (var i = 0; i < b.length; i++) {
    if (a.slice(i, i + 1).toUpperCase() != b.slice(i, i + 1).toUpperCase()) {
      return false;
    }
  }
  return true;
};


function Sidepanel() {
  // store data of all countries 
  const [countriesdata, setCountriesdata] = useState([]);
  //fetch text from search bar
  const[searchlist , setSearchlist] = useState([]);

  const preload = () => {
    const loadData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json()) //change response to json 
        .then((data) => {
          // store data sent by API to an array of object
          const countries = data.map((item) => ({
            // creating an object from data
            name: item.country,
            code: item.countryInfo.iso3,
            todaycases: item.todayCases,
          }));
          //set country data
          setCountriesdata(countries);
          // the search list is shown to user so set all data to this list....
          // we will filter this later
          setSearchlist(countries);
        });
    };
    loadData();
  };

  // to handle changes whenever we type something in search bar
  const onHandleChange = (event)=>{
    //create a empty list
      var newlist = []
      countriesdata.map(item=>{
        // we country name matches to our search bar text then add it to new list else skip
          if(prefixmatch(item.name , event.target.value)){
              newlist.push(item);
          }
      })
      // set this new list to show user 
      setSearchlist(newlist);
      
  }

  useEffect(() => {
    //to load data before component load
    preload();
  }, []);

  return (
    <div>
      {/** searchVeiw */}
      <input onChange={onHandleChange} className="container-fluid" />
      {/** table */}
      <div className="tablepanel">
        <table>
          <thead>
            <tr>
              <th scope="col" className="table__headingtext">
                Country
              </th>
              <th scope="col" className="table__headingtext">
                Today cases
              </th>
            </tr>
          </thead>
          <tbody>
            {searchlist &&
              searchlist.length > 0 &&
              searchlist.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.todaycases}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sidepanel;
