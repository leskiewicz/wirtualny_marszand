var $ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
  name: 'Marszand', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element

  id: 'io.framework7.marszand', // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

var hostPath = 'http://localhost:3000';

var rolePaths = [hostPath+'/klient', hostPath+'/hotel', hostPath+'/artysta'];
var registerUser = {}

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
}

function returnJsonToStringMsg(jsonObj) {

  var msg = "";

  for(var key in jsonObj){
    msg += key + ': ' + jsonObj[key] + "<br>";
  }

  return msg;
}

$(document).on('page:init', '.page[data-name="register"]', function (e) {
  
  $('#submitRegister').on('click', async function () {
      var email = $('#registerForm [name="email"]').val();
      var password = $('#registerForm [name="password"]').val();
      var repassword = $('#registerForm [name="repassword"]').val();

      registerUser.email = email;
      registerUser.password = password;
      registerUser.repassword = repassword;

  });

});

//ARTIST

let artistArchivePictures = 
'<li id="artistArchivePictures">' +
  '<a href="/artist/archive/pictures" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Moje archiwalne obrazy</div>' +
    '</div>' +
  '</a>' +
'</li>'

let artistPictures = 
'<li id="artistPictures">' +
  '<a href="/artist/pictures" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Moje obrazy</div>' +
    '</div>' +
  '</a>' +
'</li>'


let artistSales = 
'<li id="artistSales">' +
  '<a href="/artist/sales/pictures" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Moje aukcje</div>' +
    '</div>' +
  '</a>' +
'</li>'

let artistCombined = artistSales+artistPictures+artistArchivePictures;
//ARTIST


//CLIENT
let clientPictures = 
'<li id="clientPictures">' +
  '<a href="/client/pictures" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Moje obrazy</div>' +
    '</div>' +
  '</a>' +
'</li>'


let clientShop = 
'<li id="clienttSales">' +
  '<a href="/client/shop/pictures" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Kup obrazy</div>' +
    '</div>' +
  '</a>' +
'</li>'

let clientCombined = clientPictures+clientShop;
//CLIENT


//HOTEL
let hotelArchivePictures = 
'<li id="hotelArchivePictures">' +
  '<a href="/hotel/archive/pictures" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Moje archiwalne obrazy</div>' +
    '</div>' +
  '</a>' +
'</li>'

let hotelPictures = 
'<li id="hotelPictures">' +
  '<a href="/hotel/pictures" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Moje obrazy</div>' +
    '</div>' +
  '</a>' +
'</li>'


let hotelShop = 
'<li id="hotelShop">' +
  '<a href="/hotel/shop/pictures" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Kup obrazy</div>' +
    '</div>' +
  '</a>' +
'</li>'

let hotelSale = 
'<li id="hotelSales">' +
  '<a href="/hotel/sales/pictures" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Moje wyprzedaże</div>' +
    '</div>' +
  '</a>' +
'</li>'

let hotelCombined = hotelSale+hotelPictures+hotelShop+hotelArchivePictures;
//HOTEL


$(document).on('page:beforein', '.page[data-name="accountSettings"]', function (e) {

  if(localStorage.role == "HOTEL") {

    if(!$('#hotelPictures').length && !$('#hotelShop').length && !$('#hotelSales').length) {
      $(hotelCombined).insertAfter($('#settingsList li:first-child'))
    }
    
  } else if(localStorage.role == "KLIENT") {
    
    if(!$('#clientPictures').length && !$('#clientShop').length) {
      $(clientCombined).insertAfter($('#settingsList li:first-child'))
    }

  } else if(localStorage.role == "ARTYSTA") {

    if(!$('#artistPictures').length && !$('#artistSales').length) {
      $(artistCombined).insertAfter($('#settingsList li:first-child'))
    }

  }

  $('#logout').on('click', async function () {
    localStorage.clear();
    console.log("Wylogowano");
    app.views.main.router.navigate('/');
  });

});

