(function ($) {
  var cookie = readCookie('language');

  if (cookie !== null && cookie != '/') {
    var currentLocation = window.location.href,
      alreadyOnPage = currentLocation.indexOf(cookie) >= 0;

    if (alreadyOnPage === false) {
      window.location.href = cookie;
    }

    // window.location.href = cookie;
  }

  var clickToActivate;

  // COOKIES!

  function createCookie(name, value, days, href) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';

    // window.location.href = href;
  }

  function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, '', -1);
  }

  function setCookie() {
    return $('.lang-link').on('click', function (e) {
      var $this = $(this),
        cookieValue = $this.attr('href');

      // e.preventDefault();

      createCookie('language', cookieValue, 360, $this.attr('href'));
    });
  }

  toggleMobileMenu = function () {
    $('.mobile-nav-toggle').on('click', function () {
      var $this = $(this);
      $this.toggleClass('is-active');
      $('.mobile-nav').toggleClass('is-active');
      $('.news-box.is-active').removeClass('is-active');
      $('.toggle-news.is-active').removeClass('is-active');
    });
  };

  toggleMobileNews = function () {
    $('.toggle-news').on('click', function () {
      var $this = $(this);
      $this.toggleClass('is-active');
      $('.news-box').toggleClass('is-active');
    });
  };

  showLogoOnScroll = function () {
    var wScroll = $(window).scrollTop();
    var wantedTop = $('#start').height() / 2 + 100;
    if (wScroll >= wantedTop) {
      $('.logo').removeClass('logo--invisible');
    } else if (wScroll <= wantedTop - 100) {
      $('.logo').addClass('logo--invisible');
    }
  };

  makeLinksActive = function () {
    // var wScroll = $(window).scrollTop();
    var scrollPos = $(window).scrollTop();
    $('.link-list li a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr('href'));
      if (
        refElement &&
        refElement.position() &&
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.outerHeight() - 10 > scrollPos &&
        clickToActivate !== true
      ) {
        // console.log(clickToActivate);
        $('.link-list li a').removeClass('link--active');
        currLink.addClass('link--active');
        // console.log('ohla');
      } else if (clickToActivate !== true) {
        currLink.removeClass('link--active');
      }
    });
  };

  showFullNews = function (obj) {
    var $this = $(obj);
    $this.siblings().removeClass('news--active');
    $this.toggleClass('news--active');
    // console.log();
  };

  activateProject = function (obj) {
    var $this = $(obj);
    if ($this.hasClass('project--active')) {
      $this.siblings().removeClass('project--inactive');
    } else {
      $this
        .siblings()
        .removeClass('project--active')
        .addClass('project--inactive');
    }
    $this.toggleClass('project--active').removeClass('project--inactive');
    // }
    // console.log();
  };

  // scrollBackground = function() {
  //   var wScroll = $(window).scrollTop(),
  //       bgElementParticipate = $('.col--partners'),
  //       bgElementDonate = $('.col--donate'),
  //       bgTop = $('section.partners .col-1').offset().top;
  //
  //   bgElementParticipate.css({'background-position': (wScroll / 6) + 'px, '+ (wScroll + bgTop) / 5 +'px'});
  //
  //   bgElementDonate.css({'background-position': '-'+ (wScroll / 6) + 'px, '+ (wScroll + bgTop) / 5 +'px'});

  // launchingElements(wScroll);

  // };

  function showArchive() {
    $('#archive').show();
  }
  function hideArchive() {
    $('#archive').hide();
  }

  $.mark = {
    jump: function (options) {
      var defaults = {
        selector: 'a.scroll-on-page-link'
      };
      if (typeof options == 'string') {
        defaults.selector = options;
      }

      options = $.extend(defaults, options);
      return $(options.selector).click(function (e) {
        var jumpobj = $(this);
        var target = jumpobj.attr('href');
        var thespeed = 1000;
        var offset = $(target).offset().top;
        $('.link--active').removeClass('link--active');
        jumpobj.addClass('link--active');
        clickToActivate = true;

        $('html,body').animate(
          {
            scrollTop: offset
          },
          thespeed,
          'swing',
          function () {
            setTimeout(function () {
              clickToActivate = false;
            }, 100);
          }
        );
        // e.preventDefault();
      });
    }
  };

  $(window).scroll(function () {
    showLogoOnScroll();
    makeLinksActive();
    // scrollBackground();
  });

  $(document).ready(function () {
    $.mark.jump();
    toggleMobileMenu();
    toggleMobileNews();
    setCookie();

    $('.about-cta').click(function () {
      $('.block--about').toggleClass('is-open');
      $('.about-cta').toggleClass('hidden');
    });

    $('.phenomenon-cta').click(function () {
      $('.block--phenomenon').toggleClass('is-open');
      $('.phenomenon-cta').toggleClass('hidden');
    });
  });
})(jQuery);
