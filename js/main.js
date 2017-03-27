/**
 * Created by Alexei Seremet on 1/6/15.
 */

$(document).ready(function() {



  // call function
  if (answer){
    answer.hide();  // hidden result block
  }
});


// -------------------------
// Global config
// -------------------------
var x = Math.floor((Math.random() * 2)); // 0, 1
var container = $('body');

// <body data-config='{ "form": ".js-order", "topQuantity": 3, "product": 2003 }'>
if (!(container.data('href'))) {
  var form = container.data('config').form;
  var topQuantity = container.data('config').topQuantity;
  var product = container.data('config').product;
  var btnSubmit = $('[data-orderSubmit]');
  var answer = $('[data-answer]');

  // product config
  var price = container.data('product').price;
  var shipping = container.data('product').shipping;
  var region = container.data('product').region;
} else {
  function landingUrl(){ // url to landing
    var url = container.data('href')[x];
    if (url === undefined ) {
      url = container.data('href')[0];
    }
    return url;
  };
}

// referal code
var referalName = 'referal';
var referalCode = GetURLParameter(referalName);
if (referalCode !== undefined) {
  referalCode = referalCode;
} else {
  referalCode = 'unknown';
}




// -------------------------
// Update Invocie, <body data-product='{ "price": 99, "shipping": 20, "region": 1001 }'>
// -------------------------
(function updateInvoice() {
  "use strict";

  var input = $('[name=quantity]');

  $(input).bind('change', function() {
    var value = $(this).val();

    switch(value) {
      case '1':
        totalPrice(price*1)
        break;
      case '3':
        totalPrice(price*2)
        break;
      case '5':
        totalPrice(price*3-30);
        break;
    }
  })

  $('[data-package]').click(function() {
    var quant = $(this).data('package');
    changeQuantity(quant);
  })

  function totalPrice(summ) {
    $('[data-invoicePrice]').text(summ);
    $('[data-invoiceTotal]').text(shipping + summ);
  }

  function changeQuantity(quant) {
    $(form).find(input).filter('[value="'+quant+'"]').click();
  }


  $('[data-invoiceShipping]').text(shipping);
  totalPrice(price);
  changeQuantity(topQuantity);
})();



function valueForm(target) {
  "use strict";

  var value = $(this).closest(form).find(target).val();

  if (!value) {
    value = $(this).closest(form).find(target).text();

    if (value == '') {
      return 'unknown';
    } else {
      return value;
    }
  } else {
    return value;
  }
};



