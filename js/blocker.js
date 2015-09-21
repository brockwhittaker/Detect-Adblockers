function $id (id) {
  return document.getElementById(id);
}

function AdBlockChecker () {
  this.AdsRemoved = false;
  this.id = "adBlockEnabled";
  this.id_2 = "contentBlockEnabled";
  return this;
}

AdBlockChecker.prototype = {
  checkScripts: function () {
    if (typeof adsEnabled === "undefined") {
      this.AdsRemoved = true;
    }
    return this;
  },
  createiFrame: function () {
    var n = document.createElement('iframe');
    n.src = "http://ad.mo.doubleclick.net/dartproxy/dfa.click.handler?";
    n.id = this.id;
    n.style.visibility = "hidden";
    n.style.height = "0px";
    n.style.width = "0px";
    document.body.appendChild(n);
    return this;
  },
  removeElem: function (id) {
    var n = $id(id), $this = this;
    if (typeof n == "undefined") {
      n.onload = function () {
        if (n.style.display == "none")
          $this.AdsRemoved = true;
        document.body.removeChild(n);
      };
    } else {
      if (n.style.display == "none" || n.style.visibility == "hidden")
        $this.AdsRemoved = true;
      document.body.removeChild(n);
    }
    return this;
  },
  testContentBlocker: function () {
    var n = document.createElement('a');
    n.src = "https://engine.adzerk.net/r?e=example";
    n.href = "https://engine.adzerk.net/r?e=example";
    n.style.visibility = "hidden";
    n.id = this.id_2;
    document.body.appendChild(n);
    return this;
  },
  ifAdsDisabled: function (func) {
    if (this.AdsRemoved === true)
      func();
  },
  ifAdsEnabled: function (func) {
    if (this.AdsRemoved === false)
      func();
  },
  run: function () {
    this.checkScripts().createiFrame().removeElem(this.id).testContentBlocker().removeElem(this.id_2);
  }
};
