import "./stylesheets/stylesheet.css";
import "./materialize/materialize.css";

import {remote} from "electron";
import jetpack from "fs-jetpack";

import {Titlebar, Color} from 'custom-electron-titlebar'

new Titlebar({
    backgroundColor: Color.fromHex('#7a97f5'),
    unfocusEffect: false,
    titleHorizontalAlignment: "left",
});

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
analyser.fftSize = 128;
var source;
var canvas = document.getElementById("oscilloscope");
var canvasCtx = canvas.getContext("2d");
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    var constraints = {audio: true}
    var id;
    navigator.mediaDevices.enumerateDevices(constraints)
        .then(
            function (devices) {
                for (let i = 0; i !== devices.length; ++i) {
                    let device = devices[i];
                    if (device.label.includes("Stereo Mix")) {
                        id = device.deviceId;
                    }
                }
                navigator.mediaDevices.getUserMedia({audio: {deviceId: id}})
                    .then(
                        function (stream) {
                            console.log(stream);
                            source = audioCtx.createMediaStreamSource(stream);
                            source.connect(analyser);
                            bufferLength = analyser.frequencyBinCount;
                            analyser.getByteTimeDomainData(dataArray);
                            // analyser.connect(audioCtx.destination);
                        })
                    .catch(function (err) {
                        console.log('The following gUM error occured: ' + err);
                    })
            }
        )
        .catch(function (err) {
            console.log('The following gUM error occured: ' + err);
        })
} else {
    console.log('getUserMedia not supported on your browser!');
}

function draw() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    var barWidth = (canvas.width / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = 'rgb(100,50,50)';
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
    }
}

draw();