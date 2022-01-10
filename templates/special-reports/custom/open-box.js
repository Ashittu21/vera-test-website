$(function() {
  "use strict";

  var VERA = window.VERA || {};

  VERA.sm = VERA.sm || new ScrollMagic.Controller();

  var
    CONTAINER_ID = 'open-box',
    BOX_COLOR = 0x0B0B0B,
    PLANE_SIZE = BOX_SIZE*75,
    PLANE_COLOR = 0xDCE4EA,
    HEADER_HT = 66;

  var BOX_SIZE = 25;

  var renderer, scene, camera, controls;
  var spotLight, lightHelper, shadowCameraHelper;
  var meshX, meshY, meshZ, canvas;
  var geometryZ, geometryY, geometryX;
  var boxAnimation, box_pos;

  var cameraOffset

  var threeScript = document.createElement('script'),
    orbitScript = document.createElement('script')

  threeScript.src = '/dist/js/three.min.js'
  orbitScript.src = '/dist/js/OrbitControls.js'

  document.body.appendChild(threeScript)

  threeScript.onload = function() {
    document.body.appendChild(orbitScript)
    orbitScript.onload = function() {
      loaded()
    }
  }

  function loaded() {
    init();
    render();
    scrollAnimations();
  }

  function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById(CONTAINER_ID).appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    canvas = renderer.domElement;
    canvas.id = 'open-box-canvas';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(PLANE_COLOR);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(100, 70, 55);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controls.enablePan = false;
    controls.enabled = false;

    var ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambient);

    scene.add(spotlight(new THREE.Vector3( 50, BOX_SIZE*4, 0)));
    scene.add(directional(new THREE.Vector3( 50, BOX_SIZE*8, 0)))

    box_pos = BOX_SIZE / 1.99;
    var material = new THREE.MeshBasicMaterial({ color: BOX_COLOR, side: THREE.DoubleSide });

    // left wall
    geometryZ = new THREE.PlaneBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
    meshZ = new THREE.Mesh(geometryZ, material);
    meshZ.position.set(0, 0, box_pos);

    // top wall
    geometryY = new THREE.PlaneBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
    meshY = new THREE.Mesh(geometryY, material);
    meshY.position.set(0, box_pos, 0);
    meshY.rotation.x = Math.PI/2;

    // right wall
    geometryX = new THREE.PlaneBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
    meshX = new THREE.Mesh(geometryX, material);
    meshX.position.set(box_pos, 0, 0);
    meshX.rotation.y = Math.PI/2;

    scene.add(meshX);
    scene.add(meshY);
    scene.add(meshZ);

    onResize();

    window.addEventListener('resize', onResize, false );
  }

  function boxSizes() {
    if (window.innerWidth < 700) {
      BOX_SIZE = 10
      box_pos = BOX_SIZE / 1.59;
      meshX.scale.set(0.5,0.5,1)
      meshY.scale.set(0.5,0.5,1)
      meshZ.scale.set(0.5,0.5,1)
    } else if (window.innerWidth < 1024) {
      BOX_SIZE = 15
      box_pos = BOX_SIZE / 1.59;
      meshX.scale.set(0.75,0.75,1)
      meshY.scale.set(0.75,0.75,1)
      meshZ.scale.set(0.75,0.75,1)
    } else {
      BOX_SIZE = 25
      box_pos = BOX_SIZE / 1.99;
      meshX.scale.set(1,1,1)
      meshY.scale.set(1,1,1)
      meshZ.scale.set(1,1,1)
    }

    boxAnimation = new TimelineMax()
      .to(meshX.position, 0.8, { x: BOX_SIZE * .75 })
      .to(meshY.position, 0.8, { y: BOX_SIZE * .75 }, '0')
      .to(meshZ.position, 0.8, { z: BOX_SIZE * .75 }, '0')

    meshZ.position.set(0, 0, box_pos);
    meshY.position.set(0, box_pos, 0);
    meshX.position.set(box_pos, 0, 0);
  }

  function directional(pos) {
    var
      light = new THREE.DirectionalLight( 0xffffff, .25 );
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
    var
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
    boxSizes()

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    cameraOffset = window.innerWidth/80;
    controls.target.copy( new THREE.Vector3().copy(meshX.position).add(new THREE.Vector3(0, 0, cameraOffset)) );
    controls.target.copy( new THREE.Vector3().copy(meshY.position).add(new THREE.Vector3(0, 0, cameraOffset)) );
    controls.target.copy( new THREE.Vector3().copy(meshZ.position).add(new THREE.Vector3(0, 0, cameraOffset)) );
    controls.update();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    meshX.geometry.attributes.position.needsUpdate = true;
    meshY.geometry.attributes.position.needsUpdate = true;
    meshZ.geometry.attributes.position.needsUpdate = true;
  }

  function scrollAnimations() {
    var $container = $('.black-box-content')[0]
    var $el = $('.js-wrapper')

    var headerAnimation = new TimelineMax()
      .to('#open-box', 0.6, { autoAlpha: 1 })
      .to($el, 0.6, { autoAlpha: 1, y: 0, webkitFilter: 'blur(0px)', filter:'blur(0px)' }, '-=0.6')

    var scrollScene = new ScrollMagic.Scene({
      triggerElement: '.black-box-content',
      triggerHook: 0,
      duration: '100%',
      reverse: true,
    })
    // .addIndicators()
    .setPin($container, { pushFollowers: true })
    .setTween(boxAnimation)
    .addTo(VERA.sm);

    var copyScroll = new ScrollMagic.Scene({
      triggerElement: '.black-box-content',
      triggerHook: 0
    })
    // .addIndicators()
    .setTween(headerAnimation)
    .addTo(VERA.sm);
  }

  window.VERA = VERA;

});
