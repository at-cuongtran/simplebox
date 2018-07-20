(function ($) {
  "use strict"
  
  /**
   * Oops!! No JQuery, I'm out.
   */
  if (!$) {
    return;
  }
  
  /**
   * simplebox is already initialized.
   */
  if ($.fn.simplebox) {
    return;
  }

  /**
   * Defaults options
   */
  var defaults = {
    modalClass: '',
    fadeDuration: 200,
    slideShow: false
  }

  /**
   * initilize dom structure
   * @param {object} options 
   */
  function initialize(options) {
    var $modal = $('<div class="simplebox-modal ' + options.modalClass + '" style="display: none;"></div>');
    var $modalContent = $('<div class="simplebox-content"></div>');
    var $modalTaget = $('<img class="simplebox-img" src="" alt="">');
    $modalTaget.appendTo($modalContent);
    $modalContent.appendTo($modal);
    $modal.appendTo('body');
    
    $modal.click(function(e) {
      $modal.fadeOut(options.fadeDuration);
    });
    
    $modalContent.click(function(e) {
      e.stopPropagation();
    });
    $.simplebox = {};
    $.simplebox.$modal = $modal;
    $.simplebox.$modalTaget = $modalTaget;
  }

  /**
   * open simplebox modal
   * @param {Event} e 
   * @param {Object} options 
   */
  function open(e, options) {

    /**
     * This item is already opened by another handler
     */
    if (e && e.isDefaultPrevented()) {
      return;
    }
    e.preventDefault();

    var $target = $(e.currentTarget);
    $.simplebox.$modalTaget.attr('src', $target.attr('src') || $target.attr('href'));
    $.simplebox.$modal.fadeIn({
      duration: options.fadeDuration,
      complete: function() {
        $.simplebox.$modal.removeAttr('style');
        options.complete && options.complete();
      } 
    });
  }
  
  $.fn.simplebox = function(options) {
    var settings = $.extend(defaults, options);
    if (!$.simplebox) {
      initialize(settings);
    }
    this.off('click');
    return this.click(function(e) {
      open(e, settings);
    });
  }
  
  $(document).on('click', '[data-simplebox]', function(e) {
    open(e, defaults);
  });

  $(function() {
    if (!$.simplebox) {
      if ($('[data-simplebox]').length) {
        initialize(defaults);
      }
    }
  })
  
}(jQuery));
