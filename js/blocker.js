function $id (id) {
  return document.getElementById(id);
}

function AdBlockChecker () {
  this.AdsRemoved = false;
  this.id = "adBlockEnabled";
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
  removeiFrame: function () {
    var n = $id(this.id), $this = this;
    n.onload = function () {
      if ($id($this.id).style.display == "none") {
        $this.AdsRemoved = true;
      } else {
        document.body.removeChild($id($this.id));
      }
      delete $this.id;
    };
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
    this.checkScripts().createiFrame().removeiFrame();
  }
};
