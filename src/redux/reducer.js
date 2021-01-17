// in reducer we never return original state by changing something in it 
// we always return new object
/*  because in redux both object compare by address to determine that some changes
  are occure in state or not
*/
export const reducer = (state, action) => {
    // choose which task to be perform depends on the type of action
    switch (action.type) {
        case "setCountry":
            return {
                // copy content of all state and change the currentCountry
                ...state,
                currentCountry: action.payload.currentCountry,
            };
        case "setLoading":
            return {
                // copy content of all state and change the loading state
                ...state,
                loading: action.payload.loading,
            };
        default:
            return state;
    }
}