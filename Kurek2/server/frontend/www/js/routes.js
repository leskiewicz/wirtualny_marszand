
var routes = [
  {
    path: '/',
    url: './index.html',
  },
  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },

  {
    path: '/login/',
    url: './pages/auth/login.html',
  },

  {
    path: '/register/',
    url: './pages/auth/register.html',
  },

  {
    path: '/register/userInfo',
    url: './pages/auth/userInfo.html',
  },

  {
    path: '/accountSettings',
    url: './pages/account/accountSettings.html',
  },

  {
    path: '/transactionHistory',
    url: './pages/account/transactionHistory/transactionHistory.html',
  },

  {
    path: '/transactionHistory/:id/details',
    url: './pages/account/transactionHistory/transactionHistoryDetails.html',
  },

  {
    path: '/accountInfo',
    url: './pages/account/accountInfo.html',
  },
  
  {
    path: '/changePassword',
    url: './pages/account/changePassword.html',
  },

  {
    path: '/editInfo',
    url: './pages/account/editInfo.html',
  },
  

  //ARTIST

  {
    path: '/artist/pictures',
    url: './pages/artist/pictures/artistMyPictures.html',
  },

  {
    path: '/artist/pictures/:pid/show',
    url: './pages/artist/pictures/artistShowPicture.html',
  },

  {
    path: '/artist/pictures/add',
    url: './pages/artist/pictures/artistAddPicture.html',
  },

  {
    path: '/artist/sales/pictures',
    url: './pages/artist/sale/artistMySales.html',
  },

  {
    path: '/artist/sales/pictures/:pid/show',
    url: './pages/artist/sale/artistShowSale.html',
  },

  //HOTEL

  {
    path: '/hotel/shop/pictures',
    url: './pages/hotel/buy/hotelBuyPicturesList.html',
  },

  {
    path: '/hotel/shop/pictures/:pid/show',
    url: './pages/hotel/buy/hotelBuyPicture.html',
  },

  {
    path: '/hotel/pictures',
    url: './pages/hotel/pictures/hotelMyPictures.html',
  },

  {
    path: '/hotel/pictures/:pid/show',
    url: './pages/hotel/pictures/hotelShowPicture.html',
  },

  {
    path: '/hotel/sales/pictures',
    url: './pages/hotel/sale/hotelMySales.html',
  },

  {
    path: '/hotel/sales/pictures/:pid/show',
    url: './pages/hotel/sale/hotelShowSale.html',
  },
   
  //KLIENT

  {
    path: '/client/shop/pictures',
    url: './pages/client/buy/clientBuyPicturesList.html',
  },

  {
    path: '/client/shop/pictures/:pid/show',
    url: './pages/client/buy/clientBuyPicture.html',
  },

  {
    path: '/client/pictures',
    url: './pages/client/pictures/clientMyPictures.html',
  },

  {
    path: '/client/pictures/:pid/show',
    url: './pages/client/pictures/clientShowPicture.html',
  },






  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    componentUrl: './pages/dynamic-route.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
