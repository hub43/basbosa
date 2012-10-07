$(document).ready (function () {
	var container = $('.chart-container').first().html();
	$('.start-date').last().datepicker().datepicker('setDate', new Date());
	$('.end-date').last().datepicker().datepicker('setDate', new Date());
	$('.new-container').live('click', function() {
		var newChartContainer = $('<div>').addClass('chart-container').html(container);
		$('.chart-container').parent().append(newChartContainer);
		$('.start-date').last().datepicker().datepicker('setDate', new Date());
		$('.end-date').last().datepicker().datepicker('setDate', new Date());
	});
	$('.get-users').live('click', function() {
		getData($(this).parent());
	});
	
});
var parentObj;  	
// save the parent of current object that i clicked on i
function getData (parent) {
		var startTime, endTime;
		parentObj = parent;
		// get date as unix timestamp from datepicker
		if (parent.find('.start-date').datepicker("getDate") == null) {
			startTime = 0;
		} else {
			startTime = parent.find('.start-date').datepicker("getDate").getTime();
		}
		if (parent.find('.end-date').datepicker("getDate") == null) {
			endTime = new Date().getTime();
			endTime = parseInt(endTime);
		} else endTime = parent.find('.end-date').datepicker("getDate").getTime(); 
		// send the data to server that will use it to get active users from db
		$.getJSON('/analytics/getData',
		  {
				startTime: startTime,
				endTime: endTime,
				statsType: parent.find('.stats-type option:selected').text(),
		    format : "json"
		  },
		  function(data) {
		  	// check if data array is empty or not
		  	if (data.length == 0) {
		  		alert("NO data");
		  		return;
		  	}
		  	var dataArray = [ ['Date', parentObj.find('.stats-type option:selected').text()] ],
		  		dataTable, options, chart;
		  		if (parentObj.find('.stats-type option:selected').text() == 'getActiveUsers') {
			  			data.forEach (function (entry) {
			  				dataArray.push ( [ new Date(entry.stime).toLocaleDateString(), entry.count ]);
			  			});
  	  		} else {
  	  				var counters = [], ranges = [];
  	  				ranges = data[0];
  	  				counters = data[1];
  	  				for(var i = 0;i < counters.length; i++) {
  	  					dataArray.push (['[ ' + ranges[i][0] +  ' - ' + ranges[i][1] +' ]' ,counters[i]]);
  	  				}
  	  		}
		  	// intialize the chart and draw it
		  	dataTable = google.visualization.arrayToDataTable (dataArray);
		  	options = { title: parentObj.find('.stats-type option:selected').text()};
		  	chart = new google.visualization.ColumnChart (parentObj.find('#chart').get(0));
		  	chart.draw (dataTable, options);
	  });
}