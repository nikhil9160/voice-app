		var getUserMedia = (function () {
			if (navigator.getUserMedia) {
				return navigator.getUserMedia.bind(navigator)
			}
			if (navigator.webkitGetUserMedia) {
				return navigator.webkitGetUserMedia.bind(navigator)
			}
			if (navigator.mozGetUserMedia) {
				return navigator.mozGetUserMedia.bind(navigator)
			}
		})();

		function onReceiveStream(stream) {
			var audio = document.querySelector('audio');
			console.log(audio);
			audio.srcObject = stream;
			audio.onloadedmetadata = function (e) {
				console.log('now playing the audio');
				audio.play();
			}
		}

		function call() {
			var person_to_call = document.getElementById('callings').value;
			console.log('WE IS CALLING ' + person_to_call);
			var peer = new Peer();
			getUserMedia({
				video: false,
				audio: true
			}, function (stream) {
				var call = peer.call(person_to_call, stream);
				call.on('stream', function (remoteStream) {
					console.log(remoteStream);
					onReceiveStream(remoteStream);
					
				});
			}, function (err) {
				console.log('Failed to get local stream', err);
			});

		}

		function answer() {
			var peer = new Peer();
			peer.on('open', (id) => {
				document.getElementById('peerid').innerHTML = id;
			});
			peer.on('call', function (call) {
				getUserMedia({
					video: false,
					audio: true
				}, function (stream) {
					
					call.answer(stream); // Answer the call with an A/V stream.
					call.on('stream', function (remoteStream) {
						console.log(remoteStream);
						onReceiveStream(remoteStream);
						// Show stream in some video/canvas element.
					});
				}, function (err) {
					console.log('Failed to get local stream', err);
				});
			});
		}
	
