(function (_, Kotlin) {
  'use strict';
  var toString = Kotlin.toString;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  function main$lambda(closure$database) {
    return function (req, res) {
      var key = closure$database.ref('songs').push().key;
      res.status(200).send('hello ' + toString(key));
      return Unit;
    };
  }
  function main$lambda_0(snapshot, context) {
    var tmp$, tmp$_0;
    var original = snapshot.val();
    console.log('Uppercasing', context.params.keys, original);
    var toUpperCase = original.toUpperCase();
    (tmp$_0 = (tmp$ = snapshot.ref.parent) != null ? tmp$.child('upppercase') : null) != null ? tmp$_0.set(toUpperCase) : null;
    return Unit;
  }
  function main$lambda_1(change, context) {
    console.log('onUpdate');
    return Unit;
  }
  function main$lambda_2(change, context) {
    console.log('onWrite');
    return Unit;
  }
  function main$lambda_3(change, context) {
    console.log('on delete');
    return Unit;
  }
  function main(args) {
    var firebaseApp = new FirebassAppExample();
    var admin = firebaseApp.admin;
    var config = firebaseApp.config;
    admin.initializeApp(config.firebase);
    var database = firebaseApp.database;
    var express = new ExpressExample(require('express'));
    var api = express.api;
    api.get('', main$lambda(database));
    exports.helloWorld = firebaseApp.https.onRequest(api);
    exports.song = firebaseApp.https.onRequest((new SongServiceExample(firebaseApp)).getApi());
    exports.songCreateObserve = firebaseApp.functionsDatabase.ref('/songs/{keys}/title').onCreate(main$lambda_0);
    exports.songUpdateObserve = firebaseApp.functionsDatabase.ref('/songs/{keys}/').onUpdate(main$lambda_1);
    exports.songWriteObserve = firebaseApp.functionsDatabase.ref('/songs/{keys}/').onWrite(main$lambda_2);
    exports.songSeleteObserve = firebaseApp.functionsDatabase.ref('/songs/{keys}/').onWrite(main$lambda_3);
  }
  function SongServiceExample(firebaseApp) {
    this.api_0 = (new ExpressExample(require('express'))).api;
    this.database = firebaseApp.database;
  }
  SongServiceExample.prototype.getApi = function () {
    this.api_0.get('/:id/details/', this.getSong_0());
    this.api_0.get('/list/', this.getSongs_0());
    this.api_0.put('/create/', this.createSong_0());
    this.api_0.post('/:id/update/', this.updateSong_0());
    this.api_0.delete('/:id/delete/', this.deleteSong_0());
    return this.api_0;
  };
  function SongServiceExample$createSong$lambda$lambda(closure$res, closure$song) {
    return function (it) {
      closure$res.status(200).send(closure$song.title + ' by ' + closure$song.artist + ' has been created');
      return Unit;
    };
  }
  function SongServiceExample$createSong$lambda$lambda_0(closure$res) {
    return function (it) {
      var tmp$;
      closure$res.status(500).send((tmp$ = it.message) != null ? tmp$ : '');
      return Unit;
    };
  }
  function SongServiceExample$createSong$lambda(this$SongServiceExample) {
    return function (req, res) {
      var tmp$;
      var key = (tmp$ = this$SongServiceExample.database.ref('songs').push().key) != null ? tmp$ : '';
      var song = asModel(req.body);
      song.key = key;
      this$SongServiceExample.database.ref('songs/' + key).set(song).then(SongServiceExample$createSong$lambda$lambda(res, song)).catch(SongServiceExample$createSong$lambda$lambda_0(res));
      return Unit;
    };
  }
  SongServiceExample.prototype.createSong_0 = function () {
    return SongServiceExample$createSong$lambda(this);
  };
  function SongServiceExample$getSong$lambda$lambda(closure$res, closure$id) {
    return function (it) {
      if (!it.exists()) {
        closure$res.status(404).send('Song id: ' + toString(closure$id) + ' not found');
        return;
      }
      var song = it.val();
      closure$res.status(200).send(song);
      return Unit;
    };
  }
  function SongServiceExample$getSong$lambda$lambda_0(closure$res) {
    return function (it) {
      var tmp$;
      closure$res.status(500).send((tmp$ = it.message) != null ? tmp$ : '');
      return Unit;
    };
  }
  function SongServiceExample$getSong$lambda(this$SongServiceExample) {
    return function (req, res) {
      var id = req.param('id');
      this$SongServiceExample.database.ref('songs/' + toString(id)).once('value').then(SongServiceExample$getSong$lambda$lambda(res, id)).catch(SongServiceExample$getSong$lambda$lambda_0(res));
      return Unit;
    };
  }
  SongServiceExample.prototype.getSong_0 = function () {
    return SongServiceExample$getSong$lambda(this);
  };
  function SongServiceExample$getSongs$lambda$lambda(closure$res) {
    return function (it) {
      var songs = Object.values(it.val());
      closure$res.status(200).send(songs);
      return Unit;
    };
  }
  function SongServiceExample$getSongs$lambda$lambda_0(closure$res) {
    return function (it) {
      var tmp$;
      closure$res.status(500).send((tmp$ = it.message) != null ? tmp$ : '');
      return Unit;
    };
  }
  function SongServiceExample$getSongs$lambda(this$SongServiceExample) {
    return function (f, res) {
      this$SongServiceExample.database.ref('songs').once('value').then(SongServiceExample$getSongs$lambda$lambda(res)).catch(SongServiceExample$getSongs$lambda$lambda_0(res));
      return Unit;
    };
  }
  SongServiceExample.prototype.getSongs_0 = function () {
    return SongServiceExample$getSongs$lambda(this);
  };
  function SongServiceExample$updateSong$lambda$lambda(closure$res, closure$id) {
    return function (it) {
      closure$res.status(200).send('Song id: ' + toString(closure$id) + ' has been updated');
      return Unit;
    };
  }
  function SongServiceExample$updateSong$lambda$lambda_0(closure$res) {
    return function (it) {
      var tmp$;
      closure$res.status(500).send((tmp$ = it.message) != null ? tmp$ : '');
      return Unit;
    };
  }
  function SongServiceExample$updateSong$lambda(this$SongServiceExample) {
    return function (req, res) {
      var id = req.param('id');
      var song = asModel(req.body);
      this$SongServiceExample.database.ref('songs/' + toString(id)).update(song).then(SongServiceExample$updateSong$lambda$lambda(res, id)).catch(SongServiceExample$updateSong$lambda$lambda_0(res));
      return Unit;
    };
  }
  SongServiceExample.prototype.updateSong_0 = function () {
    return SongServiceExample$updateSong$lambda(this);
  };
  function SongServiceExample$deleteSong$lambda$lambda(closure$res, closure$id) {
    return function (it) {
      closure$res.status(200).send('Song id: ' + toString(closure$id) + ' has been deleted');
      return Unit;
    };
  }
  function SongServiceExample$deleteSong$lambda$lambda_0(closure$res) {
    return function (it) {
      var tmp$;
      closure$res.status(500).send((tmp$ = it.message) != null ? tmp$ : '');
      return Unit;
    };
  }
  function SongServiceExample$deleteSong$lambda(this$SongServiceExample) {
    return function (req, res) {
      var id = req.param('id');
      this$SongServiceExample.database.ref('songs/' + toString(id)).remove().then(SongServiceExample$deleteSong$lambda$lambda(res, id)).catch(SongServiceExample$deleteSong$lambda$lambda_0(res));
      return Unit;
    };
  }
  SongServiceExample.prototype.deleteSong_0 = function () {
    return SongServiceExample$deleteSong$lambda(this);
  };
  SongServiceExample.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SongServiceExample',
    interfaces: []
  };
  function ExpressExample(express) {
    this.express_deks74$_0 = express;
  }
  Object.defineProperty(ExpressExample.prototype, 'express', {
    get: function () {
      return this.express_deks74$_0;
    }
  });
  Object.defineProperty(ExpressExample.prototype, 'api', {
    get: function () {
      return this.express();
    }
  });
  ExpressExample.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ExpressExample',
    interfaces: []
  };
  function asModel($receiver) {
    return JSON.parse(JSON.stringify($receiver));
  }
  function FirebassAppExample() {
    this.admin_a2tnkc$_0 = require('firebase-admin');
    this.functions_gq6jhk$_0 = require('firebase-functions');
    this.config_69p57z$_0 = this.functions.config();
    this.https_6ikz3c$_0 = this.functions.https;
    this.functionsDatabase_yop14d$_0 = this.functions.database;
  }
  Object.defineProperty(FirebassAppExample.prototype, 'admin', {
    get: function () {
      return this.admin_a2tnkc$_0;
    }
  });
  Object.defineProperty(FirebassAppExample.prototype, 'functions', {
    get: function () {
      return this.functions_gq6jhk$_0;
    }
  });
  Object.defineProperty(FirebassAppExample.prototype, 'config', {
    get: function () {
      return this.config_69p57z$_0;
    }
  });
  Object.defineProperty(FirebassAppExample.prototype, 'https', {
    get: function () {
      return this.https_6ikz3c$_0;
    }
  });
  Object.defineProperty(FirebassAppExample.prototype, 'database', {
    get: function () {
      return this.admin.database();
    }
  });
  Object.defineProperty(FirebassAppExample.prototype, 'functionsDatabase', {
    get: function () {
      return this.functionsDatabase_yop14d$_0;
    }
  });
  FirebassAppExample.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FirebassAppExample',
    interfaces: []
  };
  function GeoPoint(admin) {
    this.admin = admin;
  }
  GeoPoint.prototype.build_dleff0$ = function (latitude, longitude) {
    var admin = this.admin;
    return new firebase.admin.firestore.GeoPoint(latitude, longitude);
  };
  GeoPoint.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GeoPoint',
    interfaces: []
  };
  function SongExample(key, title, artist, album, duration) {
    this.key = key;
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.duration = duration;
  }
  SongExample.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SongExample',
    interfaces: []
  };
  _.main_kand9s$ = main;
  _.SongServiceExample = SongServiceExample;
  var package$express = _.express || (_.express = {});
  package$express.ExpressExample = ExpressExample;
  var package$extention = _.extention || (_.extention = {});
  package$extention.asModel_th5c7u$ = asModel;
  var package$firebase = _.firebase || (_.firebase = {});
  package$firebase.FirebassAppExample = FirebassAppExample;
  var package$admin = package$firebase.admin || (package$firebase.admin = {});
  var package$firestore = package$admin.firestore || (package$admin.firestore = {});
  package$firestore.GeoPoint = GeoPoint;
  var package$model = _.model || (_.model = {});
  package$model.SongExample = SongExample;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
