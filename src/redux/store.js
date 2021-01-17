import { createStore } from "redux";
import { reducer } from "./reducer";

// in our initial state we have "worldwide" as currentCountry and 
// our loading is false

const Store = createStore(reducer, { currentCountry: "worldwide", loading: false });

export default Store;