$(document).on('page:init', '.page[data-name="userInfo"]', function (e) {
  
  $('#submitRegisterFull').on('click', async function () {
      var firstName = $('#userInfoForm [name="firstName"]').val();
      var lastName = $('#userInfoForm [name="lastName"]').val();
      var city = $('#userInfoForm [name="city"]').val();
      var address = $('#userInfoForm [name="address"]').val();
      var phone = $('#userInfoForm [name="phone"]').val();
      var birthDate = $('#userInfoForm [name="birthDate"]').val();
      var organisation = $('#userInfoForm [name="organisation"]').val();
      var description = $('#userInfoForm [name="description"]').val();

      registerUser.firstName = firstName;
      registerUser.lastName = lastName;
      registerUser.city = city;
      registerUser.address = address;
      registerUser.phone = phone;
      registerUser.birthDate = birthDate;
      registerUser.organisation = organisation;
      registerUser.description = description;

      try {
        const register = await fetch(hostPath+'/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerUser),
            });

            const b2 = await register.json();

            if(register.status == 200) {
              app.views.main.router.navigate('/');
              console.log(b2)
            } else {
              app.dialog.alert(returnJsonToStringMsg(b2.errors));
              console.log(b2)
            }

      } catch (error) {
        console.log('Request failed', error) ;
      }   

  });

});

$(document).on('page:init', '.page[data-name="accountInfo"]', async function (e) {
  
  if(localStorage.token) {
      const respMe = await fetch(hostPath+'/user/me', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});
    
      const respMe2 = await respMe.json();
      console.log(respMe2);

      console.log($('#email'));

      $('#accountBalance').text(respMe2.accountBalance + " zł");
      $('#email').text(respMe2.email);
      $('#firstName').text(respMe2.UserInfo.firstName);
      $('#lastName').text(respMe2.UserInfo.lastName);
      $('#city').text(respMe2.UserInfo.city);
      $('#address').text(respMe2.UserInfo.address);
      $('#phone').text(respMe2.UserInfo.phone);
      $('#birthDate').text(respMe2.UserInfo.birthDate.split("T")[0]);
      $('#organisation').text(respMe2.UserInfo.organisation);
      $('#description').text(respMe2.UserInfo.description);
  }

});

$(document).on('page:init', '.page[data-name="login"]', function (e) {
  
  var userLogin = {};

  $('#submitLogin').on('click', async function () {

    try {
      var email = $('#loginForm [name="email"]').val();
      var password = $('#loginForm [name="password"]').val();

      userLogin.email = email;
      userLogin.password = password;

      const response = await fetch(hostPath+'/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userLogin)
      });
      const body = await response.json();

      if(response.status == 200) {
          
          localStorage.token = body.token;

          const respMe = await fetch(hostPath+'/user/me', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.token
          }});

          const b2 = await respMe.json();

          localStorage.id = b2.id;
          localStorage.email = b2.email;
          localStorage.role = b2.Role.name;
          if(b2.Role.name == "KLIENT") {
              localStorage.rolePath = rolePaths[0];
          } else if(b2.Role.name == "HOTEL") {
              localStorage.rolePath = rolePaths[1];
          } else if (b2.Role.name == "ARTYSTA") {
              localStorage.rolePath = rolePaths[2];
          }
          
          console.log(b2)
          app.views.main.router.navigate('/accountSettings');
      } else {
          console.log(body)
          app.dialog.alert(body.error);
      }

      } catch (error) {
          console.log('Request failed', error) ;
      }   

  });

});

$(document).on('page:init', '.page[data-name="editInfo"]', async function (e) {
  
  if(localStorage.token) {
      const respMe = await fetch(hostPath+'/user/me', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

      const respMe2 = await respMe.json();
      console.log(respMe2);

      $('#userEditForm [name="email"]').val(respMe2.email);
      $('#userEditForm [name="firstName"]').val(respMe2.UserInfo.firstName);
      $('#userEditForm [name="lastName"]').val(respMe2.UserInfo.lastName);
      $('#userEditForm [name="city"]').val(respMe2.UserInfo.city);
      $('#userEditForm [name="address"]').val(respMe2.UserInfo.address);
      $('#userEditForm [name="phone"]').val(respMe2.UserInfo.phone);
      $('#userEditForm [name="birthDate"]').val(respMe2.UserInfo.birthDate.split("T")[0]);
      $('#userEditForm [name="organisation"]').val(respMe2.UserInfo.organisation);
      $('#userEditForm [name="description"]').val(respMe2.UserInfo.description);
      
  }

  $('#submitEdit').on('click', async function () {

    let newData = {}

    newData.email = $('#userEditForm [name="email"]').val();
    newData.firstName = $('#userEditForm [name="firstName"]').val();
    newData.lastName = $('#userEditForm [name="lastName"]').val();
    newData.city = $('#userEditForm [name="city"]').val();
    newData.address = $('#userEditForm [name="address"]').val();
    newData.phone = $('#userEditForm [name="phone"]').val();
    newData.birthDate = $('#userEditForm [name="birthDate"]').val();
    newData.organisation = $('#userEditForm [name="organisation"]').val();
    newData.description = $('#userEditForm [name="description"]').val();

    const respMe = await fetch(hostPath+'/user/me/updateInfo', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
    },
    body: JSON.stringify(newData)});

    const respMe2 = await respMe.json();

    if(respMe.status == 200) {
      app.dialog.alert("Udało się uaktualnić dane");
      app.views.main.router.navigate('/');
      app.views.main.router.refreshPage();
    } else {
        app.dialog.alert("Nie udało się zmienić danych");
    }

    console.log(respMe2);
  });

});

