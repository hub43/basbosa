/** groups indexes **/
db.getCollection("groups").ensureIndex({
  "_id": 1
},[
  
]);

/** translations indexes **/
db.getCollection("translations").ensureIndex({
  "_id": 1
},[
  
]);

/** translations indexes **/
db.getCollection("translations").ensureIndex({
  "original": 1,
  "locale": 1,
  "translation": 1
},{
  "unique": true
});

/** users indexes **/
db.getCollection("users").ensureIndex({
  "_id": 1
},[
  
]);

/** groups records **/
db.getCollection("groups").insert({
  "_id": ObjectId("4f7ec7edc16714d0180ddbb5"),
  "name": "klamwasora",
  "online": 0,
  "photo_base": "http: \/\/c.klamwasoramail.com\/files\/photos_thumb\/",
  "defaults": {
    "locale": "ar",
    "theme": "html"
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
  "sectors": [
    {
      "_id": ObjectId("4f7ec7edc16714d0180ddbb2"),
      "name": "مصر",
      "description": "http: \/\/klamwasora.com قومووووو بالتسجيل الأن لتتمتع بخدمات الشات كامله"
    },
    {
      "_id": ObjectId("4f7ec7edc16714d0180ddbb3"),
      "name": "السعودية و الخليج العربي",
      "description": "http: \/\/klamwasora.com قومووووو بالتسجيل الأن لتتمتع بخدمات الشات كامله"
    },
    {
      "_id": ObjectId("4f7ec7edc16714d0180ddbb4"),
      "name": "المغرب العربي",
      "description": "http: \/\/klamwasora.com قومووووو بالتسجيل الأن لتتمتع بخدمات الشات كامله"
    }
  ],
  "apps": [
    {
      "_id": ObjectId("4fbf5f740f7a3f842b8f7d02"),
      "name": "Radio App",
      "url": "http:\/\/tunein.com\/radio\/Nogoum-FM-1006-s65628\/",
      "embedding": "standalone"
    },
    {
      "_id": ObjectId("4fbf5f740f7a3f842b8f7d03"),
      "name": "Connect 4",
      "url": "http:\/\/www.mathsisfun.com\/games\/connect4.html",
      "embedding": "splitscreen"
    },
    {
      "_id": ObjectId("4fbf5f740f7a3f842b8f7d04"),
      "name": "3D Tic-Tac-Toe",
      "url": "http:\/\/www.mathsisfun.com\/games\/images\/FourSight.swf",
      "embedding": "splitscreen,standalone"
    }
  ]
});
db.getCollection("groups").insert({
  "_id": ObjectId("4fb212dd6c379e2810000000"),
  "defaults": {
    "locale": "ar",
    "theme": "default"
  },
  "name": "menfe",
  "sectors": [
    {
      "_id": ObjectId("4fb220ed41c2d6de657a1583"),
      "name": "Menfe Sector 0",
      "description": "Menfe Sector 0"
    }
  ]
});

/** system.indexes records **/
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "jgroups.groups",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "jgroups.users",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "_id": 1
  },
  "ns": "jgroups.translations",
  "name": "_id_"
});
db.getCollection("system.indexes").insert({
  "v": 1,
  "key": {
    "original": 1,
    "locale": 1,
    "translation": 1
  },
  "unique": true,
  "ns": "jgroups.translations",
  "name": "original_1_locale_1_translation_1"
});

