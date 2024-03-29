const peer = new Peer();

peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
    let newpara=document.createElement('p');
    newpara.textContent=id;

    let container= document.querySelector('#container');
    container.appendChild(newpara);

});

peer.on('call', function(call) {
    navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
    })
    .then(function(stream) {
        call.answer(stream);
        const audio = document.getElementById('remoteAudio');
        audio.srcObject = stream;
        audio.play();
    })
    .catch(function(err) {
        console.log('Failed to get local stream', err);
    });
});

function call() {
    const person_to_call = document.getElementById('callings').value;
    console.log('Calling: ' + person_to_call);
    navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
    })
    .then(function(stream) {
        const call = peer.call(person_to_call, stream);
        call.on('stream', function(remoteStream) {
            const audio = document.getElementById('remoteAudio');
            audio.srcObject = remoteStream;
            audio.play();
        });
    })
    .catch(function(err) {
        console.log('Failed to get local stream', err);
    });
}

function answer() {
    navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
    })
    .then(function(stream) {
        peer.on('call', function(call) {
            call.answer(stream);
            const audio = document.getElementById('remoteAudio');
            audio.srcObject = stream;
            audio.play();
        });
    })
    .catch(function(err) {
        console.log('Failed to get local stream', err);
    });

    
}