$(document).on('page:init', '.page[data-name="changePassword"]', function (e) {
  
  let passCreds = {};

  $('#submitChangePassword').on('click', async function () {
      var password = $('#changePasswordForm [name="oldpass"]').val();
      var newpassword = $('#changePasswordForm [name="newpass"]').val();
      var renewpassword = $('#changePasswordForm [name="renewpass"]').val();
      
      passCreds.password = password;
      passCreds.newpassword = newpassword;
      passCreds.renewpassword = renewpassword;

      const respMe = await fetch(hostPath+'/user/me/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(passCreds)});

        const respMe2 = await respMe.json();
        console.log(respMe2);

        if(respMe.status == 200) {
          localStorage.clear();
          app.dialog.alert("Udało się zmienić hasło");
          app.views.main.router.navigate('/');
          app.views.main.router.refreshPage();
        } else {
          app.dialog.alert("Nie udało się zmienić hasła");
        }
  });

});

$(document).on('page:init', '.page[data-name="transactionHistory"]', async function (e) {

  const respMe = await fetch(localStorage.rolePath + '/transactions', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
    }});

    const respMe2 = await respMe.json();

    for(let i = 0; i < respMe2.length; i++) {
        console.log(respMe2[i]);

        let creation = respMe2[i].createdAt.split("T");

        let sign;

        if(respMe2[i].type == "SPRZEDANO" || respMe2[i].type == "PROWIZJA") {
          sign = '+'
        } else {
          sign = '-'
        }

        let html =
        '<li>' +
          '<a href="/transactionHistory/' + respMe2[i].id + '/details" class="item-link item-content">' +
            '<div class="item-inner">' +
            '<div class="item-title">' + 
              respMe2[i].pictureName + '<div class="item-footer">' + sign + respMe2[i].price + 'zł</div>' +
            '</div>' +
            '<div class="item-after">' + respMe2[i].type + ', ' + creation[0] + ', ' + creation[1].split(".")[0] + '</div>' +
            '</div>' +
          '</a>' +
		    '</li>';
        $('#transactionHistoryList').append(html);
    }

});

$(document).on('page:init', '.page[data-name="transactionHistoryDetails"]', async function (e, page) {
  
  if(localStorage.rolePath) {

    const respMe = await fetch(localStorage.rolePath + '/transactions/' + page.route.params.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }});

    const respMe2 = await respMe.json();
    let respMe2c = respMe2[0];
    let creation = respMe2c.createdAt.split("T");

    $('#type').text(respMe2c.type);
    $('#createdAt').text(creation[0] + ' ' + creation[1].split(".")[0]);
    $('#buyEmail').text(respMe2c.buyEmail);
    $('#sellEmail').text(respMe2c.sellEmail);
    $('#pictureName').text(respMe2c.pictureName);
    $('#pictureImage').attr('src', respMe2c.pictureImage);
    $('#price').text(respMe2c.price + "zł");

  }

});

//START WORKING HERE

$(document).on('page:init', '.page[data-name="artistMySales"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/sale/pictures', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  for(let i = 0; i < respMe2.length; i++) {
      console.log(respMe2[i]);
      let html =
      '<li><a href="/artist/sales/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                '<div class="item-inner">' +
                  '<div class="item-title">'+ respMe2[i].name + '</div>'+
              '</div></a></li>';
      $('#artistMySales').append(html);
  }
});


