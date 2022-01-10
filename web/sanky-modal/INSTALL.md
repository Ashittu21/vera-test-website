### Installation Instructions

Three easy steps:

1. Download and extract the `sanky-modal` directory.
2. Place the `sanky-modal` directory in the root folder.
3. On any page that you would like the modal to display, add the following script to the bottom of the page, after all others.
    <script type="text/javascript"> var sn_modal_ts = new Date; document.write('<script src="/sanky-modal/js/main.js?' + sn_modal_ts.getTime() + '"><\/script>'); </script>
4. To test the modal outside of it's deployment date append the following to the url `#sn-modal-force`
