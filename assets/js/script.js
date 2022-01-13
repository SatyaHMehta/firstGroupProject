var inputEl = document.querySelector("#search-bar")
var formEl = document.querySelector("form")
var barHistory = document.querySelector("#bar-history")
selectedBars = []

function getBarVal() {
  const city = document.getElementById("search-bar").value;
  fetch(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${city}&categories=danceclubs`,
    {
      headers: {
        // my api key
        // Authorization:
        //   "Bearer GVUhoebZxMFnk5DtlEDRJjH5YkakjwmzRp-hi2zCxyKwXsYaBmvNDNQslyWp6SO6jPr5fFZGNzAWPGnT1o5w443vHe9Zxv7KNxIsZDFNYtgSLQEGmDTeNudeUtXdYXYx",
        // back-up key
        // "Authorization": 'Bearer GVUhoebZxMFnk5DtlEDRJjH5YkakjwmzRp-hi2zCxyKwXsYaBmvNDNQslyWp6SO6jPr5fFZGNzAWPGnT1o5w443vHe9Zxv7KNxIsZDFNYtgSLQEGmDTeNudeUtXdYXYx'
        //3rd api key
        Authorization:
          "bearer PUihWdj-17gdl98pdBSeYX0398u9kpVDNov6R1RBZgSdEJo-JHYcnkesMW68cQbq20N9W-Lyq9Sy8canmTCMMFpWPU4jaucRA05M3uYOBHJMYJkvJtb2iD2F3T_gYXYx"
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((bars) => {
      console.log(bars.businesses.length);
      console.log(bars.businesses[0].location.address1);
      console.log(bars.businesses[0].name);
      console.log(bars.businesses[0].phone);
      console.log(bars.businesses[0].rating);
      console.log(bars.businesses[0].price);
      console.log(bars.businesses[0].review_count);
      console.log(bars.businesses[0].image_url);
      var numbOfBars = bars.businesses;
      console.log(numbOfBars.length);
    });
}
function generateCards(bars) {
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

  let barData = [
    bars.businesses[0].name,
    bars.businesses[0].location.address1,
    bars.businesses[0].phone,
    bars.businesses[0].rating,
    bars.businesses[0].image_url,
    bars.businesses[0].review_count,
  ];

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
    element.textContent = barData[i];
    barsDivEl.appendChild(element);
  });
}
// function getRoute() {
//     var mapquestAPIKey = "WeZEsw4t2Noh16Z4ncHYhvHRntkQzwpG"
//     var getRoute = "http://www.mapquestapi.com/directions/v2/route?key=" + mapquestAPIKey + "&from=" + selectedBars[0] + "&to=" + selectedBars[1,2,3,4]

//     fetch(getRoute).then(function(response) {
//         return response.json()
//     }).then(function(data) {
//         console.log(data)
//     })
// }
// getRoute()

formEl.addEventListener("submit", function (e) {
  e.preventDefault()
  var searchValue = inputEl.value.trim()

  if(!searchValue) {
      return
  }

  selectedBars.push(searchValue)
  inputEl.value = ""
  generateBtns()
})

function loadLocal() {
  var barHistoryBtns = localStorage.getItem("bars")
  if (barHistoryBtns) {
      selectedBars = JSON.parse(barHistoryBtns)
      generateBtns()
  }
}

function generateBtns() {
  for (var i = 0; i < selectedBars.length; i++) {
      var bar = selectedBars[i]
      var newBtn = document.createElement("button")

      newBtn.textContent = bar
      newBtn.setAttribute("data-value", bar)
      newBtn.setAttribute("class", "button success expanded")
      barHistory.append(newBtn)
  }

  localStorage.setItem("bars", JSON.stringify(selectedBars))
}

loadLocal()

function getAddress() {
  
}

var map,
  dir;
map = L.map('map', {
  layers: MQ.mapLayer(),
  center: [ 38.895345, -77.030101 ],
  zoom: 15
});
dir = MQ.routing.directions();
dir.route({
  locations: [
    '1600 pennsylvania ave, washington dc',
    '935 pennsylvania ave, washington dc'
  ]
});
map.addLayer(MQ.routing.routeLayer({
  directions: dir,
  fitBounds: true
}));

