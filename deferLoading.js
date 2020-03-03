var deferLoading = {
  imgClass: 'defer-image-js',
  srcSelector: 'data-src',
  init: function (parentId) {
    if (window.pageYOffset > 4) {
      deferLoading.show();
      return;
    }
    if (parentId) {
      if (Array.isArray(parentId)) {
        parentId.forEach(function (el) {
          deferLoading.handleParent(el);
        });
      } else if (typeof parentId == 'string') {
        deferLoading.handleParent(parentId);
      }
    }
    setTimeout(function () {
      window.addEventListener('scroll', deferLoading.show, true);
      window.addEventListener('resize', deferLoading.show, true);
    }, 200);
  },
  handleParent: function (parentId) {
    var parent = document.getElementById(parentId);
    if (!parent) {
      return;
    }
    var children = Array.from(parent.children);
    if (!children) {
      return;
    }
    var offsetTop = parent.getBoundingClientRect().top;
    var rows = Math.round(parent.offsetWidth / children[0].offsetWidth);
    var columns = Math.round((window.innerHeight - offsetTop) / children[0].offsetHeight);
    var sImg = Array.from(document.querySelectorAll('#' + parentId + ' .' + deferLoading.imgClass + '[' + deferLoading.srcSelector + ']'));
    if (sImg) {
      for (var i = 0; i < (rows * columns); i++) {
        deferLoading.handle(sImg[i]);
      }
    }
  },
  show: function (event) {
    var sImg = Array.from(document.getElementsByClassName(deferLoading.imgClass));
    sImg.forEach(function (el) {
      deferLoading.handle(el);
    });
    window.removeEventListener('scroll', deferLoading.show, true);
    window.removeEventListener('resize', deferLoading.show, true);
  },
  handle: function (el) {
    if (!el) {
      return;
    }
    if (el.src) {
      el.src = el.getAttribute(deferLoading.srcSelector);
    } else {
      el.style.backgroundImage = 'url(' + el.getAttribute(deferLoading.srcSelector) + ')';
    }
  }
};