/** translations records **/
db.getCollection("translations").insert({
  "_id": ObjectId("4f78aea48fbd153bcf7a870e"),
  "approved": true,
  "locale": "ar",
  "original": "You must be logged in to be able to post",
  "translation": "يجب ان تسجل دخولك حتى تستطيع ارسال رسائل"
});
db.getCollection("translations").insert({
  "_id": ObjectId("4f78b898b330f6e013000001"),
  "approved": true,
  "locale": "fr",
  "original": "You must be logged in to be able to post",
  "translation": "Vous devez être connecté pour envoyer des messages"
});
db.getCollection("translations").insert({
  "_id": ObjectId("4f78afaee43d8a2418000001"),
  "approved": true,
  "locale": "ar",
  "original": "Inexistant",
  "translation": "غير موجود"
});
db.getCollection("translations").insert({
  "original": "Hi, I love you",
  "locale": "fr",
  "translation": null,
  "approved": false,
  "_id": ObjectId("4f7c28e3a39b6f3418000001")
});
db.getCollection("translations").insert({
  "original": "Inexistant",
  "locale": "fr",
  "translation": null,
  "approved": false,
  "_id": ObjectId("4f7c2b0ca39b6f3418000002")
});
db.getCollection("translations").insert({
  "_id": ObjectId("4f7c498f8fbd153bcf7a870f"),
  "approved": true,
  "locale": "ar",
  "original": "Please sign in to be able to send messages",
  "translation": "sdfsdf"
});
db.getCollection("translations").insert({
  "_id": ObjectId("4fb0b5aa36ce915c02000001"),
  "approved": true,
  "locale": "ar",
  "original": "Try the game first!",
  "translation": "جرب الاول!"
});
db.getCollection("translations").insert({
  "_id": ObjectId("4fb0b6a936ce915c02000002"),
  "approved": true,
  "locale": "ar",
  "original": "Sign in",
  "translation": "دخول"
});
db.getCollection("translations").insert({
  "_id": ObjectId("4fb0b6db36ce915c02000003"),
  "approved": true,
  "locale": "ar",
  "original": "Hi",
  "translation": "مرحبا!"
});
db.getCollection("translations").insert({
  "_id": ObjectId("4fbf60430f7a3f842b8f7d06"),
  "approved": true,
  "locale": "ar",
  "original": "Do you want to buy this land",
  "translation": "هل تريد شراء هذه الأرض؟"
});
db.getCollection("translations").insert({
  "_id": ObjectId("4fbf82df0f7a3f842b8f7d07"),
  "approved": true,
  "locale": "ar",
  "original": "This is your land, wuould you like to sell it?",
  "translation": "هذه الارض مسجلة باسمك، هل تريد بيعها؟"
});
db.getCollection("translations").insert({
  "_id": ObjectId("4fbf908a0f7a3f842b8f7d0a"),
  "approved": true,
  "locale": "ar",
  "original": "This land is owned by ",
  "translation": "هذه الارض ملك"
});

