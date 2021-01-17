import "./App.css";
import Dropdown from "./component/dropdown";
import Infocard from "./component/infocard";
import { useSelector } from "react-redux";
import Sidepanel from "./component/sidepanel";
import LineChart from "./component/grpah";
function App() {
  // to fetch laoding information from state
  const selector = useSelector((state) => state.loading);

  // show loading message if loading is true in redux state
  const loadingMsg = () =>
    selector ? (
      <div className="container-fluid app_loader_container row">
        <div className="app_loadingmsg col-6"></div>
      </div>
    ) : (
      <div></div>
    );

  return (
    <div className="app__bodycontainer container-fluid">
      {/** loader */}
      {loadingMsg()}
      {/* header */}
      <div className="app_headercontainer p-4">
        <div className="app__header ">
          <h2>COVID-19 TRACKER</h2>
          {/* dropdown for country */}
          <Dropdown />
        </div>
      </div>
      <div className="app_cardAndpanel row">
        {/* cards for information */}
        <div className="app__infoboxes_main_container">
          <div className="app__infoboxes col-8">
            <Infocard
              className="app_infoboxes_box app__total"
              title="Total cases"
              info="totalcase"
              classes="infocard__total"
            />
            <Infocard
              title="Recovered"
              className=" app_infoboxes_box app__recoveredinfocard"
              info="recovered"
              classes="infocard__recoverd"
            />
            <Infocard
              className="app_infoboxes_box app__death"
              title="Total death"
              info="deaths"
              classes="infocard__deaths"
            />
          </div>
        </div>
        {/** side panel */}
        <div className="sidepanel col-4">
          {/** search view */}
          {/** table */}
          <Sidepanel />
          <div className="app__graph">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
