$(function () {
  $(".VideoCta").each(initVideoCta);

  function initVideoCta(elem) {
    const $this = $(this);
    const modal = $this.find(".VideoCta-modal");

    $this.find("button").on("click", open);
    $this.find(".VideoCta-close").on("click", close);

    function open() {
      modal.addClass("modal--open");
    }
    function close() {
      modal.removeClass("modal--open");
    }
  }
});