$(document).on('page:init', '.page[data-name="artistMyPictures"]', async function (e, page) {

  let html = '<li><a href="/artist/pictures/add" class="item-content item-link">'+
      '<div class="item-inner">' +
          '<div class="item-title">Dodaj Obraz</div>'+
      '</div></a></li>';
  $('#artistMyPictures').append(html);

  const respMe = await fetch(localStorage.rolePath + '/pictures', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  for(let i = 0; i < respMe2.length; i++) {
      console.log(respMe2[i]);
      let html =
      '<li><a href="/artist/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                '<div class="item-inner">' +
                  '<div class="item-title">'+ respMe2[i].name + '</div>'+
              '</div></a></li>';
      $('#artistMyPictures').append(html);
  }
});


$(document).on('page:init', '.page[data-name="artistAddPicture"]', async function (e, page) {

  $('#submitAddPicture').on('click', async function () {
      let formData  = new FormData();

      formData.append('name', $('#name').val());
      formData.append('description', $('#description').val());
      formData.append('year', $('#year').val());
      formData.append('type', $('#type').val());
      formData.append('price', $('#price').val());
      formData.append('width', $('#width').val());
      formData.append('height', $('#height').val());
      formData.append('percentage', $('#percentage').val());
      formData.append('image', $('#image')[0].files[0])

      console.log(...formData)

      const respMe = await fetch(localStorage.rolePath + '/pictures', {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + localStorage.token
      },
      body: formData});

      const respMe2 = await respMe.json();

      //to jest git wszędzie
      if(respMe.status == 200) {
        app.dialog.alert("Udało się dodać obraz");
        app.views.main.router.back({url: '/artist/pictures', force: true});
        app.views.main.router.refreshPage()
      } else {
        app.dialog.alert(returnJsonToStringMsg(respMe2.errors));
      }
      console.log(respMe);
      console.log(respMe2);
  });

});

$(document).on('page:init', '.page[data-name="artistShowPicture"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/pictures/' + page.route.params.pid, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  console.log(respMe2);

  let available;
  if(respMe2.available) {
    available = "Dostępny do sprzedaży"
  } else {
    available = "Obraz został sprzedany"
  }

  if(respMe2.onSale || !respMe2.available) {
      $('#submitSellButton').addClass('disabled');
      app.dialog.alert("Ten obraz jest wystawiony na sprzedaż lub został już sprzedany");
  }

  $('#submitSellButton').on('click', async function() {

    const respMe3 = await fetch(localStorage.rolePath + '/pictures/' + page.route.params.pid + '/sell', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

    const respMe4 = await respMe3.json();

    if(respMe3.status == 200) {
      app.dialog.alert(respMe4.msg);
      app.views.main.router.back({url: '/artist/pictures', force: true});
      app.views.main.router.refreshPage()
    } else {
      app.dialog.alert("Something went wrong");
    }
  });

  $('#submitEditPicture').on('click', async function() {
      app.views.main.router.navigate('/artist/pictures/'+ page.route.params.pid +'/edit');
  });


  $('#available').text(available);
  $('#name').text(respMe2.name);
  $('#description').text(respMe2.description);
  $('#year').text(respMe2.year + ' r.');
  $('#type').text(respMe2.type);
  $('#price').text(respMe2.price + 'zł');
  $('#width').text(respMe2.width + 'cm');
  $('#height').text(respMe2.height + 'cm');
  $('#image').attr('src', respMe2.imageLocation);
  $('#qrcode').attr('src', respMe2.qrCodeLocation);
  $('#percentage').text(respMe2.percentage + '%');

});


$(document).on('page:init', '.page[data-name="artistEditPicture"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/pictures/' + page.route.params.pid, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  console.log(respMe2);

  if(respMe2.onSale || !respMe2.available) {
      $('#submitSellButton').addClass('disabled');
      app.dialog.alert("Ten obraz jest wystawiony na sprzedaż lub został już sprzedany");
  }

  $('#nameEdit').val(respMe2.name);
  $('#descriptionEdit').val(respMe2.description);
  $('#yearEdit').val(respMe2.year);
  $('#typeEdit').val(respMe2.type);
  $('#priceEdit').val(respMe2.price);
  $('#widthEdit').val(respMe2.width);
  $('#heightEdit').val(respMe2.height);
  $('#percentageEdit').val(respMe2.percentage);

  $('#submitEditPictureBtn').on('click', async function() {

    let updatePictureData = {}
    updatePictureData.name = $('#nameEdit').val();
    updatePictureData.description = $('#descriptionEdit').val()
    updatePictureData.year = Number($('#yearEdit').val());
    updatePictureData.type = $('#typeEdit').val();
    updatePictureData.price = Number($('#priceEdit').val());
    updatePictureData.width = Number($('#widthEdit').val());
    updatePictureData.height = Number($('#heightEdit').val());
    updatePictureData.percentage = Number($('#percentageEdit').val());

    console.log(updatePictureData)


    const updatePicture = await fetch(hostPath+'/artysta/pictures/'+ page.route.params.pid +'/edit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      },
      body: JSON.stringify(updatePictureData),
      });

      const updatePictureMsg = await updatePicture.json();

      if(updatePicture.status == 200) {
        app.dialog.alert("Udało się updateować obraz");
        app.views.main.router.back({url: '/artist/pictures', force: true});
        app.views.main.router.refreshPage();

      } else {
        app.dialog.alert(returnJsonToStringMsg(updatePictureMsg.errors));
      }

  });

});


