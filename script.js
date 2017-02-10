var testName = 'freecodecamp';

// var user = {
// 	name: testName,
// 	id: undefined,
// 	status: undefined
// };

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

function assignUserID (data) {
	var id = data.users[0]._id;
	var name = data.users[0].name;
	getUserChannel(id);
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
	          success: buildChannelElem,
	          error: function() { alert('Error!'); },
	          beforeSend: setHeader
	        });
}

function buildChannelElem (data) {
		var divElem = document.createElement('div');
		divElem.setAttribute('class', 'channel');
		divElem.setAttribute('id', data.name + 'Channel');

		var logoElem = document.createElement('img');
		logoElem.setAttribute('class', 'logo');
		logoElem.setAttribute('id', data.name + 'logo');
		logoElem.setAttribute('src', data.logo);

		divElem.append(logoElem);
		document.body.append(divElem, document.getElementById('container'));

		getUserStatus(data._id, data.name);
}

function getUserStatus (id, name) {
	var req = "https://api.twitch.tv/kraken/streams/" + id;

	function setHeader(xhr) {
		xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
		xhr.setRequestHeader('Client-ID', keys.TWITCHAPI);
	}

	$.ajax({
	          url: req,
	          type: 'GET',
	          dataType: 'json',
	          name: name,
	          success: assignUserStatus,
	          error: function() { alert('Error!'); },
	          beforeSend: setHeader
	        });
}

function assignUserStatus (data) {
	console.log(data);
	console.log(this.name);
	var stat = document.createElement('div');
	stat.setAttribute('id', this.name + 'Status');


	var statP = document.createElement('p');
	statP.setAttribute('class', 'status');

	if(data.stream==null) {
		var statusText = 'OFFLINE';
		statP.innerHTML = statusText;
	} else {
		var statusText = 'ONLINE';
		var link = document.createElement('a');
		link.setAttribute('id', data.stream.channel.name + 'Link');
		link.setAttribute('href', data.stream.channel.url);
		link.innerHTML = statusText;
		statP.append(link);
	}

	stat.append(statP);
	document.getElementById(this.name + 'Channel').append(stat);
}

$(document).ready(function () {
	getUserID('freecodecamp');
	getUserID('ESL_SC2');
	getUserID('GeekandSundry');
});