$(document).ready (function () {
	$('.search').live('click', function() {
		getUsers($('.input').val());
	});
	$('.input').live('keydown', function (event) {
  	var keycode = ( event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode ) );
  	if (keycode == 13) {
  		getUsers($(this).val());
  	}
	});
	$('.history').fancybox({
		helpers: {
			title : {
				type : 'outside'
			},
			overlay : {
				speedOut : 0
			}
		}
	});
	$('.history').live('click', function() {
		showVisits($(this).data('id'));
	});
});

function getUsers(userNameString) {
	$.getJSON('/analytics/getData', {statsType : 'search', userName : userNameString}, function(data) {
		if (data.length != 0) {
			$('.table').css('display', 'block');
			require(['cores/themes/views/users_result.jade'], function(template) {
	  		$('.table').append().html('');
	  		$('.table').append(template({users : data}));
	  	});
		 // alert(data.length);
		} else {
			alert('No Data Founded.');
		}
		
  });
}
function showVisits(id) {
	$.getJSON('/analytics/getData',
	  {
			userId : id,
			statsType : 'getVisits',
	  },
	  function(data) {
	  	if (data.length == 0) {
	  		alert("NO data");
	  		return;
	  	}
	  	var registrationDate = data.registrationDate
	  	, visits = data.visits
	  	, visitsLog = extractVisitsLog(visits);
	  	require(['cores/themes/views/user_visits.jade'], function(template) {
	  		$('#history').append().html('');
	  		$('#history').append(template({visits : visits , registrationDate : registrationDate, visitsLog : visitsLog}));
	  	});
  });
}