$(document).on('page:init', '.page[data-name="artistShowSale"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/sale/pictures/' + page.route.params.pid, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  console.log(respMe2);

  $('#name').text(respMe2.name);
  $('#description').text(respMe2.description);
  $('#year').text(respMe2.year + ' r.');
  $('#type').text(respMe2.type);
  $('#price').text(respMe2.price + 'zł');
  $('#width').text(respMe2.width + 'cm');
  $('#height').text(respMe2.height + 'cm');
  $('#image').attr('src', respMe2.imageLocation);
  $('#percentage').text(respMe2.percentage + '%');
    
  
  //ARTIST show my sales - button to remove from selling picture
  $('#submitRemoveSalePicture').on('click', async function() {

    const respMe3 = await fetch(localStorage.rolePath + '/sale/pictures/' + page.route.params.pid + '/remove', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

      console.log(respMe3)

    const respMe4 = await respMe3.json();

    console.log(respMe4)

    if(respMe3.status == 200) {
      console.log(respMe4)
      app.dialog.alert(respMe4.msg);
      app.views.main.router.back({url: '/artist/sales/pictures', force: true});
      app.views.main.router.refreshPage()
    } else {
      app.dialog.alert("Something went wrong");
    }
  });

});


$(document).on('page:init', '.page[data-name="hotelBuyPicturesList"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/shop/pictures', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  for(let i = 0; i < respMe2.length; i++) {
      console.log(respMe2[i]);
      let html =
      '<li><a href="/hotel/shop/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                '<div class="item-inner">' +
                  '<div class="item-title">'+ respMe2[i].name + '</div>'+
              '</div></a></li>';
      $('#hotelBuyPicturesList').append(html);
  }
});


$(document).on('page:init', '.page[data-name="hotelBuyPicture"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/shop/pictures/' + page.route.params.pid, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  console.log(respMe2);

  let available;
  if(respMe2.available) {
    available = "Dostępny do sprzedaży"
  } else {
    available = "Obraz został sprzedany"
  }

  if(!respMe2.onSale || !respMe2.available) {
      $('#submitBuyPicture').addClass('disabled');
      app.dialog.alert("Ten obraz został już kupiony lub został wycofany ze sprzedaży");
  }

  $('#submitBuyPicture').on('click', async function() {

    const respMe3 = await fetch(localStorage.rolePath + '/shop/pictures/' + page.route.params.pid + '/buy', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

    const respMe4 = await respMe3.json();

    if(respMe3.status == 200) {
      app.dialog.alert(respMe4.msg);  
      app.views.main.router.back({url: '/shop/pictures', force: true});
      app.views.main.router.refreshPage()
    } else {
      console.log(respMe4)
      app.dialog.alert(respMe4.msg);
    }
  });

  $('#available').text(available);
  $('#name').text(respMe2.name);
  $('#description').text(respMe2.description);
  $('#year').text(respMe2.year + ' r.');
  $('#type').text(respMe2.type);
  $('#price').text(respMe2.price + 'zł');
  $('#width').text(respMe2.width + 'cm');
  $('#height').text(respMe2.height + 'cm');
  $('#image').attr('src', respMe2.imageLocation);
  $('#qrcode').attr('src', respMe2.qrCodeLocation);
  $('#percentage').text(respMe2.percentage + '%');

});

$(document).on('page:init', '.page[data-name="hotelMyPictures"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/pictures', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  for(let i = 0; i < respMe2.length; i++) {
      console.log(respMe2[i]);
      let html =
      '<li><a href="/hotel/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                '<div class="item-inner">' +
                  '<div class="item-title">'+ respMe2[i].name + '</div>'+
              '</div></a></li>';
      $('#hotelMyPictures').append(html);
  }
});

$(document).on('page:init', '.page[data-name="hotelArchivePictures"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/archive/pictures', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  for(let i = 0; i < respMe2.length; i++) {
      console.log(respMe2[i]);
      let html =
      '<li><a href="/hotel/archive/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                '<div class="item-inner">' +
                  '<div class="item-title">'+ respMe2[i].name + '</div>'+
              '</div></a></li>';
      $('#hotelArchivePicturesList').append(html);
  }
});

