var calendar = angular.module('calendar', []);
calendar.controller('calendarController', ['auth', '$window', 'Events', 'Plants','$compile', '$timeout', 'uiCalendarConfig','$q', function(auth, $window, Events, Plants, $compile, $timeout, uiCalendarConfig, $q) {
  var that = this;
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  that.data = {};
  that.data.username = $window.localStorage.getItem('username');
  var tempEvents = [];
  var plantPromises = [];

  that.getEvents = function(){
    Events.getUserEvents(that.data)
      .then(function(results){
        console.log(results.data, 'h234234234234234234')
          for(var key in results.data){
            console.log(results.data[key], 'HEY GURL HAYYY')

            for(var i = 0; i < results.data[key].events.length; i++){
              // console.log()
              var name = results.data[key].nickname;
              that.data.eventDate = results.data[key].events[i];
                // console.log(that.data.eventDate, 'OWEORW#$&HK#@Y**^(#$HJKNM<JBGU)')
                var year = moment(that.data.eventDate).format('YYYY');
                var month = moment(that.data.eventDate).format('MM');
                var day = moment(that.data.eventDate).format('DD');

                that.events.push({
                  title: 'Water ' + name,
                  start : new Date(year, month-1, day, 5),
                  end : new Date(year, month-1, day, 5, 30),
                  allDay : false
                })
              }
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
