import React, { useState, useEffect } from "react";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { SFMoviesData, getMovieDetails } from "../api-data";
import Autocomplete from 'react-autocomplete';

import "../styles/global.css";

type Props = {
  setSelected: Function;
};

const PlacesAutoComplete: React.FC<Props> = ({ setSelected }: Props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (movieName: string) => {
    console.log(movieName);
    const res = getMovieDetails(movieName);
    res.map((movie) => {
      handleSelect(movie.locations);
    });
    // setSearchTerm(e.target.value);
    clearSuggestions();
  };

  //call getMoviesByTitle if search term is changed 
  // useEffect(() => {
  //   if (searchTerm.length > 2) {
  //     const res = getMoviesByTitle(searchTerm);

  //     console.log();
  //     setSelected(res);
  //   }
  // }, [searchTerm]);


  const handleSelect = async (address: any) => {
    console.log(address);
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Combobox onSelect={useMovieSearch}>
    //   <ComboboxInput
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //     disabled={!ready}
    //     placeholder="Enter an address"
    //     className="combobox-input"
    //   />
    //   <ComboboxPopover>
    //     <ComboboxList aria-labelledby="demo">
    //       {status === "OK" &&
    //         movies.map(({ place_id, description }) => (
    //           <ComboboxOption key={place_id} value={description} />
    //         ))}
    //     </ComboboxList>
    //   </ComboboxPopover>
    // </Combobox>
    <div className="autocomplete-wrapper">
      <Autocomplete
        getItemValue={(item) => item.title}
        items={SFMoviesData()}
        renderItem={(item, isHighlighted) =>
          <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
            {item.title}
          </div>
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSelect={(val: string) => handleSearch(val)}
        renderMenu={item => (
          <div className="dropdown">
            {item}
          </div>
        )}
        // shouldItemRender={() => renderMovieTitle(searchTerm)}
        // shouldItemRender={renderMovieTitle}
        // placeholder="Search for a movie"
      />
    </div>

  );
};

export default PlacesAutoComplete;

