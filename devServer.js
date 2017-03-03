var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var compiler = webpack(config);
var Account = require('./client/models/account');
var Project = require('./client/models/project');
var Property = require('./client/models/property');

//mongoose.connect('mongodb://localhost/managizer'); 
mongoose.connect("mongodb://mongo:27017");

app.use('/', express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// ----------------------------------------------------
router.route('/accounts')

  .get(function(req, res) {
    Account.find(function(err, accounts) {
      if (err)
        res.send(err);

      res.json(accounts);
    });
  })
  
  .post(function(req, res){
    var account = new Account(req.body);

    account.save(function(err) {
      if (err)
        res.send(err);

      res.json({ account: 'Account Created' });
    });
  })

//-----------------------------------------------------
router.route('/accounts/:account_id')

  .get(function(req, res) {
    Account.findById(req.params.account_id, function(err, account){
      if (err) 
        res.send(err);
      res.json(account);
    });
  })

  .delete(function(req, res){
    Account.remove({
      _id: req.params.account_id
    }, function(err, account) {
      if (err)
        res.send(err);
        res.json({ message: 'Successfully Deleted' });
    });
  })

  .put(function(req, res){
    Account.findById(req.params.account_id, function(err, account) {

      if (err)
        res.send(err);

      Object.assign(account,req.body);

      account.save(function(err) {
        if(err)
          res.send(err);

        res.json({message: 'Account Updated'});
      });
    })
  });

// ----------------------------------------------------
router.route('/accounts/:account_id/projects')

  .get(function(req, res) {
    Account.findById(req.params.account_id, function(err, account){
      if (err) 
        res.send(err);
      res.json(account.projects);
    });
  })
  
  .post(function(req, res){
    Account.findById(req.params.account_id, function(err, account) {
      if (err)
        res.send(err);

      var project = new Project(req.body);

      if(account.projects == ""){
        account.projects = [project];
      } else {
        account.projects.push(project);  
      }

      account.save(function(err) {
        if(err)
          res.send(err);

        res.json({message: 'Project Created'});
      });
    })
  });

// ----------------------------------------------------
router.route('/accounts/:account_id/projects/:project_id')

  .get(function(req, res) {
    Project.findById(req.params.project_id, function(err, project){
      if (err) 
        res.send(err);
      res.json(project);
    });
  })

  .delete(function(req, res){
    Account.findById(req.params.account_id, function(err,account){
      if (err)
        res.send(err);

      account.projects.id(req.params.project_id).remove();

      account.save(function(err) {
        if(err)
          res.send(err);
        res.json({message: 'Project Deleted'});
      });
    })
  })

  .put(function(req, res){
    Account.update(
      {_id:req.params.account_id, "projects._id":req.params.project_id},
      {
        $set: {
          "projects.$": req.body
        }
      },
      function(err, account, numAffected) {
        if(err)
          return res.send(err);
        res.json({message: 'Project Updated'});
      }
    )
  });

// ----------------------------------------------------
router.route('/accounts/:account_id/properties/:property_id')

  .get(function(req, res) {
    Property.findById(req.params.property_id, function(err, property){
      if(err)
        res.send(err);
      res.json(property);
    });
  })

  .delete(function(req, res){
    Account.findById(req.params.account_id, function(err, account){
      if (err)
        res.send(err);
      account.properties.id(req.params.property_id).remove();
      account.save(function(err){
        if(err)
          res.send(err);
        res.json({ message: 'Successfully Deleted' });
      })
    })
  })

  .put(function(req, res){
    Account.update(
      {_id:req.params.account_id, "properties._id":req.params.property_id},
      {
        $set: {
          "properties.$": req.body
        }
      },
      function(err, account, numAffected) {
        if(err)
          return res.send(err);
        res.json({message: 'Property Updated'});
      }
    )
  });

// ----------------------------------------------------
router.route('/accounts/:account_id/properties')
  
  .get(function(req, res) {
    Account.findById(req.params.account_id, function(err, account){
      if (err) 
        res.send(err);
      res.json(account.properties);
    });
  })

  .post(function(req, res){
    Account.findById(req.params.account_id, function(err, account){
      if (err)
        res.send(err);
      var property = new Property(req.body);

      if(account.properties == ""){
        account.properties = [property];
      } else {
        account.properties.push(property);
      }

      account.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Property Created!'});
      });
    })
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// =============================================================================

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(7770, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});
