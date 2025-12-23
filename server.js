require('dotenv').config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.static("public"));


const randomUserKey = process.env.RANDOM_USER_KEY;
const restCountriesKey = process.env.REST_COUNTRIES_KEY;
const exchangeRateKey = process.env.EXCHANGE_RATE_KEY;
const newsApiKey = process.env.NEWS_API_KEY;

app.get("/api/random-user", async (req, res) => {
  try {

    const userResponse = await axios.get("https://randomuser.me/api/");
    const user = userResponse.data.results[0];
    const countryName = user.location.country;


    const countryResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const country = countryResponse.data[0];


  
const currencyCode = country.currencies
  ? Object.keys(country.currencies)[0]
  : null;


let exchangeRates = { USD: "N/A", KZT: "N/A" };
if (currencyCode) {
  try {
    const rateResponse = await axios.get(
      `https://v6.exchangerate-api.com/v6/${exchangeRateKey}/latest/${currencyCode}`
    );
    exchangeRates = {
      USD: rateResponse.data.conversion_rates.USD,
      KZT: rateResponse.data.conversion_rates.KZT
    };
  } catch (err) {
    console.error("Exchange Rate API error:", err.message);
  }
}




    let news = [];
    if (newsApiKey) {
      const newsResponse = await axios.get(
        `https://newsapi.org/v2/everything?q=${countryName}&language=en&pageSize=5&apiKey=${newsApiKey}`
      );
      news = newsResponse.data.articles.map(article => ({
        title: article.title,
        image: article.urlToImage,
        description: article.description,
        url: article.url
      }));
    }


    const cleanedData = {
      firstName: user.name.first,
      lastName: user.name.last,
      gender: user.gender,
      age: user.dob.age,
      dateOfBirth: user.dob.date,
      city: user.location.city,
      country: countryName,
      address: `${user.location.street.name} ${user.location.street.number}`,
      picture: user.picture.large,
      capital: country.capital ? country.capital[0] : "N/A",
      languages: country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A",
      currency: currencyCode || "N/A",
      flag: country.flags.png,
      rateUSD: exchangeRates.USD,
      rateKZT: exchangeRates.KZT,
      news
    };

    res.json(cleanedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON http://localhost:${PORT}`);
});
