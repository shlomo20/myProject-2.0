import { useState } from "react";
import { Un, GEO_API_URL_SEARCH } from "../API/goeApi";
import { AsyncPaginate } from "react-select-async-paginate";
//import { handleInputChange } from "react-select/dist/declarations/src/utils";

export const Search = (() => {
    const [search, setSearch] = useState("");

    const loadOptions = async (inputValue) => {
        if (inputValue === "" || inputValue.length <= 3) {
            return {options:[] || inputValue.length < 3};
        }
        else {
            try{
                const response = await fetch(`${GEO_API_URL_SEARCH}name_startsWith=${inputValue}${Un}`);
                const data = await response.json();
                return {
                    options: data.geonames.map(option => ({
                    value: {
                        name: option.name, 
                        lng:option.lng ,lat: option.lat,
                         state: option.adminCodes1?option.adminCodes1.ISO3166_2 : "na" , 
                        countryCode:option.countryCode,
                        population:option.population
                    },
                    label: option.name+" , "+ `${option.adminCodes1?option.adminCodes1.ISO3166_2 : ""}`+  " "+option.countryCode,
                }))}
            }
            catch(err){
                console.log(err);
            }
        }
    }

    const handleChange = (e) => {
        setSearch('');
        onSearchChange(e);
    }
    const onSearchChange = (search) => {
        console.log(search);
    }
    
    return(
        <AsyncPaginate 
        placeholder="Search for a city"
        debounceTimeout={600}
        defaultOptions={true}
        minLength={3}
        onChange={handleChange}
        value={search}
        noOptionsMessage={(e) =>  e.inputValue.length <= 3?"keep typing... ":"No results found"}
        loadOptions={loadOptions}
        />
    );
})

export default Search;