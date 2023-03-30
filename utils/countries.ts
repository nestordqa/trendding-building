const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuZHFhOTZAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiNi1wVEtMRWtnajhGWUsxbUVvTGJkVmRZVTRsOVVHZ01YM0w0RDUtQ29rRXJtcUJkcXQ0SndYWDVHNHRVUjBuT1NvUSJ9LCJleHAiOjE2ODAyOTU2NjV9.Zdash1C6L4eu7UR0ptUVo16awZof2hPX2D_RvspdAT4";
const url = "https://www.universal-tutorial.com/api";

export const getCountries = async()=>{
    const data = await fetch(`${url}/countries`,{
        method: "GET",
        headers:{
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    const countries = await data.json();
    if(!countries) return "There's no countries!";
    if(countries) return countries;

};

export const getStates = async(country : String) =>{
    const data = await fetch(`${url}/states/${country}`,{
        method: "GET",
        headers:{
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    const states = await data.json();
    if(!states) return "There's no states!";
    if(states) return states;
    
};

export const getCities = async(state : String) =>{
    const data = await fetch(`${url}/cities/${state}`,{
        method: "GET",
        headers:{
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    const cities = await data.json();
    if(!cities) return "There's no cities!";
    if(cities) return cities;
    
};