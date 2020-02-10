const form = $("#price-form");

let formData = form.serializeJSON();

console.log(formData.type);

ShowHideBlocks();

// Изменили данные формы сделали ее кликабельной
form.on("keyup change paste", "input, select, textarea", function() {
  // Заново получили данные из формы
  formData = form.serializeJSON();
  console.log(formData);

  //Установили показывать или скрывать мобилку и сайт/лендинг, а так же обнуление их при закрытиии
  ShowHideBlocks();
  formData = form.serializeJSON();
  console.log(formData);

  // Обновляем цену на странице
  updatePrice(calculatePrice());
});

function ShowHideBlocks() {
  if (formData.type == "site") {
    $('[data-name= "pages"]').show();
    $('[data-name= "landing"]').hide();
    $('[name= "sections"]').val("0");
  } else {
    $('[data-name= "pages"]').hide();
    $('[data-name= "landing"]').show();
    $('[data-name= "pages"] input').val("0");
  }

  if (formData.mobile == "on") {
    $('[data-name= "mobile"]').show();
  } else {
    $('[data-name= "mobile"]').hide();
    $('[name= "mobile-number"]')[0].checked = true;
    $('[name= "mobile-number"]')[1].checked = false;
    $('[name= "mobile-number"]')[2].checked = false;
  }
}

function calculatePrice() {
  // расчитываем цену
  let totalPrice = 0;
  totalPrice =
    formData["pages-unique"] * 4000 +
    formData["pages-general"] * 2500 +
    formData["sections"] * 2000 +
    formData["carousel"] * 1200 +
    formData["modals"] * 900 +
    formData["forms"] * 1500;

  //мобильный мультипликатор
  let multiplicatorMobile = 1;
  if (formData["mobile-number"] == 2) {
    multiplicatorMobile = 1.3;
  } else if (formData["mobile-number"] == 3) {
    multiplicatorMobile = 1.5;
  }
  // Нижние части
  let mPixelPerfect = 1;
  if (formData["pixelPerfect"] == "on") {
    mPixelPerfect = 1.2;
  }

  let mRetinaReady = 1;
  if (formData["retinaReady"] == "on") {
    mRetinaReady = 1.2;
  }

  let mGooglePageSpeed = 1;
  if (formData["googlePageSpeed"] == "on") {
    mGooglePageSpeed = 1.2;
  }

  let mUrgentOrder = 1;
  if (formData["urgentOrder"] == "on") {
    mUrgentOrder = 1.5;
  }

  totalPrice =
    totalPrice *
    multiplicatorMobile *
    mPixelPerfect *
    mRetinaReady *
    mGooglePageSpeed *
    mUrgentOrder;

  console.log(totalPrice);

  return totalPrice;
}

function updatePrice(price) {
  $("#total-price").text(price);
}
