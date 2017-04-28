"use strict";

angular.module("ngapp").controller("MapController", function(shared, $state, $scope, $rootScope, $log){
  $rootScope.stateName = "map";
  $scope.loadedMarker = 0;
  var ctrl = this;
  var bounds = []
  var markersById = {}
  var markersList = [
    {id:"p_6469450188_6ece", longitude:10.5193, latitude:50.3599, icon:"8.png"},
    {id:"p_6473199770_0d6f", longitude:10.5172, latitude:50.3623, icon:"1.png"},
    {id:"p_6671010299_7bcd", longitude:10.5237, latitude:50.3532, icon:"6.png"},
    {id:"p_9480925537_5cb7", longitude:10.5157, latitude:50.3404, icon:"9.png"},
    {id:"p_9480926554_3c65", longitude:10.5283, latitude:50.3593, icon:"8.png"},
    {id:"p_9480932882_c88a", longitude:10.5174, latitude:50.3416, icon:"7.png"},
    {id:"p_9480934823_49c9", longitude:10.5157, latitude:50.3416, icon:"1.png"},
    {id:"p_9480935492_0c01", longitude:10.5292, latitude:50.3626, icon:"1.png"},
    {id:"p_9480942288_8f8d", longitude:10.5225, latitude:50.3603, icon:"0.png"},
    {id:"p_9480943002_056a", longitude:10.5258, latitude:50.3577, icon:"0.png"},
    {id:"p_4922483270_565f", longitude:10.5176, latitude:50.3623, icon:"2.png"},
    {id:"p_4923586959_9b26", longitude:10.5183, latitude:50.3647, icon:"2.png"},
    {id:"p_4923611898_6afa", longitude:10.5207, latitude:50.3502, icon:"1.png"},
    {id:"p_4923783204_1c6b", longitude:10.5190, latitude:50.3577, icon:"7.png"},
    {id:"p_4923805824_0b62", longitude:10.5293, latitude:50.3603, icon:"0.png"},
    {id:"p_4923853599_ee2d", longitude:10.5017, latitude:50.3554, icon:"1.png"},
    {id:"p_4924053044_bee4", longitude:10.5275, latitude:50.3553, icon:"2.png"},
    {id:"p_4924221139_dcd5", longitude:10.5177, latitude:50.3624, icon:"7.png"},
    {id:"p_4924292391_c0b7", longitude:10.5166, latitude:50.3567, icon:"6.png"},
    {id:"p_4924389319_385f", longitude:10.5185, latitude:50.3645, icon:"2.png"},
    {id:"p_4924470153_1514", longitude:10.5183, latitude:50.3645, icon:"0.png"},
    {id:"p_4924539143_b4f4", longitude:10.5253, latitude:50.3576, icon:"4.png"},
    {id:"p_4924612501_4c38", longitude:10.5203, latitude:50.3497, icon:"1.png"},
    {id:"p_4924618435_3307", longitude:10.5171, latitude:50.3582, icon:"1.png"},
    {id:"p_4924686164_9ce7", longitude:10.5267, latitude:50.3577, icon:"7.png"},
    {id:"p_4924795627_41b9", longitude:10.5188, latitude:50.3630, icon:"2.png"},
    {id:"p_4924926208_b435", longitude:10.5235, latitude:50.3575, icon:"0.png"},
    {id:"p_4925099423_a7ca", longitude:10.5297, latitude:50.3605, icon:"3.png"},
    {id:"p_1911419720_e9c4", longitude:10.6823, latitude:50.4063, icon:"9.png"},
    {id:"p_1911430465_4acd", longitude:10.6828, latitude:50.4057, icon:"2.png"},
    {id:"p_1911431256_7420", longitude:10.6829, latitude:50.4055, icon:"3.png"},
    {id:"p_1911434204_b8d8", longitude:10.7829, latitude:50.4005, icon:"7.png"},
    {id:"p_1911428564_87e8", longitude:10.7945, latitude:50.4323, icon:"3.png"},
    {id:"p_1911429527_124d", longitude:10.8413, latitude:50.4393, icon:"3.png"},
    {id:"p_1911420603_10e0", longitude:10.8193, latitude:50.4477, icon:"7.png"},
    {id:"p_1911427076_06ac", longitude:10.8187, latitude:50.4583, icon:"7.png"},
    {id:"p_9522498035_5573", longitude:10.8773, latitude:50.4099, icon:"4.png"},
    {id:"p_6473231389_037e", longitude:10.9540, latitude:50.4547, icon:"2.png"},
    {id:"p_6473246837_bf00", longitude:10.9525, latitude:50.4549, icon:"0.png"},
    {id:"p_6476327971_e1a9", longitude:10.9515, latitude:50.4541, icon:"2.png"},
    {id:"p_6554726747_5dba", longitude:10.9646, latitude:50.3927, icon:"1.png"},
    {id:"p_6565060109_ee8f", longitude:10.9527, latitude:50.4533, icon:"7.png"},
    {id:"p_6642101108_a6d0", longitude:10.9493, latitude:50.4553, icon:"1.png"},
    {id:"p_6673560925_25da", longitude:10.9525, latitude:50.4526, icon:"2.png"},
    {id:"p_7674178268_ae40", longitude:10.9562, latitude:50.4594, icon:"5.png"},
    {id:"p_9522502610_e1c2", longitude:10.9511, latitude:50.4539, icon:"0.png"},
    {id:"p_9522503580_84c2", longitude:10.9957, latitude:50.4325, icon:"4.png"},
    {id:"p_9522505187_839e", longitude:10.8767, latitude:50.4482, icon:"4.png"},
    {id:"p_9522513098_dd20", longitude:10.9524, latitude:50.4538, icon:"0.png"},
    {id:"p_9522513892_a7ef", longitude:10.9351, latitude:50.4613, icon:"2.png"},
    {id:"p_9522514436_b1c1", longitude:10.9525, latitude:50.4551, icon:"0.png"},
    {id:"p_9522515707_e9e3", longitude:10.9532, latitude:50.4526, icon:"0.png"},
    {id:"p_4922293099_5507", longitude:10.9171, latitude:50.4519, icon:"1.png"},
    {id:"p_4922385182_6073", longitude:10.9415, latitude:50.4562, icon:"1.png"},
    {id:"p_4922641460_fedf", longitude:10.9523, latitude:50.4534, icon:"7.png"},
    {id:"p_4923115738_81c3", longitude:10.8934, latitude:50.4477, icon:"1.png"},
    {id:"p_4998518775_e4bc", longitude:10.9525, latitude:50.4537, icon:"4.png"},
    {id:"p_5009877754_4cd6", longitude:10.9531, latitude:50.4529, icon:"0.png"},
    {id:"p_5096071012_2b57", longitude:10.9525, latitude:50.4528, icon:"0.png"},
    {id:"p_5096074442_5d73", longitude:10.9531, latitude:50.4531, icon:"0.png"},
    {id:"p_5096077714_69fe", longitude:10.9523, latitude:50.4501, icon:"0.png"},
    {id:"p_5096081034_1f9c", longitude:10.9546, latitude:50.4545, icon:"1.png"},
    {id:"p_5096444179_8ebd", longitude:10.9529, latitude:50.4547, icon:"2.png"},
    {id:"p_5096447122_3765", longitude:10.9528, latitude:50.4525, icon:"0.png"},
    {id:"p_9522511613_5b0b", longitude:10.8835, latitude:50.4708, icon:"8.png"},
  ]
  var div = document.getElementById("myMap");
  var map = plugin.google.maps.Map.getMap(div);

  $scope.addMarkers = function(data, callback) {
      var mlen = 0;
      function onMarkerAdded(marker){
          $scope.loadedMarker += 1;
          marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function() {
              var id = marker.get('params').sid
              markersById[id].panTo();
          });
          markersById[marker.get('params').sid].gmarker = marker
          mlen += 1;
          if (mlen == data.length)callback();
      }

      for (var i=0, dlen=data.length; i < dlen; i++)
      {
          var m = data[i];
          markersById[m.id] = m
          var glatlng = new plugin.google.maps.LatLng(
              parseFloat(m.latitude), 
              parseFloat(m.longitude))
          bounds.push(glatlng);
          m.panTo = function(zoom){
              var self = this;
              var zoomLevel = (zoom ? zoom : 15);

              map.animateCamera({
                'target': self.gmarker.getPosition(),
                'duration': 1000, // = 3 sec.
                'zoom': zoomLevel,
              }, function(){
                  self.gmarker.setAnimation(plugin.google.maps.Animation.BOUNCE)
              })
          }
          map.addMarker({
              params:{
                  'sid': m.id,
              },
              'position': glatlng,
              /* TO SEE MEMORY DIFFERENCE WITH & WITHOUT ICON 
                 COMMENT THE ICON OPTION BELOW */
              'icon': {
                  url: 'assets/img/' + m.icon,
                  size: {
                      width: 32,
                      height: 32,
                  }
              },
          }, onMarkerAdded);            
      }
  }

  map.one(plugin.google.maps.event.MAP_READY, function(){
      $log.log('map ready:', $scope.map)
      $scope.addMarkers(markersList, function() {
        map.animateCamera({
          'target': bounds,
          'duration': 2000, // = 1 sec.
          // 'padding':'40'
        }, function() {
            bounds = null;
        })
      })     
  })

  $scope.$on('$destroy', function() {
      // we have to clean gmarker!
      // $interval.cancel(marker_me_interval);
      for (var i=0, mlen=markersList.length; i < mlen ; i++)
      {
        markersList[i].gmarker.removeEventListener(plugin.google.maps.event.MARKER_CLICK);
        markersList[i].gmarker.remove();
        markersList[i].gmarker = null;
        markersById[markersList[i].id] = null;
        markersList[i] = null;
      }
      $log.log('destroying map')
      map.clear();
      map.off();
      map.remove();
      map = null;
  })
})