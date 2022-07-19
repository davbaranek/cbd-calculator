/**
 * 
 * CONSTANTS
 * 
 */

/**
 * Strength of CBD for different problems
 * 0 = low
 * 1 = low - mid based on experience
 * 2 = mid - high based on experience
 * 3 = high
 */

const problems_strength_const = [
  ["health", 0],
  ["head_pain", 0],
  ["muscle", 1],
  ["menstrual", 2],
  ["arthritis", 2],
  ["bloodpressure", 2],
  ["depression", 2],
  ["sclerosis", 2],
  ["pain", 2],
  ["sleep", 2],
  ["schizophrenia", 2],
  ["epilepsy", 3],
  ["cancer", 3]
];

//How much mg of CBD per a kg based on strength

const weight_dosing_kg_const = {
  low: 0.2,
  mid: 0.6,
  high: 1.2
};

//Const for calculating drops based on mg

const const_mg_dose = 0.5;

/**
 * 
 * END OF CONSTANTS
 * 
 */

// Numbers of sliders

const myWeight_change = document.getElementById("myWeight-change");
const cbdPerc_change = document.getElementById("cbdPerc-change");

// Sliders

const myWeight = document.getElementById("myWeight");
const cbdPerc = document.getElementById("cbdPerc");

myWeight_change.innerHTML = myWeight.value;
cbdPerc_change.innerHTML = cbdPerc.value;


const experience_true = document.getElementById("experience_true"); // Experience Switcher
const reason_checkbox = document.getElementsByClassName("reason_checkbox"); // Reason Checkbox

/**
 * 
 * BUTTONS
 * 
 */


const submit_button = document.getElementById("app_submit_button");
const reset_button = document.getElementById("reset_button");

/**
* Function to handle Submit button
*/

submit_button.onclick = function () { 
  let user_choice = {
      reason : []
    };

  //Save values to the object

  user_choice.experience = experience_true.checked ? true : false;
  user_choice.weight = myWeight.value;
  user_choice.product = cbdPerc.value;
  for (let i = 0; i < 13; i++) {
      if (reason_checkbox[i].checked) {
        user_choice.reason.push(reason_checkbox[i].value);
      }
   }

   const user_results = getResults(user_choice);

   //Write results
   writeResults(user_results.drops, user_results.mg, user_choice.product);

};

/**
* Function to handle Reset button
*/

reset_button.onclick = function () {
   document.getElementById("app_result").className += 'hidden';
   document.getElementById("app_calculator").classList.remove("hidden");
   document.getElementById("app_container").classList.remove("app_container_result");
};

/**
 * 
 * END OF BUTTONS
 * 
 */


/**
* Function to handle Change of sliders
* @param    {Number}     Value that has been changed
* @param    {String}     ID of changed input      
*/

const sliderChange = function(value, id) {
  const slider = document.getElementById(id);
  const output = document.getElementById(id+'-change');
  output.innerHTML = slider.value;
  output.innerHTML = slider.value;
}

/**
* Function to calculate Strength based on the problem and const problems_strength_const
* @param    {String}     A problem that the user entered 
* @return   {Number}     Strength of CBD
*/

const calculateStrengthByProblem = function(user_choice) {

  //Define strength based on problem

    let user_strength_prob = 0;
      for (let i = 0; i < user_choice.length; i++) {
        for (let b = 0; b < problems_strength_const.length; b++){
            if (problems_strength_const[b][0] === user_choice[i]) {
              if (problems_strength_const[b][1] > user_strength_prob) {
                user_strength_prob = problems_strength_const[b][1];;
              }
            }
      }
    }
    return user_strength_prob;
}

/**
* Function to calculate Strength based on the experience of the user and problem of the user
* @param    {Boolean}    Has user experience with CBD? 
* @param    {String}     Strength of the CBD from the previous function  
* @return   {Number}     Final strength of the CBD
*/

const calculateStrengthByExperience = function(user_choice, firstStrength) {

    let user_strength_final;
    if(firstStrength == 3) {
      user_strength_final = firstStrength;
    } else if (firstStrength == 0) {
        user_strength_final = 1;
    } else if (user_choice) {
      user_strength_final = firstStrength+1; 
    } else {
      user_strength_final = firstStrength;
    }

    return user_strength_final;
}

/**
* Function to calculate miligrams of CBD per day based on the weight of the user and their experience
* @param    {Number}     Weight in kilograms 
* @param    {Number}     Strength of the CBD   
* @return   {Number}     mg of CBD a user should have per day
*/


const calculateMg = function(weight, strength) {
    switch(strength) {
      case 1:
        return (weight*weight_dosing_kg_const.low).toFixed(1);
        break;
      case 2:
        return (weight*weight_dosing_kg_const.mid).toFixed(1);
        break;
      case 3:
        return (weight*weight_dosing_kg_const.high).toFixed(1);
        break;
    }
}

/**
* Function to calculate number of drops based on mg of CBD per day and type of product
* @param    {Number}     mg of CBD a user should take a day 
* @param    {Number}     % of a user's product   
* @return   {Number}     number of drops per day
*/

const calculateDrops = function(mg, product){
  return Math.round(mg/(product*const_mg_dose));
}

/**
* Function to return final results
* @param    {object}     choices of the user from DOM 
* @return   {object}     results (mg and drops)
*/

const getResults = function (user_choice) {
   const firstStrength =  calculateStrengthByProblem(user_choice.reason);
   const secondStrength = calculateStrengthByExperience(user_choice.experience, firstStrength);
   const user_mg = calculateMg(user_choice.weight, secondStrength);
   const user_drops =  calculateDrops(user_mg, user_choice.product);

    return {
      mg : user_mg,
      drops : user_drops
    };
}

/**
* Function to handle DOM and write results to user
* @param    {Number}     drops per day 
* @param    {Number}     mg per day
* @param    {Number}     type of the product
*/

const writeResults = function(drops, mg, product) {
   document.getElementById("result_drop").innerText = drops;
   document.getElementById("result_mg").innerText = mg;
   document.getElementById("result_product").innerText = product;
   document.getElementById("app_calculator").className += 'hidden';
   document.getElementById("app_result").classList.remove("hidden");
   document.getElementById("app_container").className += " app_container_result";
}
