// reimplementation of wizard.js, but without jQuery

let navListItems = document.querySelectorAll(".setup-panel div a");
let allWells = document.querySelectorAll(".setup-content");
let allNextBtn = document.querySelectorAll(".nextBtn");

allWells.forEach(element => {
  element.hidden = true;
})

navListItems.forEach(element => {
  element.addEventListener("click", e => {
    switchStep(e.srcElement);
  });
});

allNextBtn.forEach(element => {
  element.addEventListener("click", e => nextButton(e));
});

allWells[0].hidden = false;

// TODO: test
function switchStep(e) {
  let target = e.attributes.href.value;
  let nextForm = document.querySelector(target);
  let nextInput = nextForm.querySelector("input");

  if (e.attributes.disabled) {
    e.attributes.removeNamedItem("disabled");
  }

  navListItems.forEach(e => {
    e.classList.add("btn-default");
    e.classList.remove("btn-primary");
  })

  e.classList.add("btn-primary");

  e.classList.add("btn-primary");
  allWells.forEach(e => { e.hidden = true });

  nextForm.hidden = false;

  if (nextInput) {
    nextInput.focus();
  }
}

function nextButton(e) {
  let curStep = e.srcElement.closest(".setup-content");
  let nextStepWizard = "#" + curStep.nextElementSibling.id;
  let curInputs = curStep.querySelectorAll("input");
  let curForms = curStep.querySelectorAll(".form-group");
  let isValid = true;

  curForms.forEach(element => {
    element.classList.remove("has-error");
  });

  curInputs.forEach(element => {
    if (!element.validity.valid) {
      isValid = false;
      element.closest(".form-group").classList.add("has-error");
    }
  });

  if (isValid) {
    switchStep(document.querySelectorAll('a[href="' + nextStepWizard + '"]')[0]);

  }
}