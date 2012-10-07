$(document).ready (function () {
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
		getVisits($(this).data('id'));
	});
});
function getVisits(id) {
	$.getJSON('/analytics/getData',
	  {
		userId : id,
		statsType : 'getVisits'
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
	  		$('.fancy').append(template({visits : visits , registrationDate : registrationDate, visitsLog : visitsLog}));
	  	});
  });
}
