import styles from "./app.module.css";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";
import { useEffect, useState } from "react";

export default function App() {
  const [stats, setStats] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  useEffect(() => {
    const getData = fetchData(selectedCountry);
    // setStats(getData);
    getData
      .then((data) => {
        setStats(data);
        console.log("😀", data);
      })
      .catch((err) => console.log(err));
  }, [selectedCountry]);

  function handleChange(country) {
    setSelectedCountry(country);
    console.log(country);
  }

  return (
    <div className={styles.container}>
      <Cards info={stats} />
      <CountryPicker handleChange={handleChange} />
      <Chart info={stats} country={selectedCountry} />
    </div>
  );
}
