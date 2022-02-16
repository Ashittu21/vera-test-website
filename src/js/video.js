var $body;

window.addEventListener("load", function () {
  videoOnLoad();
});

function videoOnLoad() {
  var
    ytSrc = "https://www.youtube.com/iframe_api",
    vimSrc = "https://player.vimeo.com/api/player.js"

  $body = $('body')
  loadScript(ytSrc);
  loadScript(vimSrc);
}

function loadScript(src, callback) {
  callback = typeof callback === "function" ? callback : function () {
    return null
  };
  var tag = document.createElement('script');
  tag.src = src;
  tag.onload = function () {
    callback();
  }
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

if (document.querySelector('.videoBlock-video .video-player-v2.vimeo')) { 

  document.querySelectorAll('.videoBlock-video .video-player-v2.vimeo:not(.video-initialized)').forEach(item => {
    item.addEventListener('click', e => {
      var target = e.target;
      var videoId = target.parentNode.parentNode.dataset.videoid;
      target.parentNode.parentNode.classList.add('videoStart');
      
      var iframeDiv = document.querySelector('#iframe__' + videoId);
      const options = {
        id: videoId,
        width: 840,
        responsive: true
      };
  
      const player = new Vimeo.Player(iframeDiv, options);
      player.setVolume(0.5);
      player.play();
    })
  })

}


if (document.querySelector('.videoBlock-video .video-player-v2.youtube')) { 


  document.querySelectorAll('.videoBlock-video .video-player-v2.youtube:not(.video-initialized)').forEach(item => {
    item.addEventListener('click', e => {
      var targetYT = e.target;
      var videoId = targetYT.parentNode.parentNode.dataset.videoid;
      targetYT.parentNode.parentNode.classList.add('videoStart');
      var iframeDiv = document.querySelector('#iframe__' + videoId);
      var player;
      player = new YT.Player(iframeDiv, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          info: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          wmode: "transparent"
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
  
      function onPlayerReady(event) {
        event.target.playVideo();
      }
  
      var done = false;
  
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
  
      function stopVideo() {
        player.stopVideo();
      }
  
    })
  });


/*
  document.querySelector('.videoBlock-video .video-player-v2.youtube:not(.video-initialized)').addEventListener('click', function (e) { 
  
    var targetYT = e.target;
    var videoId = targetYT.parentNode.parentNode.dataset.videoid;
    targetYT.parentNode.parentNode.classList.add('videoStart');
    var iframeDiv = document.querySelector('#iframe__' + videoId);
    var player;
    player = new YT.Player(iframeDiv, {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        info: 0,
        showinfo: 0,
        rel: 0,
        modestbranding: 1,
        wmode: "transparent"
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  var done = false;

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }

  function stopVideo() {
    player.stopVideo();
  }

});*/

}