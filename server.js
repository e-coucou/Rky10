//-------------
// version 1.1
// maj 11/2016
// by e-Coucou
//-------------
// 08/2017 try to add webhook !!
//
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

require('util');

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/contacts", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/contacts", function(req, res) {
  var newContact = req.body;
  var d = new Date();
    newContact.date = d.toLocaleDateString();
    newContact.heure = d.toLocaleTimeString();

//toLocaleString().substring(0,9);

//  if (!(req.body.firstName || req.body.lastName)) {
//    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
//  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

//----------------------
// add scale value
//
// scale : name
// high / low
app.post("/api/v1/scale", function(req, res) {
    var newScale = req.body;
    
    db.collection(CONTACTS_COLLECTION).insertOne(newScale, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new scale value.");
        } else {
        res.status(201).json(doc.ops[0]);
        }
    });
});

//------
// WebHook ?!
var obj = {
  "id": "id",
  "timestamp": "2017-02-09T15:38:26.548Z",
  "lang": "fr",
  "result": {
    "source": "agent",
    "resolvedQuery": "Population Test",
    "action": "complete",
    "actionIncomplete": false,
    "parameters": {},
    "contexts": [],
    "metadata": {
      "intentId": "9f41ef7c-82fa-42a7-9a30-49a93e2c14d0",
      "webhookUsed": "true",
      "webhookForSlotFillingUsed": "false",
      "intentName": "Population"
    },
    "fulfillment": {
      "speech": "Ca roule pour moi",
      "messages": [
        {
          "type": 0,
          "speech": "Ca roule pour moi"
        }
      ]
    },
    "score": 1
  },
  "status": {
    "code": 200,
    "errorType": "success"
  },
  "sessionId": "4b6a6779-b8ea-4094-b2ed-a302ba201815"
};
var reponse = { source : "Heroku server", speech : "xx", displayText : "xx" };
var text = "Je connais la réponse concernant {0}";

app.post("/api/v1/webhook", function(req,res) {
	console.log(req.body.result.fulfillment.speech);
//	req.body.result.fulfillment.speech = "Je connais la réponse";
//	req.body.result.
	obj.id = req.body.id;
	obj.result.metadata.intentId = req.body.result.metadata.itentId;
	obj.sessionId = req.body.sessionId;
	console.log(req.body);
	console.log(obj);
	console.log(Date.now())
	text = text.format(req.body.result.parameters.country);
	console.log(text);
	reponse.speech = text;
	reponse.displayText = text;
	res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
	res.status(200).json(reponse); //try !
//	res.render('index', { title: 'WebHook Info' });
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.get("/api/v1/test/:name", function(req, res) {
    console.log("Param: " + req.params.name);
    db.collection(CONTACTS_COLLECTION).find({ name: req.params.name }).toArray( function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to list name");
        } else {
            res.status(200).json(doc);
        }
    });
});
//-----------------------------------------------
// API V1 -> SEARCH
//
app.get("/api/v1/search", function(req, res) {
    if (req.query.source == "*" || ( typeof req.query.source == 'undefined')) { source = { $regex: /\w|/, $options:"i"} } else { source = req.query.source }
    if (req.query.name == "*" || (typeof req.query.name == 'undefined')) { name = { $regex: /\w|/, $options:"i"} } else { name = req.query.name }
    if (typeof req.query.before == 'undefined') { before = ObjectID(Math.floor((new Date('2100/12/31'))/1000).toString(16) + "0000000000000000") } else { before = ObjectID(Math.floor((new Date(req.query.before))/1000 - 7200).toString(16) + "0000000000000000") }
    if (typeof req.query.after == 'undefined') { after = ObjectID(Math.floor((new Date('2016/01/01'))/1000).toString(16) + "0000000000000000") } else { after = ObjectID(Math.floor((new Date(req.query.after))/1000 - 7200).toString(16) + "0000000000000000") }
    if (typeof req.query.filtre == 'undefined') { filtre = {} } else { if (req.query.filtre == "name") { filtre = {name: 1, value:  1, _id: 0} } else {filtre = { value: 1 , _id: 0 } } }
    
	selection = { name: name, source: source , _id: {$lt: before, $gt: after}} ;

	console.log("before = "+before+"  after : "+after);
	
    db.collection(CONTACTS_COLLECTION).find( selection , filtre ).toArray( function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to find contact");
        } else {
            res.status(200).json(doc);
        }
    });
});
// /api/v1/scale
app.get("/api/v1/list/scale", function(req, res) {

    if (req.query.scale == "*" || ( typeof req.query.scale == 'undefined')) { scale = { $regex: /\w|/, $options:"i"} } else { scale = req.query.scale }
        
        selection = { scale : scale } ;
        
        db.collection(CONTACTS_COLLECTION).find( selection ).toArray( function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to find scale");
            } else {
                res.status(200).json(doc);
            }
        });
    });
//----------------------------
// API for IOS
//
app.get("/api/v1/name", function(req, res) {
        db.collection(CONTACTS_COLLECTION).distinct( "name" , function(err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to find name");
            } else {
                res.status(200).json(doc);
            }
    });
});

app.get("/api/v1/source", function(req, res) {
    db.collection(CONTACTS_COLLECTION).distinct( "source" , function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to find source");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.get("/api/v1/date", function(req, res) {
    db.collection(CONTACTS_COLLECTION).distinct( "date" , function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to find date");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.get("/api/v1/heure", function(req, res) {
    db.collection(CONTACTS_COLLECTION).distinct( "heure" , function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to find heure");
        } else {
            res.status(200).json(doc);
        }
    });
});
app.get("/api/v1/scale", function(req, res) {
    db.collection(CONTACTS_COLLECTION).distinct( "scale" , function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to find scale value");
        } else {
        res.status(200).json(doc);
        }
    });
});

//--------xxxxx
app.put("/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      res.status(204).end();
    }
  });
});
//------------------------------------------------
// API delete
//
app.delete("/api/v1/id/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/api/v1/name/:name", function(req, res) {
    db.collection(CONTACTS_COLLECTION).deleteMany({ name: req.params.name}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete contact");
        } else {
            res.status(204).end();
        }
    });
});

app.delete("/api/v1/source/:source", function(req, res) {
    db.collection(CONTACTS_COLLECTION).deleteMany({ source: req.params.source }, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete contact");
        } else {
            res.status(204).end();
        }
    });
});
// delete with value and name
app.delete("/api/v1/valeur", function(req, res) {

  console.log("before = "+req.query.max+"  after : "+req.query.min);
  selection = { name: req.query.name, value: req.query.max } ;
//  selection = { name: req.query.name, value: {$lt: req.query.min, $gt: req.query.max}} ;

    db.collection(CONTACTS_COLLECTION).deleteMany( selection , function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete contact");
        } else {
            res.status(204).end();
        }
    });
});
