







































































function getBarVal() {
  const city = document.getElementById("search-bar").value;
  fetch(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${city}&categories=danceclubs`,
    {
      headers: {
        // my api key
        Authorization:
          "Bearer GVUhoebZxMFnk5DtlEDRJjH5YkakjwmzRp-hi2zCxyKwXsYaBmvNDNQslyWp6SO6jPr5fFZGNzAWPGnT1o5w443vHe9Zxv7KNxIsZDFNYtgSLQEGmDTeNudeUtXdYXYx",
        // back-up key
        // "Authorization": 'Bearer GVUhoebZxMFnk5DtlEDRJjH5YkakjwmzRp-hi2zCxyKwXsYaBmvNDNQslyWp6SO6jPr5fFZGNzAWPGnT1o5w443vHe9Zxv7KNxIsZDFNYtgSLQEGmDTeNudeUtXdYXYx'
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((bars) => {
      console.log(bars);
      console.log(bars.businesses[0].location.address1);
      console.log(bars.businesses[0].name);
      console.log(bars.businesses[0].phone);
      console.log(bars.businesses[0].rating);
      console.log(bars.businesses[0].price);
      console.log(bars.businesses[0].review_count);
      console.log(bars.businesses[0].image_url);
      generateCards();
    });
}
function generateCards() {
  let barsDivEl = document.getElementById("bars-div");

let barInfo = [
  document.createElement("div"),
  document.createElement("h2"),
  document.createElement("span"),
  document.createElement("span"),
  document.createElement("span"),
  document.createElement("a"),
  document.createElement("span"),
];

// let barData = [
//   bars.businesses[0].name,
//   bars.businesses[0].location.address1,
//   bars.businesses[0].phone,
//   bars.businesses[0].rating,
//   bars.businesses[0].image_url,
//   bars.businesses[0].review_count,
// ]

let barId = [
  "card",
  "bar-name",
  "bar-address",
  "bar-phone-number",
  "bar-rating",
  "bar-image",
  "bar-review-count",
];
barInfo.forEach((element, i) => {
  element.setAttribute("id", barId[i]);
  // element.textContent = barData[i];
  barsDivEl.appendChild(element);

});
}

