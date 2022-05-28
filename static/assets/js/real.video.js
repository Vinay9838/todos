
document.getElementById("video_alert").style.display = "none";
document.getElementById("video_error").style.display = "none";
// Next, declare the options that will passed into the recording constructor
const video_options = {
  controls: true,
  bigPlayButton: false,
  width: 600,
  height: 300,
  fluid: true, // this ensures that it's responsive
  plugins: {
    wavesurfer: {
      backend: "WebAudio",
      waveColor: "#f7fff7", // change the wave color here. Background color was set in the css above
      progressColor: "#ffe66d",
      displayMilliseconds: true,
      debug: true,
      cursorWidth: 1,
      hideScrollbar: true,
      plugins: [
        // enable microphone plugin
        WaveSurfer.microphone.create({
          bufferSize: 4096,
          numberOfInputChannels: 1,
          numberOfOutputChannels: 1,
          constraints: {
            video: true,
            audio: true,
          },
        }),
      ],
    },
    record: {
      audio: true, // only audio is turned on
      video: true, // you can turn this on as well if you prefer video recording.
      maxLength: 180, // how long do you want the recording?
      displayMilliseconds: true,
      debug: true,
    },
  },
};


// apply audio workarounds for certain browsers
applyAudioWorkaround();

// create player and pass the the audio id we created then
var player = videojs("recordVideo", video_options, function () {
  // print version information at startup
  var msg =
    "Using video.js " +
    videojs.VERSION +
    " with videojs-record " +
    videojs.getPluginVersion("record") +
    ", videojs-wavesurfer " +
    videojs.getPluginVersion("wavesurfer") +
    ", wavesurfer.js " +
    WaveSurfer.VERSION +
    " and recordrtc " +
    RecordRTC.version;
  videojs.log(msg);
});



// error handling
player.on("deviceError", function () {
  console.log("device error:", player.deviceErrorCode);
});

player.on("error", function (element, error) {
  console.error(error);
});

// user clicked the record button and started recording
player.on("startRecord", function () {
  console.log("started recording!");
});

// user completed recording and stream is available
player.on("finishRecord", function () {
  const audioFile = player.recordedData;

  console.log("finished recording: ", audioFile);

  $("#submit").prop("disabled", false);
  document.getElementById("alert").style.display = "block";
});

// Give event listener to the submit button
$("#video_submit").on("click", function (event) {
  event.preventDefault();
  let btn = $(this);
  //   change the button text and disable it
  btn.html("Submitting...").prop("disabled", true).addClass("disable-btn");
  //   create a new File with the recordedData and its name

  const recordedFile = new File([player.recordedData], `audiorecord.webm`);
  //   grabs the value of the language field
  //const language = document.getElementById("language").value;
  //   initializes an empty FormData
  let data = new FormData();
  //   appends the recorded file and language value
  data.append("recorded_audio", recordedFile);
  data.append("record_type","video");
  //   post url endpoint
  const url = "/record/";
  if(player.recordedData){
  $.ajax({
    url: url,
    method: "POST",
    data: data,
    dataType: "json",
    success: function (response) {
      if (response.success) {
        document.getElementById("video_alert").style.display = "block";
        window.location.href = "/";
      } else {
        btn.html("Error").prop("disabled", false);
      }
    },
    error: function (error) {
      console.log(error);
    },
    cache: false,
    processData: false,
    contentType: false,
  });
  }else{
  document.getElementById("video_error").style.display = "block";
  }
});