$(document).on('page:init', '.page[data-name="hotelShowArchivePicture"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/archive/pictures/' + page.route.params.pid, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  console.log(respMe2);

  let available;
  if(respMe2.available) {
    available = "Dostępny do sprzedaży"
  } else {
    available = "Obraz został sprzedany"
  }

  $('#submitSellButton').on('click', async function() {

    let additionalPrice;
    if($('#additionalPrice').val() == '') {
      additionalPrice = { additionalPrice: null };
    } else {
      additionalPrice = { additionalPrice: Number($('#additionalPrice').val()) };
    }

    console.log(additionalPrice)

    const respMe3 = await fetch(localStorage.rolePath + '/pictures/' + page.route.params.pid + '/sell', {
      method: 'POST',
      body: JSON.stringify(additionalPrice),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

    const respMe4 = await respMe3.json();

    if(respMe3.status == 200) {
      app.dialog.alert(respMe4.msg);
      app.views.main.router.back({url: '/hotel/pictures', force: true});
      app.views.main.router.refreshPage()
    } else {
      app.dialog.alert(respMe4.msg);
    }
  });

  $('#available').text(available);
  $('#name').text(respMe2.name);
  $('#description').text(respMe2.description);
  $('#year').text(respMe2.year + ' r.');
  $('#type').text(respMe2.type);
  $('#price').text(respMe2.price + 'zł');
  $('#width').text(respMe2.width + 'cm');
  $('#height').text(respMe2.height + 'cm');
  $('#image').attr('src', respMe2.imageLocation);
  $('#qrcode').attr('src', respMe2.qrCodeLocation);
  $('#percentage').text(respMe2.percentage + '%');

  if(respMe2.additionalPrice) {
    $('#additionalPrice').val(respMe2.additionalPrice);
  }

  let me = $('#moneyForHotel')
  let artist = $('#moneyForArtist')

  if($('#additionalPrice').val()) {
    moneyUpdater(respMe2, me, artist);
  }

});

$(document).on('page:init', '.page[data-name="artistArchivePictures"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/archive/pictures', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  console.log(respMe2)

  for(let i = 0; i < respMe2.length; i++) {
      console.log(respMe2[i]);
      let html =
      '<li><a href="/artist/archive/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                '<div class="item-inner">' +
                  '<div class="item-title">'+ respMe2[i].name + '</div>'+
              '</div></a></li>';
      $('#artistArchivePicturesList').append(html);
  }
});

$(document).on('page:init', '.page[data-name="artistShowArchivePicture"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/archive/pictures/' + page.route.params.pid, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  console.log(respMe2);

  let available;
  if(respMe2.available) {
    available = "Dostępny do sprzedaży"
  } else {
    available = "Obraz został sprzedany"
  }

  $('#available').text(available);
  $('#name').text(respMe2.name);
  $('#description').text(respMe2.description);
  $('#year').text(respMe2.year + ' r.');
  $('#type').text(respMe2.type);
  $('#price').text(respMe2.price + 'zł');
  $('#width').text(respMe2.width + 'cm');
  $('#height').text(respMe2.height + 'cm');
  $('#image').attr('src', respMe2.imageLocation);
  $('#qrcode').attr('src', respMe2.qrCodeLocation);
  $('#percentage').text(respMe2.percentage + '%');

});

function moneyUpdater(obj, me, artist) {
  let additionalPrice = $('#additionalPrice').val()

  console.log(round(additionalPrice*(obj.percentage/100)))
  console.log(additionalPrice*(obj.percentage/100))

  const moneyForArtist = round(additionalPrice*(obj.percentage/100));
  const moneyForHotel = obj.price+(additionalPrice-moneyForArtist);

  me.text("Po sprzedaży otrzymasz: " + (moneyForHotel) + "zł");
  artist.text("Po sprzedaży artysta otrzyma: " + (moneyForArtist) + "zł")
}

function moneyUpdaterBackendBased(obj, me, artist) {

  console.log(round(obj.additionalPrice*(obj.percentage/100)))
  console.log(obj.additionalPrice*(obj.percentage/100))

  const moneyForArtist = round(obj.additionalPrice*(obj.percentage/100));
  const moneyForHotel = obj.price+(obj.additionalPrice-moneyForArtist);

  me.text("Po sprzedaży otrzymasz: " + (moneyForHotel) + "zł");
  artist.text("Po sprzedaży artysta otrzyma: " + (moneyForArtist) + "zł")
}



