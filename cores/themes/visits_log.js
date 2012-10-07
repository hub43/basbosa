
function extractVisitsLog(visits) {
	var duration = 0
	, totalVisits = 0, minDuration = visits[0].duration
	, maxDuration = visits[0].duration, data = {}; 
	for(var i = 0; i < visits.length; i++) {
		duration += visits[i].duration;
		if (visits[i].duration != 0) {
			totalVisits += 1;
			if (minDuration > visits[i].duration) minDuration = visits[i].duration;
  		if (maxDuration <  visits[i].duration) maxDuration = visits[i].duration;
		}
	}
	data.averageVisits = timeStampToHms(duration / totalVisits), data.totalVisits = totalVisits
	, data.minDuration =  timeStampToHms(minDuration), data.maxDuration =  timeStampToHms(maxDuration);
	return data;
}
function timeStampToHms(millseconds) {
	var bSeconds, min, hours, seconds, time = {};
	 bSeconds = millseconds / 1000;
	 min = Math.floor(millseconds / 60000);
	 hours = Math.floor(min / 60);
	 seconds = Math.floor(bSeconds % 60);
	 time.hours = hours;
	 time.min = min;
	 time.seconds = seconds;
	 return time;
}