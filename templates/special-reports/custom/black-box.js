//FPS meter
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()

$(function() {
  "use strict";

  var VERA = window.VERA || {};

  VERA.sm = VERA.sm || new ScrollMagic.Controller();

  const
    CONTAINER_ID = 'black-box',
    BOX_SIZE = 25,
    BOX_COLOR = 0x3E454C,
    PLANE_SIZE = BOX_SIZE*75,
    PLANE_COLOR = 0x2B313F

  var renderer, scene, camera, controls;
  var spotLight, lightHelper, shadowCameraHelper, light;
  var mesh, canvas;

  let cameraOffset

  init();
  render();
  introCopy();
  introScene();
  lightingScroll();

  function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById(CONTAINER_ID).appendChild( renderer.domElement );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    canvas = renderer.domElement;
    canvas.id = 'black-box-canvas';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(PLANE_COLOR);

    camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 100, 60, 40 );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 20;
    controls.maxDistance = 500;
    controls.enablePan = false;
    controls.enabled = false;


    const ambient = new THREE.AmbientLight( 0x00000, 0.25 );
    // scene.add( ambient );

    scene.add( spotlight(new THREE.Vector3( 50, BOX_SIZE*4, 0 )) );
    scene.add( directional(new THREE.Vector3( 50, BOX_SIZE*8, 0 )) )

    // lightHelper = new THREE.SpotLightHelper( spotLight );
    // scene.add( lightHelper );
    // shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    // scene.add( shadowCameraHelper );
    // scene.add( new THREE.AxesHelper( 10 ) );

    var material = new THREE.MeshPhongMaterial({
      color: PLANE_COLOR,
      dithering: true,
      //side: THREE.BackSide
    } );
    var geometry = new THREE.PlaneBufferGeometry( PLANE_SIZE, PLANE_SIZE );
    var planemesh = new THREE.Mesh( geometry, material );
    planemesh.position.set( 0, -1, 0 );
    planemesh.rotation.x = - Math.PI * 0.5;
    planemesh.receiveShadow = true;
    scene.add( planemesh );

    // var geometry = new THREE.SphereBufferGeometry( PLANE_SIZE, 32, 32 );
    // //var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    // var sphere = new THREE.Mesh( geometry, material );
    // sphere.receiveShadow = true;
    // scene.add( sphere );

    var material = new THREE.MeshPhongMaterial( { color: BOX_COLOR, dithering: true } );
    var geometry = new THREE.BoxBufferGeometry( BOX_SIZE, BOX_SIZE, BOX_SIZE );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, BOX_SIZE, 0 );
    mesh.castShadow = true;

    scene.add( mesh );
    onResize();

    window.addEventListener( 'resize', onResize, false );
  }

  function directional(pos) {
    light = new THREE.DirectionalLight( 0x070707, .15 );
    light.position.set( 50, BOX_SIZE*8, 0  );
    light.angle = Math.PI / 20;
    light.penumbra = 0.5;
    light.decay = 2;
    light.distance = 0;
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 200;
    // light.shadow.camera.zoom = 4;
    return light;
  }

  function spotlight(pos) {
    const
      spotLight = new THREE.SpotLight( 0xffffff, 0.25 );
      spotLight.position.set( 50, BOX_SIZE*8, 0  );
      spotLight.angle = Math.PI / 20;
      spotLight.penumbra = 0.5;
      spotLight.decay = 2;
      spotLight.distance = 0;
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      spotLight.shadow.camera.near = 10;
      spotLight.shadow.camera.far = 500;
    return spotLight;
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    cameraOffset = window.innerWidth/80;
    controls.target.copy( new THREE.Vector3().copy(mesh.position).add(new THREE.Vector3(0, 0, cameraOffset)) );
    controls.update();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function render() {
    requestAnimationFrame(render);
    //lightHelper.update();
    //shadowCameraHelper.update();
    mesh.rotation.x += .001
    mesh.rotation.y += .001
    mesh.rotation.z += .001
    renderer.render( scene, camera );
  }

  function lightingScroll() {
    var $box = $('.black-box-content');
    var height = $box.height()

    var lightingScene = new ScrollMagic.Scene({
      triggerElement: $box[0],
      triggerHook: 0,
      duration: height*1.5
    })
    // .addIndicators()
    .on('progress', function(e){
      var progress = 1 - e.progress;
      light.intensity = -(progress - 1)
    })
    .addTo(VERA.sm);
  }

  function introCopy() {
    var container = $('.black-box-header-wrapper')[0]

    var animation = new TimelineMax()
      .to(container, 0.6, { autoAlpha: 1, y: 0, webkitFilter: 'blur(0px)', filter:'blur(0px)' })

    var scrollScene = new ScrollMagic.Scene({
      triggerElement: container,
      triggerHook: 0,
      duration: '100%'
    })
    // .addIndicators()
    .setTween(animation)
    .setPin(container)
    .addTo(VERA.sm);
  }

  function introScene() {
    const
      $box = $('.black-box-content'),
      getDuration = function() {
        return $box.outerHeight(true) - window.innerHeight + $('#Header').outerHeight()
      }

    const scene = new ScrollMagic.Scene({
      triggerElement: $box[0],
      triggerHook: 0,
      duration: getDuration()
    })
    .setPin('#black-box')
    .addTo(VERA.sm)

    window.addEventListener("resize", function() {
      scene.duration(getDuration())
    })
  }

  window.VERA = VERA;

});
