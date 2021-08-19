function changeFilepath(orig_string, position, new_value) {
  orig_string = orig_string.split('/');
  var path_str = orig_string[orig_string.length - 2];
  path_str = path_str.split('_');
  path_str[position] = new_value;
  path_str = path_str.join('_');
  orig_string[orig_string.length - 2] = path_str;
  orig_string = orig_string.join('/');
  return orig_string;
};

function changeFilename(orig_string, position, new_value) {
  orig_string = orig_string.split('/');
  var file_str = orig_string[orig_string.length - 1];
  file_str = file_str.split('_');
  file_str[position] = new_value;
  file_str = file_str.join('_');
  orig_string[orig_string.length - 1] = file_str;
  orig_string = orig_string.join('/');
  return orig_string;
};

document.getElementById('training_time_select').onchange = changeTT;
function changeTT() {
  var tt = document.getElementById('training_time_select').value;
  var img_string_concrete = document.getElementById('result_concrete').src;
  var img_string_abstract = document.getElementById('result_abstract').src;

  img_string_concrete = changeFilename(img_string_concrete, 6, tt);
  document.getElementById('result_concrete').src = img_string_concrete;
  img_string_abstract = changeFilename(img_string_abstract, 6, tt);
  document.getElementById('result_abstract').src = img_string_abstract;
};

//BEGIN CONCEPT SLIDERS
// Concrete concept slider
document.getElementById('concrete_concept_select').oninput = changeConcreteConcept;
function changeConcreteConcept() {
  var values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
  var concept_string = "P" + values[this.value]
  var img_string_concrete = document.getElementById('result_concrete').src;

  document.getElementById('concrete_concept_output').innerHTML = concept_string;
  img_string_concrete = changeFilename(img_string_concrete, 4, concept_string);
  document.getElementById('result_concrete').src = img_string_concrete;
};
document.getElementById('concrete_concept_select').oninput();

// Abstract concept slider
document.getElementById('abstract_concept_select').oninput = changeAbstractConcept;
function changeAbstractConcept() {
  var values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
  var concept_string = "P" + values[this.value]
  var img_string_abstract = document.getElementById('result_abstract').src;

  document.getElementById('abstract_concept_output').innerHTML = concept_string;
  img_string_abstract = changeFilename(img_string_abstract, 4, concept_string);
  document.getElementById('result_abstract').src = img_string_abstract;
};
document.getElementById('abstract_concept_select').oninput();
//END CONCEPT SLIDERS

//BEGIN MODEL SLIDERS
// Concrete Model Slider
document.getElementById('concrete_model_select').oninput = changeConcreteModel;
function changeConcreteModel() {
  var values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var concept_string = "M" + values[this.value];
  var img_string_concrete = document.getElementById('result_concrete').src;

  document.getElementById('concrete_model_output').innerHTML = concept_string;
  img_string_concrete = changeFilename(img_string_concrete, 3, concept_string);
  document.getElementById('result_concrete').src = img_string_concrete;
};
document.getElementById('concrete_model_select').oninput();

//Abstract Model Slider
document.getElementById('abstract_model_select').oninput = changeAbstractModel;
function changeAbstractModel() {
  var values = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var concept_string = "M" + values[this.value];
  var img_string_abstract = document.getElementById('result_abstract').src;

  document.getElementById('abstract_model_output').innerHTML = concept_string;
  img_string_abstract = changeFilename(img_string_abstract, 3, concept_string);
  document.getElementById('result_abstract').src = img_string_abstract;

  img_string_abstract = changeFilename(img_string_abstract, 3, concept_string);
};
document.getElementById('abstract_model_select').oninput();
//END MODEL SLIDERS
