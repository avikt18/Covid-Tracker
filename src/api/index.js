import axios from "axios";

const url = "https://covid19.mathdro.id/api";

async function fetchData(country) {
  try {
    let changeableUrl = url;
    changeableUrl += country ? `/countries/${country}` : "";
    console.log(changeableUrl);
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(changeableUrl);
    const data = { confirmed, recovered, deaths, lastUpdate };
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function fetchDailyData() {
  try {
    const { data } = await axios.get(url + "/daily");
    // console.log(data);
    const processedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }));
    console.log(processedData);

    return processedData;
  } catch (err) {
    console.log(err);
  }
}

async function fetchCountries() {
  try {
    const {
      data: { countries }
    } = await axios.get(`${url}/countries`);
    // console.log(countries);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
}

export { fetchData, fetchDailyData, fetchCountries };
