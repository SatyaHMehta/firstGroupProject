// function getInputValue() {
//   // Selecting the input element and get its value
//   var inputVal = document.getElementById("myInput").value;
//   var ageValEl = document.getElementById("ageVal");
//   var ageCalc = 21 - inputVal;
//   // Displaying the value
//   console.log(inputVal);
//   console.log(ageValEl.textContent);
//   if (inputVal < 20) {
//     ageValEl.textContent = "Try in " + ageCalc + " more years";
//   } else if (inputVal < 21) {
//     ageValEl.textContent = "Try in " + ageCalc + " more year";
//   } else {
//     location.href = "index_2.html";
//   }
// }

// function letsExplore() {
//   var enterAge = document.querySelector(".enterAge");
//   var exploreBtn = document.querySelector(".explore");

//   enterAge.setAttribute("class", "show");
//   exploreBtn.setAttribute("class", "hide");
//   exploreBtn.setAttribute("value", "text");
// }

// const array = ["a", "b", null, undefined, "", 0, 1];
// function countTruthy(array,) {
//   let truthyValues = 0;
//   array.forEach((element) => {
//     if(element) {
//         truthyValues++
//     }
//   });
//   console.log(truthyValues);
// }
// countTruthy(array)

// var count = 0;
// for(i=0; i<array.length; i++){
//     if(array[i]){
//         count++;
//     }
// }
// console.log(count)

function redundant(str) {
  return function(){
    return function(){
      return function(){
        return str;
      }
    }
  }
}
var f1 = redundant('apple')()()();
console.log(f1)

// var square = function square(x) {
//   return x*x;
// };
// var ans = square(5)
// console.log(ans)