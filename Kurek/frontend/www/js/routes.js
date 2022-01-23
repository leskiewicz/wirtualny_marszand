
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
    path: '/addGallery',
    url: './pages/account/addGallery.html',
  },

  {
    path: '/myGalleries',
    url: './pages/account/myGalleries.html',
  },

  {
    path: '/changePassword',
    url: './pages/account/changePassword.html',
  },

  {
    path: '/editInfo',
    url: './pages/account/editInfo.html',
  },

  {
    path: '/galleries/:gid/pictures',
    url: './pages/account/myPictures.html',
  },

  

  {
    path: '/galleries/:gid/pictures/:pid/show',
    url: './pages/account/showPicture.html',
  },

  {
    path: '/addPicture/:gid',
    url: './pages/account/addPicture.html',
  },

  {
    path: '/buy/galleries/:gid/pictures',
    url: './pages/account/buy/buyPicturesList.html'
  },

  {
    path: '/buy/galleries/:gid/pictures/:pid',
    url: './pages/account/buy/buyPicture.html'
  },
  
  {
    path: '/buy/galleries',
    url: './pages/account/buy/buyGalleriesList.html',
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
