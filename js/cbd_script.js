//CONSTANTS
//Strength of CBD for different problems
// 0 = low
// 1 = low - mid based on experience
// 2 = mid - high based on experience
// 3 = high

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

document.getElementById("myWeight-change").innerHTML = document.getElementById("myWeight").value;
document.getElementById("cbdPerc-change").innerHTML = document.getElementById("cbdPerc").value;

const submit_button = document.getElementById("app_submit_button");
const reset_button = document.getElementById("reset_button");

// SAVE BUTTON ///

submit_button.onclick = function () { 
  let user_choice = {
      reason : []
    };

  //Save values to the object

  user_choice.experience = document.getElementById("experience_true").checked ? true : false;
  user_choice.weight = document.getElementById("myWeight").value;
  user_choice.product = document.getElementById("cbdPerc").value;
  for (let i = 0; i < 13; i++) {
      if (document.getElementsByClassName("reason_checkbox")[i].checked) {
        user_choice.reason.push(document.getElementsByClassName("reason_checkbox")[i].value);
      }
   }

   user_results = getResults(user_choice);

   //Write result

   document.getElementById("result_drop").innerText = user_results.drops;
   document.getElementById("result_mg").innerText = user_results.mg;
   document.getElementById("result_product").innerText = user_choice.product;
   document.getElementById("app_calculator").className += 'hidden';
   document.getElementById("app_result").classList.remove("hidden");
   document.getElementById("app_container").className += " app_container_result";
};

// RESET BUTTON //

reset_button.onclick = function () {
   document.getElementById("app_result").className += 'hidden';
   document.getElementById("app_calculator").classList.remove("hidden");
   document.getElementById("app_container").classList.remove("app_container_result");

};

const sliderChange = function(value, id) {
  const slider = document.getElementById(id);
  const output = document.getElementById(id+'-change');
  output.innerHTML = slider.value;
  output.innerHTML = slider.value;
}

// CALCULATING CBD DOSE //

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

const calculateStrengthByExperience = function(user_choice, firstStrength) {

    //Define strength based on experience

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

const calculateMg = function(weight, strength) {
    //Calculate mg of CBD based on weight and strength
    let user_mg;

    switch(strength) {
      case 1:
        return (weight*0.2).toFixed(1);
        break;
      case 2:
        return (weight*0.6).toFixed(1);
        break;
      case 3:
        return (weight*1.2).toFixed(1);
        break;
    }
}

const calculateDrops = function(mg, product){
  //Calculate drops of CBD 
  return Math.round(mg/(product*const_mg_dose));
}



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