
function getInputValue(){
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("myInput").value;
    var ageValEl = document.getElementById("ageVal");
    // Displaying the value
    console.log(inputVal);
    console.log(ageValEl.textContent);
    if(inputVal<21) {
        ageValEl.textContent = "Try in couple more years";
    }else{
        location.href = "index_2.html"
    }
}

 function letsExplore(){
    var enterAge = document.querySelector(".enterAge");
    var exploreBtn = document.querySelector(".explore");

    enterAge.setAttribute("class", "show")
    exploreBtn.setAttribute("class", "hide")
    exploreBtn.setAttribute("value","text")
 }