var inputEl = document.querySelector("#search-bar");
var formEl = document.querySelector("form");
var barHistory = document.querySelector("#bar-history");
var getRoute = document.querySelector("#generate-route");
var barDiv = document.querySelector("#bars-div");
selectedBars = [];
barAddress = [];

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
          "bearer PUihWdj-17gdl98pdBSeYX0398u9kpVDNov6R1RBZgSdEJo-JHYcnkesMW68cQbq20N9W-Lyq9Sy8canmTCMMFpWPU4jaucRA05M3uYOBHJMYJkvJtb2iD2F3T_gYXYx",
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
      var numbOfBars = bars.businesses;
      console.log(numbOfBars.length);
      for (var i = 0; i < bars.businesses.length; i++) {
        generateCards(bars, i);
      }
    });
}
function generateCards(bars, i) {
  let barsDivEl = document.getElementById("bars-div");
  let barCardEl = document.createElement("div");
  barCardEl.setAttribute("id", "card");
  barsDivEl.appendChild(barCardEl);
  let barImageEl = document.createElement("img");
  barImageEl.setAttribute("id", "bar-image");
  barImageEl.src = bars.businesses[i].image_url;
  barCardEl.appendChild(barImageEl);
  let barInfoEl = document.createElement("div");
  barInfoEl.setAttribute("id", "card-information");
  barCardEl.appendChild(barInfoEl);
  let addBtn = document.createElement("button");
  addBtn.innerHTML = "Add";
  addBtn.classList.add("addBtn");
  barCardEl.appendChild(addBtn);

  let barInfo = [
    document.createElement("h2"),
    document.createElement("span"),
    document.createElement("span"),
    document.createElement("span"),
    document.createElement("span"),
  ];

  let barData = [
    bars.businesses[i].name,
    bars.businesses[i].location.address1,
    bars.businesses[i].phone,
    bars.businesses[i].rating,
    bars.businesses[i].review_count,
  ];

  let barId = [
    "bar-name",
    "bar-address",
    "bar-phone-number",
    "bar-rating",
    "bar-review-count",
  ];
  barInfo.forEach((element, i) => {
    element.setAttribute("id", barId[i]);
    element.textContent = barData[i];
    barInfoEl.appendChild(element);
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
  e.preventDefault();
  var searchValue = inputEl.value.trim();

  if (!searchValue) {
    return;
  }

  inputEl.value = "";
});

function loadLocal() {
  var barHistoryBtns = localStorage.getItem("bars");
  if (barHistoryBtns) {
    selectedBars = JSON.parse(barHistoryBtns);
  }
}


barDiv.addEventListener("click", function (e) {
  //console.log("Hey")
  if (e.target.matches(".addBtn")) {
    console.log(e);
    //console.log(this)
    var clickedBtn = e.target;
    var barName = clickedBtn.parentElement.children[1].children[0].innerHTML;
    var barAddress = clickedBtn.parentElement.children[1].children[1].innerHTML;
    console.log(barName);
    var newBtn = document.createElement("button");

    newBtn.textContent = barName;
    newBtn.setAttribute("data-value", barAddress);
    newBtn.setAttribute("class", "button success expanded");
    barHistory.append(newBtn);
    localStorage.setItem("bars", JSON.stringify(barAddress));
  }
});

loadLocal();
////////////////////////////////////////////////
// function getAddress() {
//   var address = address1
//   var route = barAddress[i]

//   for (var i = 0; i < barHistory.length; i++) {
//     var address = address1
//     barAddress.push(address)
//     var route = barAddress[i];
//     locations.push(route)
//   }
// }

// getRoute.addEventListener("click", function(e) {
//   getAddress()
// })
/////////////////////////////////////////////////

var map, dir;
map = L.map("map", {
  layers: MQ.mapLayer(),
  center: [38.895345, -77.030101],
  zoom: 15,
});
dir = MQ.routing.directions();
dir.route({
  locations: [],
});
map.addLayer(
  MQ.routing.routeLayer({
    directions: dir,
    fitBounds: true,
  })
);
