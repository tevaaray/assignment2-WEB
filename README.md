# Random User Info Project

##  Objective
This project demonstrates integration with multiple APIs to retrieve and display user and country information. Users can get a random profile, see country details, exchange rates, and relevant news, all presented in a responsive, visually appealing interface.

---

##  Features

1. **Random User Generator API**  
   - Retrieves a random user from [Random User API](https://randomuser.me/api/).  
   - Displays:
     - First and Last name
     - Gender
     - Profile picture
     - Age and Date of Birth
     - City, Country, Full address

2. **REST Countries API**  
   - Retrieves country information based on user's country.  
   - Displays:
     - Capital city
     - Official languages
     - Currency
     - National flag

3. **Exchange Rate API**  
   - Shows how the user's local currency compares to USD and KZT.  
   - Example: `1 EUR → 1.08 USD`, `1 EUR → 495.20 KZT`.  

4. **News API**  
   - Displays 5 news articles related to the user's country.  
   - Each article includes:
     - Image
     - Headline
     - Short description
     - Link to full article

5. **Responsive Design**  
   - User card centered at the top.  
   - News articles arranged left and right of the user on desktop, adaptively below on smaller screens.  
   - Cards have fixed height, consistent styling, and readable layout on desktop, tablet, and mobile.  

---

## Setup Instructions

1. Clone the repository or unzip the project folder.  

2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the project root and add your API keys:
   ```env
   RANDOM_USER_KEY=dummy_key
   REST_COUNTRIES_KEY=dummy_key
   EXCHANGE_RATE_KEY=YOUR_EXCHANGE_RATE_API_KEY
   NEWS_API_KEY=YOUR_NEWS_API_KEY
4. Start the server:
   ```bash
   node server.js
5. Open your browser and go to:
   ```arduino   
   http://localhost:3000
##  API Usage

Random User API:  https://randomuser.me/api/

REST Countries API: https://restcountries.com/#endpoints

Exchange Rate API: https://www.exchangerate-api.com/

News API: https://newsapi.org/

All API requests are done server-side, and only cleaned, necessary data is sent to the frontend.

---
## Design Decisions

- User card: Centralized, prominent, easy to read.

- News cards: Fixed height, uniform styling, images on top, headline, description, then “Read more” link.

- Responsive layout:

- Desktop: user card in center, 2 news columns left/right.

- Tablet: user card top, news 2 in row under it.

- Mobile: user card top, news single column.

- CSS: Shadows, rounded corners, consistent padding, legible fonts.

- Front-end JS: Handles DOM manipulation and splits news into columns dynamically.

---
## Notes

- Core logic is implemented in server.js and script.js. HTML only contains structure and references.

- API keys are stored in .env for security and scalability.

- Errors from APIs (e.g., missing data) are handled gracefully, defaulting to "N/A" where needed.