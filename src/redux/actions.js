//return a action object after settign the type of action and payload
export const setCountry = (country) => {
    return {
        type: "setCountry",
        payload: {
            currentCountry: country,
        },
    };
}

export const setLoading2 = (loading) => {
    return {
        type: "setLoading",
        payload: {
            loading: loading
        },
    }
}