(function orderAction() {
  "use strict";

  $(btnSubmit).bind('click', function () {

    var name_valid_ru = "Введите свое имя правильно";
    var name_valid_uni = "Enter your name";
    var name_valid_ro = "Introduceți Numele și Prenumele corect";
    var phone_valid_ru = "введите номер телефона правильно";
    var phone_valid_uni = "Enter your phone number";
    var phone_valid_ro = "Introduceți numărul de telefon corect";
    var name_valid_bg = "Въведете името си правилно";
    var phone_valid_bg = "Въведете телефонния си номер";
    var name_valid_tr = "Doğru adı girin";
    var phone_valid_tr = "Telefon numaranızı girin";
    var name_valid_cz = "Zadejte své jméno správně";
    var phone_valid_cz = "Zadejte své telefonní číslo správně";
    var name_valid_sk = "Zadajte svoje meno správne";
    var phone_valid_sk ="Zadajte svoje telefónne číslo správne";

    // customer data
    var name = valueForm.apply(this, ["[data-orderName]"]);
    var phone = valueForm.apply(this, ["[data-orderPhone]"]);
    var comment = valueForm.apply(this, ["[data-orderComment]"]);
    var address = valueForm.apply(this, ["[data-orderAddress]"]);

    if(name.length <= 2) {
       if (container.hasClass('lang-ro')) {
          alert(name_valid_ro);
        } else if (container.hasClass('lang-ru')) {
          alert(name_valid_ru);
        } else if (container.hasClass('lang-ru-de')) {
          alert(name_valid_ru);
        } else if (container.hasClass('lang-deru')) {
          alert(name_valid_ru);
        } else if (container.hasClass('lang-de-ru')) {
          alert(name_valid_ru);
        } else if (container.hasClass('lang-de')) {
          alert(name_valid_ru);
        } else if (container.hasClass('lang-md')) {
          alert(name_valid_ro);
        }else if (container.hasClass('lang-bg')) {
          alert(name_valid_bg);
        }else if (container.hasClass('lang-tr')) {
          alert(name_valid_tr);
        }else if (container.hasClass('lang-cz')) {
          alert(name_valid_cz);
        }else if (container.hasClass('lang-sk')) {
          alert(name_valid_sk);
        }else{
            alert(name_valid_uni);
        }
      return  false;
    }
    else if(phone.length <= 8) {
       if (container.hasClass('lang-ro')) {
          alert(phone_valid_ro);
        } else if (container.hasClass('lang-ru')) {
          alert(phone_valid_ru);
        } else if (container.hasClass('lang-ru-de')) {
          alert(phone_valid_ru);
        } else if (container.hasClass('lang-de')) {
          alert(phone_valid_ru);
        } else if (container.hasClass('lang-de-ru')) {
          alert(phone_valid_ru);
        } else if (container.hasClass('lang-deru')) {
          alert(phone_valid_ru);
        } else if (container.hasClass('lang-md')) {
          alert(phone_valid_ro);
        }else if (container.hasClass('lang-bg')) {
          alert(phone_valid_bg);
        }else if (container.hasClass('lang-tr')) {
          alert(phone_valid_tr);
        }else if (container.hasClass('lang-cz')) {
          alert(phone_valid_cz);
        }else if (container.hasClass('lang-sk')) {
          alert(phone_valid_sk);
        }else{
            alert(phone_valid_uni);
        }
      return  false;
    }

    if (!region) {
      region = valueForm.apply(this, ["[data-orderRegion]"]);
    }
    var quantity = parseInt(valueForm.apply(this, ["[name=quantity]:checked"]));
    if (!quantity || quantity === 'unknown') {
      quantity = 1;
    }
    var cost = parseInt(valueForm.apply(this, ["[data-invoicePrice]"]));
    if (!cost) {
      cost = price;
    }

    console.log('name '+name, '/ phone '+phone, '/ region '+region, '/ address '+address, '/ quantity '+quantity, '/ cost '+cost, '/ product '+product, '/ referal '+referalCode);

    $(btnSubmit).prop('disabled', true);
    _gaq.push(['_trackEvent', 'Order', 'Place', 'Submit', 0]);

    var valid = 1;

    if(name === '' || name === 'unknown') {
      valid = 0;
      _gaq.push(['_trackEvent', 'Order', 'Error field', 'name', 0]);
    }
    if(phone === '' || phone === 'unknown') {
      valid = 0;
      _gaq.push(['_trackEvent', 'Order', 'Error field', 'phone', 0]);
    }

    if(valid == 1) {
      _gaq.push(['_trackEvent', 'Order', 'Place', 'Sending', 0]);

      var posting = $.post("http://188.226.197.69/?q=neworder/v3", {
        customer_name   : name,
        customer_phone  : phone,
        customer_region : region,
        customer_address: address,
        customer_comment: comment,
        quantity        : quantity,
        cost            : cost,
        product         : product,
        referral        : referalCode
      }, null, "json");

      posting.done(function( data ) {
        if (data.status == 'yes') {
          hideSubmitForm(data.result);
          _gaq.push(['_trackEvent', 'Order', 'Place', 'Successful', 0]);
        } else {
          _gaq.push(['_trackEvent', 'Order', 'Place', 'Response False', 0]);
        }

        $(btnSubmit).prop('disabled', false);
      });

      posting.fail(function() {
        _gaq.push(['_trackEvent', 'Order', 'Place', 'Failed', 0]);
        $(btnSubmit).prop('disabled', false);
      });
    } else {
      _gaq.push(['_trackEvent', 'Order', 'Place', 'Show Errore', 0]);
      $(btnSubmit).prop('disabled', false);
    }
  });

})();

function hideSubmitForm(orderID) {
  //$('.main-form').hide();

    var inst = $('[data-remodal-id=modal]').remodal();

    inst.open();
};




// -------------------------
// Get referal code from URL
// -------------------------
function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');

  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
};






