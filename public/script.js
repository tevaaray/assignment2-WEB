document.getElementById("btn").addEventListener("click", async () => {
  try {
    const res = await fetch("/api/random-user");
    const data = await res.json();

    
    const leftNews = data.news.slice(0, 2);
    const rightNews = data.news.slice(2, 4);

    document.getElementById("user").innerHTML = `
      <div class="news-column">
        ${leftNews.map(article => `
          <div class="news-article">
            ${article.image ? `<img src="${article.image}">` : ""}
            <h4>${article.title}</h4>
            <p>${article.description || ""}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </div>
        `).join("")}
      </div>

      <div class="user-card">
        <img src="${data.picture}" width="120">
        <h2>${data.firstName} ${data.lastName}</h2>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Age:</strong> ${data.age}</p>
        <p><strong>Date of Birth:</strong> ${new Date(data.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>City:</strong> ${data.city}</p>
        <p><strong>Country:</strong> ${data.country}</p>
        <p><strong>Address:</strong> ${data.address}</p>

        <h3>Country Info</h3>
        <img src="${data.flag}" width="100">
        <p><strong>Capital:</strong> ${data.capital}</p>
        <p><strong>Languages:</strong> ${data.languages}</p>
        <p><strong>Currency:</strong> ${data.currency}</p>
        <p><strong>Exchange Rates:</strong><br>
           1 ${data.currency} → ${data.rateUSD} USD<br>
           1 ${data.currency} → ${data.rateKZT} KZT
        </p>
      </div>

      <div class="news-column">
        ${rightNews.map(article => `
          <div class="news-article">
            ${article.image ? `<img src="${article.image}">` : ""}
            <h4>${article.title}</h4>
            <p>${article.description || ""}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          </div>
        `).join("")}
      </div>
    `;
  } catch (err) {
    console.error("Error fetching data:", err);
    document.getElementById("user").innerHTML = "<p>Failed to load user info.</p>";
  }
});
