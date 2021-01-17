import React, { useEffect, useState } from "react";
// import { Line } from '@reactchartjs/react-chart.js'
import { Line, Radar, Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import "../styles/graph.css"

// this is form of data that accepts by Line graph of chart-js
const data = {
    datasets: [{
        label: "New cases",
        fill: true,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        pointBackgroundColor: "rgba(0,43,234)",
    }, ],
};
// these options are predefine by chart-js docs
const options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }, ],
    },
};

// transform data from (data that sent by API) to (data that we want for creating a chart)
const transformformDataForChart = (responseData) => {
    const lables = [];
    const data_cases = [];
    // we use previous for calc the number of new cases because API sent total cases
    var previous = 0;
    for (let key in responseData.cases) {
        previous = `${responseData.cases[key]}`;
        break;
    }
    for (let key in responseData.cases) {
        lables.push(`${key}`);
        data_cases.push(`${responseData.cases[key]}` - previous);
        previous = `${responseData.cases[key]}`;
    }
    data.labels = lables;
    data.datasets[0].data = data_cases;
};



const LineChart = () => {
    // here selector is used for getting state from our redux store
    const selector = useSelector((state) => state.currentCountry);
    // reload is used for reloading the component whenever we change the reload this...
    // is used for force reload
    const [reload, setReload] = useState(false);

    const preload = () => {
        // set url for API
        const url =
            selector == "worldwide" ?
            "https://disease.sh/v3/covid-19/historical/all?lastdays=30" :
            `https://disease.sh/v3/covid-19/historical/${selector}?lastdays=30`;
        const loadData = async() => {
            fetch(url)
                .then((response) => response.json()) // change our response to json
                .then((responseData) => {
                    selector == "worldwide" ?
                        transformformDataForChart(responseData) : transformformDataForChart(responseData.timeline)
                    //force reload
                        setReload(!reload);
                });
        };
        loadData();
    };

    useEffect(() => {
        // load data before component load
        preload();

    }, [selector]); // component load whenever selctor change-> state change of currentCity
    return data.datasets[0].data ? ( <div className = "graph" >
        <div className = "header" >
        <h1 className = "title" > </h1> 
        </div > <Line data = { data }
        options = { options }
        />

        </div>
    ) : ( <div > </div>
    );
};

export default LineChart;