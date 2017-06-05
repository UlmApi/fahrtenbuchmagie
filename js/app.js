// reimplementation of wizard.js, but without jQuery

let navListItems = document.querySelectorAll(".setup-panel div a");
let allWells = document.querySelectorAll(".setup-content");
let allNextBtn = document.querySelectorAll(".nextBtn");
let newCars = document.querySelectorAll(".newVhclBtn");
let removeCarButton = document.querySelector(".removeVehicle");

let numberOfCars = 1;

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

newCars.forEach(element => {
  element.addEventListener("click", e => {
    addCar(e.srcElement);
  });
});

removeCarButton.style.display = "none";

removeCarButton.addEventListener("click", e => {
  removeCar(e.srcElement);
});

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

function addCar(e) {
  numberOfCars++;

  let carHtml = `
  <div class="car">
    <h4>Fahrzeug ${numberOfCars}</h4>
    <div class="form-group">
      <label class="control-label">Kennzeichen</label>
      <input maxlength="200" type="text" required="required" class="form-control" placeholder="Fahrzeugkennzeichen eingeben" />
    </div>
    <div class="form-group">
      <label class="control-label">km-Stand Beginn</label>
      <input maxlength="200" type="text" required="required" class="form-control" placeholder="Kilometerstand zu Monatsanfang" />
    </div>
    <div class="form-group">
      <label class="control-label">km-Stand Ende</label>
      <input maxlength="200" type="text" required="required" class="form-control" placeholder="Kilometerstand zu Monatsende" />
    </div>
    <div class="form-group">
      <label class="control-label">Wagenpflege</label>
      <input name="wagenpflege" value="wagenpflege" type="checkbox">durchgeführt
    </div>
  </div>
  `;

  let cars = e.parentElement.querySelectorAll(".car");
  cars[cars.length - 1].outerHTML += carHtml;

  removeCarButton.style.display = "initial";
}

function removeCar(e) {
  let cars = e.parentElement.querySelectorAll(".car");
  cars[cars.length - 1].remove();
  numberOfCars--;

  if (numberOfCars < 2) {
    removeCarButton.style.display = "none";
  }
}