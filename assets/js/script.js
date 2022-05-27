var inputEl = document.querySelector("#search-bar");
var formEl = document.querySelector("form");
var barHistory = document.querySelector("#bar-history");
var getRoute = document.querySelector("#generate-route");
var clearList = document.querySelector("#clear-list");
var barDiv = document.querySelector("#bars-div");
var removeCard = document.querySelector("#cardEl");
var sortableDiv = $(".sortable");
barAddress = [];
var addresses = [];
var localStorageBars = [];
var localStorageBarNames = [];
const barLocation = {};
const waypts = [];

const lastSearches = JSON.parse(localStorage.getItem("bars")) ?? [];
const lastSearches2 = JSON.parse(localStorage.getItem("barName")) ?? [];
var barHistory = document.querySelector("#bar-history");
lastSearches.forEach((address, i) => {
  var barName2 = lastSearches2[i];
  var newBtn2 = document.createElement("button");

  newBtn2.textContent = barName2;
  newBtn2.setAttribute("id", "cardEl");
  newBtn2.setAttribute("data-value", address);
  newBtn2.setAttribute("class", "button success expanded");
  newBtn2.setAttribute("onclick", "removeBtn()");
  sortableDiv.append(newBtn2);
});

//set map options
var myLatLng = { lat: 38.346, lng: -0.4907 };
var mapOptions = {
  center: myLatLng,
  zoom: 7,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

//create map
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//define calcRoute function
function calcRoute() {
  //create request
  var request = {
    origin: addresses[0],
    destination: addresses[addresses.length - 1],
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.WALKING, //WALKING, BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  //pass the request to the route method
  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      //display route
      directionsDisplay.setDirections(result);
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      //center map in London
      map.setCenter(myLatLng);

      //show error message
      output.innerHTML =
        "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
    }
  });
}


function getBarVal() {
  localStorage.clear();
  const city = document.getElementById("search-bar").value;
  fetch(
    ` https://floating-headland-95050.herokuapp.com/api.yelp.com/v3/businesses/search?location=${city}&categories=danceclubs`,
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
      barLocation.latitude = bars.region.center.latitude;
      barLocation.longitude = bars.region.center.longitude;
      // console.log(bars.businesses[0].location.address1);
      // console.log(bars.businesses[0].name);
      // console.log(bars.businesses[0].phone);
      // console.log(bars.businesses[0].rating);
      // console.log(bars.businesses[0].price);
      // console.log(bars.businesses[0].review_count);
      // console.log(bars.businesses[0].image_url);
      document.getElementById("error-msg").innerHTML = "";
      var numbOfBars = bars.businesses;
      for (var i = 0; i < bars.businesses.length; i++) {
        generateCards(bars, i);
      }
    })
    .catch((err) => {
      document
        .getElementById("error-msg")
        .setAttribute("style", "color: red; font-weight: bold");
      document.getElementById("error-msg").innerHTML =
        "please enter a valid city";
    });
}
function generateCards(bars, i) {
  let barLocation = {
    latitude: bars.businesses[i].coordinates.latitude,
    longitude: bars.businesses[i].coordinates.longitude,
  };
  console.log(barLocation);
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
  rating = bars.businesses[i].rating;
  let barInfo = [
    document.createElement("h2"),
    document.createElement("span"),
    document.createElement("span"),
    document.createElement("span"),
    document.createElement("span"),
  ];

  let barData = [
    bars.businesses[i].name,
    bars.businesses[i].location.display_address[0] +
      " " +
      bars.businesses[i].location.display_address[1],
    "phone: " + bars.businesses[i].phone,
    "rating: " + `${"⭐"}`.repeat(Math.round(rating)),
    "reviews: " + bars.businesses[i].review_count,
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
    element.setAttribute("latitude", barLocation.latitude);
    element.setAttribute("longitude", barLocation.longitude);
    element.textContent = barData[i];
    barInfoEl.appendChild(element);
  });
}

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  var searchValue = inputEl.value.trim();

  if (!searchValue) {
    return;
  }

  inputEl.value = "";
});

barDiv.addEventListener("click", function (e) {
  if (e.target.matches(".addBtn")) {
    var clickedBtn = e.target;
    var barName = clickedBtn.parentElement.children[1].children[0].innerHTML;
    var barAddress = clickedBtn.parentElement.children[1].children[1].innerHTML;
    var barLatitude =
      clickedBtn.parentElement.children[1].children[0].getAttribute("latitude");
    var barLongitude =
      clickedBtn.parentElement.children[1].children[0].getAttribute(
        "longitude"
      );
    var newBtn = document.createElement("button");

    newBtn.textContent = barName;
    newBtn.setAttribute("id", "cardEl");
    newBtn.setAttribute("latitude", barLatitude);
    newBtn.setAttribute("longitude", barLongitude);
    newBtn.setAttribute("data-value", barAddress);
    newBtn.setAttribute("class", "button success expanded");
    newBtn.setAttribute("onclick", "removeBtn()");
    sortableDiv.append(newBtn);

    const previousSearches = JSON.parse(localStorage.getItem("bars")) ?? [];
    const previousSearches2 = JSON.parse(localStorage.getItem("barName")) ?? [];
    localStorage.setItem(
      "bars",
      JSON.stringify([barAddress, ...previousSearches])
    );
    localStorage.setItem(
      "barName",
      JSON.stringify([barName, ...previousSearches2])
    );
  }
});

function removeBtn() {
  var elem = document.querySelector("#cardEl");
  elem.parentNode.removeChild(elem);
}

clearList.addEventListener("click", function (e) {
  e.preventDefault;
  sortableDiv.html("");
  localStorage.clear()
});

// create directions service object to use the route method and get a result for our request.

// let directionsService = new google.maps.DirectionService();

getRoute.addEventListener("click", function (e) {
  ;
  address = [];
  const selectedBars = document.querySelectorAll("#cardEl");
  console.log(selectedBars);
  selectedBars.forEach((bar) => addresses.push(bar.getAttribute("data-value")));
  if (selectedBars.length > 1) {
    for (let i = 1; i < selectedBars.length - 1; i++) {
      waypts.push({
        location: selectedBars[i].getAttribute("data-value"),
        stopover: true,
      });
    }
    console.log(waypts);
  }
  console.log(addresses[0], addresses[addresses.length - 1]);
  calcRoute(addresses[0], addresses[addresses.length - 1]);
});