/** users records **/
db.getCollection("users").insert({
  "username": "admin",
  "password": "e10adc3949ba59abbe56e057f20f883e",
  "photo": "http:\/\/c.klamwasoramail.com\/files\/photos_thumb\/d1e\/35c\/a4255570abb71b2d3e0a4d2c8b.jpg",
  "group": "user",
  "_id": ObjectId("4f533da8536647e01f000005")
});
db.getCollection("users").insert({
  "username": "hardlife",
  "password": "e10adc3949ba59abbe56e057f20f883e",
  "photo": "http:\/\/c.klamwasoramail.com\/files\/photos_thumb\/750\/7cf\/a28891f722f36fcda9415a2260.png",
  "group": "user",
  "_id": ObjectId("4f5e3eb8cf9c72e410000006")
});
db.getCollection("users").insert({
  "username": "busyliving",
  "password": "e10adc3949ba59abbe56e057f20f883e",
  "photo": "http:\/\/c.klamwasoramail.com\/files\/photos_thumb\/f12\/3b4\/5dc45bcc838e40cd5f24683547.jpg",
  "group": "user",
  "_id": ObjectId("4f6485391b5dfc581d000005")
});
db.getCollection("users").insert({
  "fb_user_id": "683331353",
  "username": "Youssef Naguib",
  "emails": [
    "ynnaguib@gmail.com"
  ],
  "photo": "https:\/\/graph.facebook.com\/683331353\/picture",
  "_id": ObjectId("4f91705adabeb0d01e000006")
});
db.getCollection("users").insert({
  "fb_user_id": 126575088,
  "username": "Youssef Garas",
  "emails": [
    null
  ],
  "photo": "https:\/\/graph.facebook.com\/126575088\/picture",
  "_id": ObjectId("4f918b467965d8a41f000086")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fee1daaaad8014000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffd8a772d4d815000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffd8a772d4d815000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffe2c52844c80e000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffe2c52844c80e000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8002deba0b6dc1c000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8002deba0b6dc1c000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ccbc697ec027000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ccbc697ec027000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ecc2eea64826000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ecc2eea64826000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb801eeafa15e5809000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb801eeafa15e5809000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb801f7afa15e58090000f5")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80208d1cab5cc0b000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80208d1cab5cc0b000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80208d1cab5cc0b000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80208d1cab5cc0b000005")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8020eca1ecec415000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8020eca1ecec415000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8020eca1ecec415000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8020eca1ecec415000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8020fca1ecec4150000ff")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80322e8919ec41c0000f6")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8033103b3eda426000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8033103b3eda426000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8033103b3eda426000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8033103b3eda426000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8033103b3eda426000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8033903b3eda426000107")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80347c77792b827000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80347c77792b827000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80347c77792b827000004")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80358f19f62281a000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80358f19f62281a000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80358f19f62281a000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8035ef19f62281a000111")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8037e55652db80a000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8037e55652db80a000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8037e55652db80a000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8037e55652db80a000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8037e55652db80a000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80385a374d01410000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80385a374d01410000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80385a374d01410000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80385a374d01410000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80385a374d01410000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80388a374d0141000011c")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8053088d987d421000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8053088d987d421000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8053088d987d421000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8053588d987d421000123")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb805449ae2e5e81d000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb805449ae2e5e81d000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb805449ae2e5e81d000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb805449ae2e5e81d000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb805499ae2e5e81d000129")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8054f957ac48c1c000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8054f957ac48c1c000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8054f957ac48c1c000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8054f957ac48c1c000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8054f957ac48c1c000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/598476211\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80555daf178ec1e000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80555daf178ec1e000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80555daf178ec1e000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80555daf178ec1e000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80558daf178ec1e000133")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80def11d2686c20000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80def11d2686c20000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80def11d2686c20000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80df311d2686c2000013f")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e61300a082017000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e61300a082017000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e61300a082017000004")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e6cf9911eb025000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e6cf9911eb025000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e6cf9911eb025000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e6cf9911eb025000006")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eccafc20b4827000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eccafc20b4827000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eccafc20b4827000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80ee3afc20b4827000150")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eed3f8122b413000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eed3f8122b413000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eed3f8122b413000004")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80f3e5b320e3411000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80f3e5b320e3411000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80f3e5b320e3411000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80f655b320e341100015b")
});
db.getCollection("users").insert({
  "username": "Bosy Cat",
  "photo": "https:\/\/graph.facebook.com\/100002195094670\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80ff15b320e3411000199")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8951644e50f8014000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8951644e50f8014000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8951644e50f8014000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8952944e50f8014000164")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a0faf7b9763821000155")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a13df7b976382100019d")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e61a76e8559c18000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e61a76e8559c18000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e61a76e8559c18000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e61a76e8559c18000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e61a76e8559c18000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e65b142ff16817000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e65b142ff16817000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e65b142ff16817000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e65b142ff16817000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e65b142ff16817000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e66d07e901d820000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e66d07e901d820000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e66d07e901d820000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e66d07e901d820000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e66d07e901d820000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e67c07e901d82000001b")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e6e08a4fd9b413000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e6e08a4fd9b413000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e6e08a4fd9b413000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e6e08a4fd9b413000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e6e08a4fd9b413000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e75792728af824000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e75792728af824000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e75792728af824000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e75792728af824000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e75792728af824000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e78b2ca52bb013000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e78b2ca52bb013000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e78b2ca52bb013000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e78b2ca52bb013000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e78b2ca52bb013000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7cea06e5df826000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7cea06e5df826000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7cea06e5df826000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7cea06e5df826000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7cea06e5df826000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7e548cebf7425000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7e548cebf7425000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7e548cebf7425000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7e548cebf7425000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7e7e548cebf7425000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eca64ccfa5fc24000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eca64ccfa5fc24000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eca64ccfa5fc24000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eca64ccfa5fc24000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eca64ccfa5fc24000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eda97edee74c12000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eda97edee74c12000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eda97edee74c12000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eda97edee74c12000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7eda97edee74c12000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7edf1697559e80b000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7edf1697559e80b000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7edf1697559e80b000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7edf1697559e80b000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7edf1697559e80b000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee13eed2563421000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee13eed2563421000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee13eed2563421000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee13eed2563421000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee13eed2563421000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee7d862a5ca421000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee7d862a5ca421000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee7d862a5ca421000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee7d862a5ca421000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee7d862a5ca421000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ee91862a5ca42100004d")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ef3d0d9378d010000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ef3d0d9378d010000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ef3d0d9378d010000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ef3d0d9378d010000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ef3d0d9378d010000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ef430d9378d010000054")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7efc7612992fc05000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7efc7612992fc05000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7efc7612992fc05000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7efc7612992fc05000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7efc7612992fc05000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f08ba0c726c41e000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f08ba0c726c41e000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f08ba0c726c41e000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f08ba0c726c41e000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f08ba0c726c41e000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f09ba0c726c41e00005f")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f196dd6b4a5421000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f196dd6b4a5421000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f196dd6b4a5421000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f196dd6b4a5421000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f196dd6b4a5421000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f26f810ffb5421000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f26f810ffb5421000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f26f810ffb5421000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f26f810ffb5421000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f26f810ffb5421000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f2ceefb25cdc1b000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f2ceefb25cdc1b000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f2ceefb25cdc1b000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f2ceefb25cdc1b000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f2ceefb25cdc1b000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f3ebded3553820000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f3ebded3553820000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f3ebded3553820000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f3ebded3553820000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f3ebded3553820000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f5e1362c0e081d000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f5e1362c0e081d000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f5e1362c0e081d000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f5e1362c0e081d000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f5e1362c0e081d000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f627362c0e081d000079")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f70d27a53a7c1d000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f70d27a53a7c1d000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f70d27a53a7c1d000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f70d27a53a7c1d000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f70d27a53a7c1d000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f71927a53a7c1d00007f")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f87b7109b9681b000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f87b7109b9681b000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f87b7109b9681b000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f87b7109b9681b000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f87b7109b9681b000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9323a62fb081d000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9323a62fb081d000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9323a62fb081d000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9323a62fb081d000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9323a62fb081d000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f970e6a074e017000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f970e6a074e017000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f970e6a074e017000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f970e6a074e017000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f970e6a074e017000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9828a41acc006000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9828a41acc006000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9828a41acc006000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9828a41acc006000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f9828a41acc006000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f99176111dac21000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f99176111dac21000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f99176111dac21000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f99176111dac21000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7f99176111dac21000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fa9ea52c31ec25000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fa9ea52c31ec25000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fa9ea52c31ec25000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fa9ea52c31ec25000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fa9ea52c31ec25000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fb49782cb6e814000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fb49782cb6e814000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fb49782cb6e814000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fb49782cb6e814000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fb49782cb6e814000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fbe53abe5d000f000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fbe53abe5d000f000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fbe53abe5d000f000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fbe53abe5d000f000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fbe53abe5d000f000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc075f74d62c25000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc075f74d62c25000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc075f74d62c25000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc075f74d62c25000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc075f74d62c25000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc24e56f0b8c26000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc24e56f0b8c26000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc24e56f0b8c26000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc24e56f0b8c26000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fc24e56f0b8c26000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcc51cdd815814000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcc51cdd815814000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcc51cdd815814000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcc51cdd815814000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcc51cdd815814000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcd04f7effa407000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcd04f7effa407000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcd04f7effa407000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcd04f7effa407000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fcd04f7effa407000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fd5a04f1537c1d000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fd5a04f1537c1d000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fd5a04f1537c1d000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fd5a04f1537c1d000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fd5a04f1537c1d000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe0c74bb69e420000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe0c74bb69e420000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe0c74bb69e420000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe0c74bb69e420000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe0c74bb69e420000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe268464a3401a000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe268464a3401a000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe268464a3401a000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe268464a3401a000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fe268464a3401a000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7feb8bde7cbfc26000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7feb8bde7cbfc26000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7feb8bde7cbfc26000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7feb8bde7cbfc26000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7feb8bde7cbfc26000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fee1daaaad8014000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fee1daaaad8014000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fee1daaaad8014000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7fee1daaaad8014000004")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffd8a772d4d815000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffd8a772d4d815000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffd8a772d4d815000004")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffe2c52844c80e000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffe2c52844c80e000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb7ffe2c52844c80e000004")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8002deba0b6dc1c000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8002deba0b6dc1c000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8002deba0b6dc1c000004")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ccbc697ec027000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ccbc697ec027000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ccbc697ec027000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800d3bc697ec0270000e8")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ecc2eea64826000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ecc2eea64826000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800ecc2eea64826000004")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb800f5c2eea648260000ef")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb801eeafa15e5809000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb801eeafa15e5809000002")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb801eeafa15e5809000004")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80208d1cab5cc0b000001")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8020eca1ecec415000001")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80347c77792b827000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80347c77792b827000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80358f19f62281a000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80358f19f62281a000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8053088d987d421000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8053088d987d421000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb805449ae2e5e81d000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80555daf178ec1e000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80def11d2686c20000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80def11d2686c20000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e61300a082017000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e61300a082017000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e6cf9911eb025000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80e6cf9911eb025000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eccafc20b4827000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eccafc20b4827000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eed3f8122b413000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80eed3f8122b413000005")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80f3e5b320e3411000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb80f3e5b320e3411000005")
});
db.getCollection("users").insert({
  "username": "محمد سعد",
  "photo": "https:\/\/graph.facebook.com\/100002094327522\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb811815b320e3411000219")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8951644e50f8014000003")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8951644e50f8014000005")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a1bf6698bc2020000157")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a6f21478ce5018000158")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a6fd2e752dec1a000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a6fd2e752dec1a000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a6fd2e752dec1a000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a6fd2e752dec1a000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a6fd2e752dec1a000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8a7052e752dec1a00016d")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8bd467e8179cc1c000001")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8bd467e8179cc1c000002")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8bd467e8179cc1c000003")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8bd467e8179cc1c000004")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8bd467e8179cc1c000005")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8be247e8179cc1c000174")
});
db.getCollection("users").insert({
  "username": "Bosy Cat",
  "photo": "https:\/\/graph.facebook.com\/100002195094670\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb8be887e8179cc1c0001b2")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fb943fee0c7ce041f000173")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba1614ce512de40c000167")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba2cd0fa5ab1fc12000168")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba2d45fa5ab1fc120001a7")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba31164f0ea2281400016a")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba31c14f0ea2281400018e")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba3a03c238876c10000174")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba3a923f8a0b201600016d")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba568f3f8a0b2016000585")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba5ecb3f8a0b2016000b42")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba5f00e129a8d413000171")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba5f51d913331410000172")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba5f57d9133314100001b1")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba6016cedca34411000173")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba6059a80da40c0a000174")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba6070a80da40c0a0001b5")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba6165abff5ba017000176")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fba6174abff5ba0170001b7")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbb652babff5ba017000279")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbb888b1e5704e40d000179")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbcb832fc71c0941c00017a")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbcc5c1f2e5fbbc0c00017c")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbcc7648257fbe01e00017c")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbce7f18257fbe01e000768")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbd10c5e755ba000c00017f")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbe1034aecb42cc0c00017f")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbe11150ec6993c11000180")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbe164246ae833c0a000181")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf509c627a179014000182")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf5e7a446f293409000183")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf60371eb1855c0d000184")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf60a5dc78e01013000185")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf6460c60fa9c811000186")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf7e3e53c890801d000187")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf80a06997d8000e000188")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf831c6997d8000e000219")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf836fd58e6fdc1a00018b")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf8371d58e6fdc1a0001d1")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf83abfee4e4dc1300018c")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf83bdfee4e4dc130001d4")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf902c091543801a00018e")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf907b091543801a0001d8")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf976b8db82d6c16000191")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf97b022e2bde41f000191")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbf97d622e2bde41f0001d9")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbfa02f3b8d7a801f000193")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbfa07a55c0119c13000194")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbfa1ba904a79141f000195")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbfa3838976a5e01e000196")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbfbafb8976a5e01e0003cd")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbfbc4758ad94f81e000198")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fbfc1b858ad94f81e0001e2")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc0ad6d58ad94f81e00022e")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc0ae1764197d981400019c")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc0ae3864197d98140001e5")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc0af5476e56b801b00019e")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc0b41b46fb18bc1b00019e")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc0be6c46fb18bc1b00041c")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc0f29a46fb18bc1b001c1e")
});
db.getCollection("users").insert({
  "username": "Batah",
  "photo": "https:\/\/graph.facebook.com\/1037966757\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc1353e46fb18bc1b00228a")
});
db.getCollection("users").insert({
  "username": "Ibrahem Gamal",
  "photo": "https:\/\/graph.facebook.com\/100002201961986\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc1ddf746fb18bc1b00231d")
});
db.getCollection("users").insert({
  "username": "Monk",
  "photo": "https:\/\/graph.facebook.com\/100002414127864\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc1e02a46fb18bc1b0023f8")
});
db.getCollection("users").insert({
  "username": "Bosy Cat",
  "photo": "https:\/\/graph.facebook.com\/100002195094670\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc8dcbd46fb18bc1b0024da")
});
db.getCollection("users").insert({
  "username": "محمد سعد",
  "photo": "https:\/\/graph.facebook.com\/100002094327522\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc9b26146fb18bc1b002760")
});
db.getCollection("users").insert({
  "username": "Salma Elshazly",
  "photo": "https:\/\/graph.facebook.com\/100002099533240\/picture",
  "group": "visitors",
  "_id": ObjectId("4fc9f79c46fb18bc1b003d2d")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcb2804b2e13a881c0001a7")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcb6940b2e13a881c000e70")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcb6ad7b2e13a881c000ebc")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcdbc49f77f0660160001aa")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcdbc9eed447fb0170001ab")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcdc648ed447fb0170003b1")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcdcd3ddc5234c8150001ad")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcdd5e035ef30c0140001af")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcddbcecc951c30120001af")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcddeff5ce74bf4020001b1")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcdeb75332d5d24150001b1")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcdebfc332d5d2415000244")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcdec4b6c4e31e8130001b3")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcdec6e6c4e31e8130001fe")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fce0ec57dafc7181b0001b5")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fce0fe4ec9fdd44180001b6")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fce110c25ab67e01c0001b7")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fce143f8dcda020190001b8")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fce146391e8ab6c010001b9")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fce14b86a184ed0100001ba")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fce283bbdb025901b0001bc")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcf14b9bdb025901b0002e2")
});
db.getCollection("users").insert({
  "username": "Hardlife",
  "photo": "https:\/\/graph.facebook.com\/100001793631234\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcfb531c9723bd80a0001be")
});
db.getCollection("users").insert({
  "username": "Remon",
  "photo": "https:\/\/graph.facebook.com\/100002161238543\/picture",
  "group": "visitors",
  "_id": ObjectId("4fcfb5e7c9723bd80a00020c")
});
db.getCollection("users").insert({
  "username": "Hema Alatmany",
  "photo": "https:\/\/graph.facebook.com\/100001875804827\/picture",
  "group": "visitors",
  "_id": ObjectId("4fd06fcac9723bd80a00025c")
});
