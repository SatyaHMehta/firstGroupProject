var inputEl = document.querySelector("input[name=city")
var formEl = document.querySelector("form")
var barHistory = document.querySelector("bar-history")
selectedBars = []

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

formEl.addEventListener("click", function (e) {
  e.preventDefault()
  var searchValue = inputEl.value.trim()

  if(!searchValue) {
      return
  }

  selectedBars.push(searchValue)
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
      newBtn.setAttribute("class", "btn btn-outline-secondary")
      barHistory.append(newBtn)
  }

  localStorage.setItem("bars", JSON.stringify(selectedBars))
}

loadLocal()

function getAddress() {
  
}

