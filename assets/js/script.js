var yelpUrl = "https://api.yelp.com/v3/businesses/search";
var yelpKey =
  "GVUhoebZxMFnk5DtlEDRJjH5YkakjwmzRp-hi2zCxyKwXsYaBmvNDNQslyWp6SO6jPr5fFZGNzAWPGnT1o5w443vHe9Zxv7KNxIsZDFNYtgSLQEGmDTeNudeUtXdYXYx";

function getBars() {
    var getBars = "https://api.yelp.com/v3/businesses/search" + yelpKey
  fetch(yelpUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
getBars();