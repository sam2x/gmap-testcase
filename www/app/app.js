"use strict";

angular.module("ngapp", [ "ui.router", "ngMaterial", "ngCordova", "ngStorage" ])
// ngTouch is No Longer Supported by Angular-Material

.run(function($rootScope, $cordovaDevice, $cordovaStatusbar, $timeout, $interval, $log){
  $rootScope.isReady = false;
  $rootScope.mem = {};

  document.addEventListener("deviceready", function () {
    $timeout(function(){
      $rootScope.isReady = true;
      $rootScope.deviceInformation = device
      // remove 'sensitive' data
      delete $rootScope.deviceInformation.serial;
      delete $rootScope.deviceInformation.uuid;
    })
    $interval(function(){
      chrome.system.memory.getInfo(function (memory_info){
        $timeout(function(){
          memory_info.capacity = (memory_info.capacity/1048576).toFixed(2),
          memory_info.availableCapacity = (memory_info.availableCapacity/1048576).toFixed(2),
          $rootScope.mem = memory_info;
        })
      })    
    }, 1000)

    $cordovaStatusbar.overlaysWebView(false); // Always Show Status Bar
    $cordovaStatusbar.styleHex('#E53935'); // Status Bar With Red Color, Using Angular-Material Style
    // window.plugins.orientationLock.lock("portrait");
  }, false);
  /* Hijack Android Back Button (You Can Set Different Functions for Each View by Checking the $state.current)
  document.addEventListener("backbutton", function (e) {
      if($state.is('init')){
        navigator.app.exitApp();
      }  else{
        e.preventDefault();
      }
    }, false);*/
})

.config(function($mdThemingProvider, $mdGestureProvider) { // Angular-Material Color Theming
  $mdGestureProvider.skipClickHijack();

  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue');
});
