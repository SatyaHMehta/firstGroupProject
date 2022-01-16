var inputEl = document.querySelector("#search-bar");
var formEl = document.querySelector("form");
var barHistory = document.querySelector("#bar-history");
var getRoute = document.querySelector("#generate-route");
var clearList = document.querySelector("#clear-list")
var barDiv = document.querySelector("#bars-div");
var removeCard = document.querySelector("#cardEl")
barAddress = [];
var addresses = [];
barTitle = []

function getBarVal() {
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
    bars.businesses[i].location.display_address[0] + " " + bars.businesses[i].location.display_address[1],
    console.log(bars.businesses[i].location.display_address[0],bars.businesses[i].location.display_address[1]),
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

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  var searchValue = inputEl.value.trim();

  if (!searchValue) {
    return ;
  }
  
  inputEl.value = "";
});



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
    newBtn.setAttribute("id", "cardEl")
    newBtn.setAttribute("data-value", barAddress);
    newBtn.setAttribute("class", "button success expanded");
    newBtn.setAttribute("onclick", "removeBtn()")
    barHistory.append(newBtn);
    localStorage.setItem("bars", JSON.stringify(barAddress));
    localStorage.setItem("barname", JSON.stringify(barTitle))

    barTitle.push(barName)
  }
});

function removeBtn() {
  var elem = document.querySelector('#cardEl');
  elem.parentNode.removeChild(elem);
 }

clearList.addEventListener("click", function(e) {
  (e).preventDefault
  barHistory.innerHTML = ""
})

getRoute.addEventListener('click', function(each){
  each.preventDefault;
  const selectedBars =document.querySelectorAll('#cardEl');
  selectedBars.forEach((bar) =>
  addresses.push(bar.getAttribute('data-value')))
  
  var map, dir;
map = L.map("map", {
  layers: MQ.mapLayer(),
  center: [38.895345, -77.030101],
  zoom: 15,
});
dir = MQ.routing.directions();
dir.route({

  locations: [
    addresses[0],
    addresses[1],
    addresses[2],
    addresses[3],
    addresses[4],
    addresses[5],
    addresses[6],
    addresses[7],
    addresses[8],
    addresses[9],
]
});
map.addLayer(
  MQ.routing.routeLayer({
    directions: dir,
    fitBounds: true,
  })
);
})
// loadLocal()