$(document).on('page:init', '.page[data-name="hotelShowPicture"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/pictures/' + page.route.params.pid, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  console.log(respMe2);

  let available;
  if(respMe2.available) {
    available = "Dostępny do sprzedaży"
  } else {
    available = "Obraz został sprzedany"
  }

  if(respMe2.onSale || !respMe2.available) {
      $('#submitSellButton').addClass('disabled');
      app.dialog.alert("Ten obraz jest wystawiony na sprzedaż lub został już sprzedany");
  }

  $('#submitSellButton').on('click', async function() {

    let additionalPrice;
    if($('#additionalPrice').val() == '') {
      additionalPrice = { additionalPrice: null };
    } else {
      additionalPrice = { additionalPrice: Number($('#additionalPrice').val()) };
    }

    console.log(additionalPrice)

    const respMe3 = await fetch(localStorage.rolePath + '/pictures/' + page.route.params.pid + '/sell', {
      method: 'POST',
      body: JSON.stringify(additionalPrice),
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

    const respMe4 = await respMe3.json();

    if(respMe3.status == 200) {
      app.dialog.alert(respMe4.msg);
      app.views.main.router.back({url: '/hotel/pictures', force: true});
      app.views.main.router.refreshPage()
    } else {
      app.dialog.alert(respMe4.msg);
    }
  });

  $('#available').text(available);
  $('#name').text(respMe2.name);
  $('#description').text(respMe2.description);
  $('#year').text(respMe2.year + ' r.');
  $('#type').text(respMe2.type);
  $('#price').text(respMe2.price + 'zł');
  $('#width').text(respMe2.width + 'cm');
  $('#height').text(respMe2.height + 'cm');
  $('#image').attr('src', respMe2.imageLocation);
  $('#qrcode').attr('src', respMe2.qrCodeLocation);
  $('#percentage').text(respMe2.percentage + '%');

  if(respMe2.additionalPrice) {
    $('#additionalPrice').val(respMe2.additionalPrice);
  }

  let me = $('#moneyForHotel')
  let artist = $('#moneyForArtist')


  if($('#additionalPrice').val()) {
    moneyUpdater(respMe2, me, artist);
  }
  
  $('#additionalPrice').on('change', async function() {
    moneyUpdater(respMe2, me, artist);
  });

  $('#additionalPrice').on('keyup', async function() {
    moneyUpdater(respMe2, me, artist);
  });

});


$(document).on('page:init', '.page[data-name="hotelMySales"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/sale/pictures', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  for(let i = 0; i < respMe2.length; i++) {
      console.log(respMe2[i]);
      let html =
      '<li><a href="/hotel/sales/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                '<div class="item-inner">' +
                  '<div class="item-title">'+ respMe2[i].name + '</div>'+
              '</div></a></li>';
      $('#hotelMySales').append(html);
  }
});


$(document).on('page:init', '.page[data-name="hotelShowSale"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/sale/pictures/' + page.route.params.pid, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  console.log(respMe2);

  let available;
  if(respMe2.available) {
    available = "Dostępny do sprzedaży"
  } else {
    available = "Obraz został sprzedany"
  }

  //Hotel show my sales - button to remove from selling picture

  $('#available').text(available);
  $('#name').text(respMe2.name);
  $('#description').text(respMe2.description);
  $('#year').text(respMe2.year + ' r.');
  $('#type').text(respMe2.type);
  $('#price').text((respMe2.price+respMe2.additionalPrice) + 'zł');
  $('#width').text(respMe2.width + 'cm');
  $('#height').text(respMe2.height + 'cm');
  $('#image').attr('src', respMe2.imageLocation);
  $('#qrcode').attr('src', respMe2.qrCodeLocation);
  $('#percentage').text(respMe2.percentage + '%');

  let me = $('#moneyForHotel')
  let artist = $('#moneyForArtist')

  moneyUpdaterBackendBased(respMe2, me, artist);


  $('#submitRemoveSalePicture').on('click', async function() {

    const respMe3 = await fetch(localStorage.rolePath + '/sale/pictures/' + page.route.params.pid + '/remove', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

      console.log(respMe3)

    const respMe4 = await respMe3.json();

    console.log(respMe4)

    if(respMe3.status == 200) {
      console.log(respMe4)
      app.dialog.alert(respMe4.msg);
      app.views.main.router.back({url: '/hotel/sales/pictures', force: true});
      app.views.main.router.refreshPage()
    } else {
      app.dialog.alert("Something went wrong");
    }
  });


});

//KLIENT

