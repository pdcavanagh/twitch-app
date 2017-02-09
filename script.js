var testName = 'freecodecamp';

var user = {
	name: testName,
	id: undefined,
	status: undefined
};

function assignUserID (data) {
	user.id = data.users[0]._id;

	getUserStatus(user.id);
	getUserChannel(user.id);
}

function assignUserStatus (data) {
	console.log(data);

	var stat = document.createElement('div');
	stat.setAttribute('id', user.name + 'Status');
	document.getElementById('container').append(stat);

	if(data.stream==null) {
		user.status = 'OFFLINE';
		document.getElementById(user.name + 'Status').innerHTML = user.status;
	} else {
		user.status = 'ONLINE';
		var stat = document.createElement('a');
		stat.setAttribute('id', user.name + 'Link');
		stat.setAttribute('href', data.url);
		document.getElementById(stat).append(link);
		document.getElementById(user.name + 'Link').innerHTML = user.status;
	}
}

function updateLogo (data) {
		document.getElementById('logo').src = data.logo;
}

function getUserChannel (id) {
	var req = "https://api.twitch.tv/kraken/channels/" + id;

	function setHeader(xhr) {
		xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
		xhr.setRequestHeader('Client-ID', keys.TWITCHAPI);
	}

	$.ajax({
	          url: req,
	          type: 'GET',
	          dataType: 'json',
	          success: updateLogo,
	          error: function() { alert('Error!'); },
	          beforeSend: setHeader
	        });
}

function getUserStatus (id) {
	var req = "https://api.twitch.tv/kraken/streams/" + id;

	function setHeader(xhr) {
		xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
		xhr.setRequestHeader('Client-ID', keys.TWITCHAPI);
	}

	$.ajax({
	          url: req,
	          type: 'GET',
	          dataType: 'json',
	          success: assignUserStatus,
	          error: function() { alert('Error!'); },
	          beforeSend: setHeader
	        });
}

function getUserID(username) {
	var twitchReq = "https://api.twitch.tv/kraken/users?login=" + username;

	function setHeader(xhr) {
		xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
		xhr.setRequestHeader('Client-ID', keys.TWITCHAPI);
	}

	$.ajax({
	          url: twitchReq,
	          type: 'GET',
	          dataType: 'json',
	          success: assignUserID,
	          error: function() { alert('boo!'); },
	          beforeSend: setHeader
	        });
}

$(document).ready(function () {
	getUserID('freecodecamp');
});