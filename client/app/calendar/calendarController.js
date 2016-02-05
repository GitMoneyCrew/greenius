var calendar = angular.module('calendar', []);
calendar.controller('calendarController', ['auth', '$window', 'Events', 'Plants','$compile', '$timeout', 'uiCalendarConfig', function(auth, $window, Events, Plants, $compile, $timeout, uiCalendarConfig) {
	var that = this;
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  that.data = {};
  that.data.username = $window.localStorage.getItem('username');

  that.getEvents = function(){
    Events.getUserEvents(that.data)
      .then(function(results){
        for(var i = 0; i < results.data.length; i++){
          that.data.eventDate = results.data[i].eventDate;
            var year = moment(that.data.eventDate).format('YYYY');
            var month = moment(that.data.eventDate).format('MM');
            var day = moment(that.data.eventDate).format('DD');
            var hour = moment(that.data.eventDate).format('HH');
            var minute = moment(that.data.eventDate).format('mm');
            that.events.push({
              title: 'Water me',
              start : new Date(year, month-1, day, hour, minute),
              end : new Date(year, month-1, day, hour, minute + 15)
            })
          }
        })
      .catch(function(error){
        console.log(error, 'ERROR INSIDE GETUSEREVENTS CONTROLLER');
      })
  };
  that.getEvents();
  that.events = [];


  /* Change View */
  that.changeView = function(view,calendar) {
    uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
  };

  /* Change View */
  that.renderCalender = function(calendar) {
    $timeout(function() {
     if(uiCalendarConfig.calendars[calendar]){
       uiCalendarConfig.calendars[calendar].fullCalendar('render');
     }
   });
  };

  /* Configure calendar */
  that.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: that.alertOnEventClick,
        eventDrop: that.alertOnDrop,
        eventResize: that.alertOnResize,
        eventRender: that.eventRender
      }
    };

    that.eventSources = [that.events];

}]);
