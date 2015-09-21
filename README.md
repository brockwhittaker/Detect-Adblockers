# Detect-Adblockers
This is a script to detect if users are using adblockers and allow you to make decisions based on that.

##Identification
Most ad blockers will block any script with the name `ads.js`. There is a variable inside that sets to true if the browser can read it. If not, the `blocker.js` file checks if `undefined`. If it is, then it shows that the user likely is using an ad blocker.

This also tries to add an iframe to an ad-site with an empty query. If the `display` is set to `none` it flags the user as using an ad blocker.

##Adding Scripts
Add your scripts by attaching both like such.

```HTML
  <script src="js/ads.js" charset="utf-8"></script>
  <script src="js/blocker.js" charset="utf-8"></script>
```

##Running AdBlockChecker
First you need to initialize the checker object as such:

```javascript
var ads = new AdBlockChecker();
```

Next initialize the `run` function:

```javascript
ads.run();
```

From here it runs and comes up with a conclusion as an object property `AdsRemoved` with a value of `true` if an ads have been blocked or `false` if not.

To use callback functions for when it is done checking, use the two below:

```javascript
ads.ifAdsDisabled(function () {
  // ads are disabled
});
ads.ifAdsEnabled(function () {
  // ads are enabled
});
```

And that's it.

##Demo

To see how this all pieces together, go to http://www.lavancier.com/adblock/
