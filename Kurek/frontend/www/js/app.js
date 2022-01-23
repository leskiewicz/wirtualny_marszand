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


var myGalleriesHtml =
'<li>' +
  '<a id="myGal" href="/myGalleries/" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Moje Galerie</div>' +
    '</div>' +
  '</a>' +
'</li>';

var buyGalleriesHtml =
'<li>' +
  '<a id="buyGal" href="/buy/galleries/" class="item-content item-link">' +
    '<div class="item-inner">' +
      '<div class="item-title">Kup obraz</div>' +
    '</div>' +
  '</a>' +
'</li>';

var combinedHtml = myGalleriesHtml + buyGalleriesHtml;

var rolePaths = ["http://localhost:3000/klient", "http://localhost:3000/hotel", "http://localhost:3000/artysta"];
var registerUser = {}

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

      registerUser.email = email;
      registerUser.password = password;

  });

});

$(document).on('page:beforein', '.page[data-name="accountSettings"]', function (e) {
  

  
  if(localStorage.role == "HOTEL") {

    if(!$('#myGal').length && !$('#buyGal').length) {
      $(combinedHtml).insertAfter($('#settingsList li:first-child'))
    }
    
  } else if(localStorage.role == "KLIENT") {
    
    if(!$('#buyGal').length) {
      $(buyGalleriesHtml).insertAfter($('#settingsList li:first-child'))
    }

  } else if(localStorage.role == "ARTYSTA") {

    if(!$('#myGal').length) {
      $(myGalleriesHtml).insertAfter($('#settingsList li:first-child'))
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
        const register = await fetch('http://localhost:3000/auth/register', {
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
      const respMe = await fetch('http://localhost:3000/user/me', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});
    
      const respMe2 = await respMe.json();
      console.log(respMe2);

      console.log($('#email'));

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

      const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userLogin)
      });
      const body = await response.json();

      if(response.status == 200) {
          
          localStorage.token = body.token;

          const respMe = await fetch('http://localhost:3000/user/me', {
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
          app.views.main.router.navigate('/');
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
      const respMe = await fetch('http://localhost:3000/user/me', {
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

    const respMe = await fetch('http://localhost:3000/user/me/updateInfo', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
    },
    body: JSON.stringify(newData)});

    const respMe2 = await respMe.json();
    console.log(respMe2);
  });

});

$(document).on('page:init', '.page[data-name="changePassword"]', function (e) {
  
  let passCreds = {};

  $('#submitChangePassword').on('click', async function () {
    console.log("WITAJ ŚWIAT")
      var password = $('#changePasswordForm [name="oldpass"]').val();
      var newpassword = $('#changePasswordForm [name="newpass"]').val();
      var renewpassword = $('#changePasswordForm [name="renewpass"]').val();
      
      passCreds.password = password;
      passCreds.newpassword = newpassword;
      passCreds.renewpassword = renewpassword;

      const respMe = await fetch('http://localhost:3000/user/me/updatePassword', {
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
        } 
  });

});

$(document).on('page:init', '.page[data-name="transactionHistory"]', async function (e) {

  const respMe = await fetch(localStorage.rolePath + '/transactions/me', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
    }});

    const respMe2 = await respMe.json();

    for(let i = 0; i < respMe2.length; i++) {
        console.log(respMe2[i]);

        let creation = respMe2[i].createdAt.split("T");

        let text;

        if(respMe2[i].buyEmail == localStorage.email) {
            text = "ZAKUPIONO"
        } else if(respMe2[i].sellEmail == localStorage.email) {
            text = "SPRZEDANO"
        }

        console.log(respMe2[i].name)
        
        let html =
        '<li>' +
          '<a href="/transactionHistory/' + respMe2[i].id + '/details" class="item-link item-content">' +
            '<div class="item-inner">' +
            '<div class="item-title">' + 
              respMe2[i].name + '<div class="item-footer">' + respMe2[i].price + 'zł</div>' +
            '</div>' +
            '<div class="item-after">' + text + ', ' + creation[0] + ', ' + creation[1].split(".")[0] + '</div>' +
            '</div>' +
          '</a>' +
		    '</li>';
        $('#transactionHistoryList').append(html);
    }

});