$(document).on('page:init', '.page[data-name="clientBuyPicturesList"]', async function (e, page) {

    const respMe = await fetch(localStorage.rolePath + '/shop/pictures', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }});
  
    const respMe2 = await respMe.json();
  
    for(let i = 0; i < respMe2.length; i++) {
        console.log(respMe2[i]);
        let html =
        '<li><a href="/client/shop/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                  '<div class="item-inner">' +
                    '<div class="item-title">'+ respMe2[i].name + '</div>'+
                '</div></a></li>';
        $('#clientBuyPicturesList').append(html);
    }
  });
  
  
  $(document).on('page:init', '.page[data-name="clientBuyPicture"]', async function (e, page) {
  
    const respMe = await fetch(localStorage.rolePath + '/shop/pictures/' + page.route.params.pid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }});
  
    const respMe2 = await respMe.json();
  
    console.log(respMe2);
  
    let available;
    if(respMe2.available) {
      available = "Dostępny do sprzedaży"
    } else {
      available = "Obraz został sprzedany"
    }
  
    if(!respMe2.onSale || !respMe2.available) {
        $('#submitBuyPicture').addClass('disabled');
        app.dialog.alert("Ten obraz został już kupiony lub został wycofany ze sprzedaży");
    }
  
    $('#submitBuyPicture').on('click', async function() {
  
      const respMe3 = await fetch(localStorage.rolePath + '/shop/pictures/' + page.route.params.pid + '/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }});
  
      const respMe4 = await respMe3.json();
  
      if(respMe3.status == 200) {
        app.dialog.alert(respMe4.msg);  
        app.views.main.router.back({url: '/shop/pictures', force: true});
        app.views.main.router.refreshPage()
      } else {
        console.log(respMe4)
        app.dialog.alert(respMe4.msg);
      }
    });
  
    $('#available').text(available);
    $('#name').text(respMe2.name);
    $('#description').text(respMe2.description);
    $('#year').text(respMe2.year + ' r.');
    $('#type').text(respMe2.type);
    $('#price').text((respMe2.price+respMe2.additionalPrice) + 'zł');
    $('#width').text(respMe2.width + 'cm');
    $('#height').text(respMe2.height + 'cm');
    $('#image').attr('src', respMe2.imageLocation);

  });

  $(document).on('page:init', '.page[data-name="clientMyPictures"]', async function (e, page) {

    const respMe = await fetch(localStorage.rolePath + '/pictures', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }});
  
    const respMe2 = await respMe.json();
  
    for(let i = 0; i < respMe2.length; i++) {
        console.log(respMe2[i]);
        let html =
        '<li><a href="/client/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                  '<div class="item-inner">' +
                    '<div class="item-title">'+ respMe2[i].name + '</div>'+
                '</div></a></li>';
        $('#clientMyPictures').append(html);
    }
  });
  
  $(document).on('page:init', '.page[data-name="clientShowPicture"]', async function (e, page) {
  
    const respMe = await fetch(localStorage.rolePath + '/pictures/' + page.route.params.pid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }});
  
    const respMe2 = await respMe.json();
  
    console.log(respMe2);
  
    $('#name').text(respMe2.name);
    $('#description').text(respMe2.description);
    $('#year').text(respMe2.year + ' r.');
    $('#type').text(respMe2.type);
    $('#price').text((respMe2.price+respMe2.additionalPrice) + 'zł');
    $('#width').text(respMe2.width + 'cm');
    $('#height').text(respMe2.height + 'cm');
    $('#image').attr('src', respMe2.imageLocation);
  });



$(document).on('page:init', '.page[data-name="home"]', function (e) {
    if(localStorage.token) {
      app.views.main.router.navigate('/accountSettings');
    } else {

      var html =
      '<li>' +
        '<a href="/login/" class="item-content item-link">' +
          '<div class="item-inner">' +
          '<div class="item-title">Zaloguj</div>' +
          '</div>' +
        '</a>' + 
      '</li>' +

      '<li>' +
        '<a href="/register/" class="item-content item-link">' +
          '<div class="item-inner">' +
          '<div class="item-title">Zarejestruj</div>' +
          '</div>' + 
        '</a>' + 
      '</li>';

      $('#main-list').html(html);
    }
});

if(localStorage.token) {
  app.views.main.router.navigate('/accountSettings');
} else {

  var html =
  '<li>' +
    '<a href="/login/" class="item-content item-link">' +
      '<div class="item-inner">' +
      '<div class="item-title">Zaloguj</div>' +
      '</div>' +
    '</a>' + 
  '</li>' +

  '<li>' +
    '<a href="/register/" class="item-content item-link">' +
      '<div class="item-inner">' +
      '<div class="item-title">Zarejestruj</div>' +
      '</div>' + 
    '</a>' + 
  '</li>';

  $('#main-list').html(html);
}