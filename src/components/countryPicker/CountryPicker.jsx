import React, { useEffect, useState } from "react";
import "./country-picker.module.css";
import { fetchCountries } from "../../api";
import { FormControl, NativeSelect } from "@material-ui/core";
import styles from "./country-picker.module.css";

function CountryPicker({ handleChange }) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    async function getCountries() {
      setCountries(await fetchCountries());
    }
    getCountries();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">Global</option>
        {countries.map((c, index) => {
          return (
            <option key={index} value={c ?? "Loading..."}>
              {c ?? "Loading..."}
            </option>
          );
        })}
      </NativeSelect>
    </FormControl>
  );
}

export default CountryPicker;
