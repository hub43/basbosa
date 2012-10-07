if (typeof ObjectId == 'undefined') {
	var ObjectId = function (id) {
		return id;
	};
}

/** Groups records */
var groups = {};
groups.klamwasora = {
 "_id": ObjectId("4f7ec7edc16714d0180ddbb5"),
 "name": "klamwasora",
 "online": 0,
 "photo_base": "http: \/\/c.klamwasoramail.com\/files\/photos_thumb\/",
 "defaults" : {
		locale: "ar",
		theme:	"html"
 },
 "db": {
   "driver": "mysql",
   "host": "localhost",
   "port": "3306",
   "name": "klamwasora_main",
   "username": "root",
   "password": "",
   "table": "User",
   "username_field": "username",
   "password_field": "password",
   "password_hash": "md5"
},
 "server": {
   "address": "localhost",
   "port": "3000"
},
 "sectors": {
   "0": {
     "_id": ObjectId("4f7ec7edc16714d0180ddbb2"),
     "name": "مصر",
     "description" : "http: \/\/klamwasora.com قومووووو بالتسجيل الأن لتتمتع بخدمات الشات كامله",
  },
   "1": {
     "_id": ObjectId("4f7ec7edc16714d0180ddbb3"),
     "name": "السعودية و الخليج العربي",
     "description": "http: \/\/klamwasora.com قومووووو بالتسجيل الأن لتتمتع بخدمات الشات كامله",
  },
   "2": {
     "_id": ObjectId("4f7ec7edc16714d0180ddbb4"),
     "name": "المغرب العربي",
     "description": "http: \/\/klamwasora.com قومووووو بالتسجيل الأن لتتمتع بخدمات الشات كامله",
  }
},
"apps": [
	{
		"_id": ObjectId(),
		"name": "Radio App",
		"url": "http://tunein.com/radio/Nogoum-FM-1006-s65628/",
		"embedding": "standalone"
	}, {
		"_id": ObjectId(),
		"name": "Connect 4",
		"url": "http://www.mathsisfun.com/games/connect4.html",
		"embedding": "splitscreen"
	}, {
		"_id": ObjectId(),
		"name": "3D Tic-Tac-Toe",
		"url": "http://www.mathsisfun.com/games/images/FourSight.swf",
		"embedding": "splitscreen,standalone"
		}
  ]
};
groups.menfe = {
		"_id": ObjectId("4fb212dd6c379e2810000000"),
	  "defaults": {
	    "locale": "ar",
	    "theme": "default"
	  },
	  "name": "menfe",
	  "sectors": {
	    "0": {
	      "_id": ObjectId("4fb220ed41c2d6de657a1583"),
	      "name": "Menfe Sector 0",
	      "description" : "Menfe Sector 0"
	      
	   },
	  }
};
groups.apps = {
		"_id": ObjectId("4fb212dd6c379e2810000001"),
	  "defaults": {
	    "locale": "ar",
	    "theme": "default"
	  },
	  "name": "apps",
};

/** groups records **/

if (typeof module === 'undefined'){
	/** groups indexes **/
	db.getCollection("groups").ensureIndex({"_id": 1});
	db.getCollection("groups").save(groups.klamwasora);
	db.getCollection("groups").save(groups.menfe);
} else {
	module.exports = groups;
}