$(document).on('page:init', '.page[data-name="transactionHistoryDetails"]', async function (e, page) {
  
  if(localStorage.rolePath) {

    const respMe = await fetch(localStorage.rolePath + '/transactions/me/' + page.route.params.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }});

    const respMe2 = await respMe.json();

    let respMe2c = respMe2[0];

    let creation = respMe2c.createdAt.split("T");
    let text;

    if(respMe2c.buyEmail == localStorage.email) {
        text = "ZAKUPIONO"
    } else if(respMe2c.sellEmail == localStorage.email) {
        text = "SPRZEDANO"
    }

    $('#action').text(text);
    $('#date').text(creation[0] + ' ' + creation[1].split(".")[0]);
    $('#buyer').text(respMe2c.buyEmail);
    $('#seller').text(respMe2c.sellEmail);
    $('#name').text(respMe2c.name);
    $('#type').text(respMe2c.type);
    $('#price').text(respMe2c.price + "zł");
    $('#width').text(respMe2c.width + "cm");
    $('#height').text(respMe2c.height + "cm");
    $('#year').text(respMe2c.year + " r.");
    $('#description').text(respMe2c.description);
  }

});

$(document).on('page:init', '.page[data-name="addGallery"]', function (e) {

  let newGallery = {};

  $('#submitAddGallery').on('click', async function () {

      newGallery.name = $('#galleryName').val();

      console.log(newGallery);

      const respMe = await fetch(localStorage.rolePath + '/galleries/me', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.token
          },
          body: JSON.stringify(newGallery)});

      const respMe2 = await respMe.json();
      console.log(respMe2);

  });

});


$(document).on('page:init', '.page[data-name="myGalleries"]', async function (e) {

  const respMe = await fetch(localStorage.rolePath + '/galleries/me', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  for(let i = 0; i < respMe2.length; i++) {
      console.log(respMe2[i]);
      let html =
      '<li><a href="/galleries/'+ respMe2[i].id +'/pictures" class="item-content item-link">'+
                '<div class="item-inner">' +
                  '<div class="item-title">'+ respMe2[i].name + '</div>'+
              '</div></a></li>';
      $('#myGalleries').append(html);
  }

});

$(document).on('page:init', '.page[data-name="myPictures"]', async function (e, page) {

  let html = '<li><a href="/addPicture/'+ page.route.params.gid +'" class="item-content item-link">'+
      '<div class="item-inner">' +
          '<div class="item-title">Dodaj Obraz</div>'+
      '</div></a></li>';
  $('#myPictures').append(html);

  const respMe = await fetch(localStorage.rolePath + '/galleries/me/' + page.route.params.gid + '/pictures', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
      }});

  const respMe2 = await respMe.json();

  for(let i = 0; i < respMe2.length; i++) {
      console.log(respMe2[i]);
      let html =
      '<li><a href="/galleries/'+ page.route.params.gid +'/pictures/'+ respMe2[i].id +'/show" class="item-content item-link">'+
                '<div class="item-inner">' +
                  '<div class="item-title">'+ respMe2[i].name + '</div>'+
              '</div></a></li>';
      $('#myPictures').append(html);
  }
});


$(document).on('page:init', '.page[data-name="addPicture"]', async function (e, page) {

  $('#submitAddPicture').on('click', async function () {
      let formData  = new FormData();

      formData.append('name', $('#name').val());
      formData.append('description', $('#description').val());
      formData.append('year', $('#year').val());
      formData.append('type', $('#type').val());
      formData.append('price', $('#price').val());
      formData.append('width', $('#width').val());
      formData.append('height', $('#height').val());
      formData.append('image', $('#image')[0].files[0])

      console.log(...formData)

      const respMe = await fetch(localStorage.rolePath + '/galleries/me/'+ page.route.params.gid +'/pictures', {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + localStorage.token
      },
      body: formData});

      const respMe2 = await respMe.json();
      console.log(respMe);
      console.log(respMe2);
  });

});

$(document).on('page:init', '.page[data-name="showPicture"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/galleries/me/' + page.route.params.gid + '/pictures/' + page.route.params.pid, {
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
  $('#qrcode').attr('src', respMe2.qrCodeLocation);

});

$(document).on('page:init', '.page[data-name="buyGalleriesList"]', async function (e) {

  const respMe = await fetch(localStorage.rolePath + '/galleries', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
    }});

    const respMe2 = await respMe.json();

    for(let i = 0; i < respMe2.length; i++) {
        console.log(respMe2[i]);
        let html =
        '<li><a href="/buy/galleries/'+ respMe2[i].id +'/pictures" class="item-content item-link">'+
                  '<div class="item-inner">' +
                    '<div class="item-title">'+ respMe2[i].name + '</div>'+
                '</div></a></li>';
        $('#buyGalleriesList').append(html);
    }

});

$(document).on('page:init', '.page[data-name="buyPicturesList"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/galleries/' + page.route.params.gid + '/pictures', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
    }});

    const respMe2 = await respMe.json();

    for(let i = 0; i < respMe2.length; i++) {
        console.log(respMe2[i]);
        let html =
        '<li><a href="/buy/galleries/'+ page.route.params.gid+ '/pictures/'+ respMe2[i].id +'" class="item-content item-link">'+
        '<div class="item-inner">' +
            '<div class="item-title">'+ respMe2[i].name + '</div>'+
        '</div></a></li>';
        $('#buyPicturesList').append(html);
    }
});


$(document).on('page:init', '.page[data-name="buyPicture"]', async function (e, page) {

  const respMe = await fetch(localStorage.rolePath + '/galleries/' + page.route.params.gid + '/pictures/' + page.route.params.pid, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
    }});

    const respMe2 = await respMe.json();

    console.log(respMe2);

    $('#name').text(respMe2.name);
    $('#description').text(respMe2.description);
    $('#year').text(respMe2.year);
    $('#type').text(respMe2.type);
    $('#price').text(respMe2.price + 'zł');
    $('#width').text(respMe2.width + 'cm');
    $('#height').text(respMe2.height + 'cm');
    $('#image').attr('src', respMe2.imageLocation);
    //$$('#qrcode')[0].src = respMe2.qrCodeLocation;
    if(!respMe2.available) {
        $('#submitBuyPicture').addClass('disabled');
        app.dialog.alert("Ten obraz nie jest już dostępny do zakupu");
    }

    $('#submitBuyPicture').on('click', async function () {
    const respMe = await fetch(localStorage.rolePath + '/galleries/' + page.route.params.gid+ '/pictures/' + page.route.params.pid + '/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
        }});

    const respMe2 = await respMe.json();
    console.log(respMe2);
    });

});

$(document).on('page:beforein', '.page[data-name="home"]', function (e) {
    if(localStorage.token) {
      var html = 
      '<li>'+
        '<a href="/accountSettings/" class="item-content item-link">'+
          '<div class="item-inner">'+
            '<div class="item-title">Account Settings</div>'+
          '</div>'+
        '</a>'+
      '</li>';

    $('#main-list').html(html);
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
  var html = 
  '<li>'+
    '<a href="/accountSettings/" class="item-content item-link">'+
      '<div class="item-inner">'+
        '<div class="item-title">Account Settings</div>'+
      '</div>'+
    '</a>'+
  '</li>';

$('#main-list').html(html);
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





/*
// Login Screen Demo
$('#my-login-screen').on('click', function () {
  var username = $('#my-login-screen [name="username"]').val();
  var password = $('#my-login-screen [name="password"]').val();

  // Close login screen
  app.loginScreen.close('#my-login-screen');

  // Alert username and password
  app.dialog.alert('Username: ' + username + '<br/>Password: ' + password);
});

$('#submitLogin').on('click', function () {
  console.log("HELLO");
});
*/