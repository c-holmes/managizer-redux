const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Account = require('./client/models/account');
const Project = require('./client/models/project');
const Property = require('./client/models/property');
const SelectOption = require('./client/models/selectOption');

const app = express();
const compiler = webpack(config);

mongoose.connect('mongodb://localhost/managizr');
// mongoose.connect("mongodb://mongo:27017");

app.use('/', express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
  next();
});

router.route('/accounts')
  .get((req, res) => {
    Account.find((err, accounts) => {
      if (err) {
        return res.send(err);
      }

      return res.json(accounts);
    });
  })
  .post((req, res) => {
    const account = new Account(req.body);

    console.log(account);

    account.save((err) => {
      if (err) {
        return res.send(err);
      }

      return res.json({ account: 'Account Created' });
    });
  });


router.route('/accounts/:account_id')
  .get((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        return res.send(err);
      }
      return res.json(account);
    });
  })
  .delete((req, res) => {
    Account.remove({
      _id: req.params.account_id
    }, (err, account) => {
      if (err) {
        return res.send(err);
      }
      return res.json({ message: 'Successfully Deleted' });
    });
  })
  .put((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        return res.send(err);
      }
      Object.assign(account, req.body);
      return account.save((err) => {
        if (err) {
          return res.send(err);
        }

        return res.json({ message: 'Account Updated' });
      });
    });
  });


router.route('/accounts/:account_id/projects')
  .get((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        return res.send(err);
      }
      return res.json(account.projects);
    });
  })
  .post((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        return res.send(err);
      }

      const project = new Project(req.body);

      if (account.projects === '') {
        account.projects = [project];
      } else {
        account.projects.push(project);
      }

      return account.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json({ message: 'Project Created' });
      });
    });
  });


router.route('/accounts/:account_id/projects/:project_id')
  .get((req, res) => {
    Project.findById(req.params.project_id, (err, project) => {
      if (err) {
        return res.send(err);
      }
      return res.json(project);
    });
  })
  .delete((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        res.send(err);
      }

      account.projects.id(req.params.project_id).remove();

      return account.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json({ message: 'Project Deleted' });
      });
    });
  })
  .put((req, res) => {
    console.log(req.body);
    console.log(req.params);
    Account.update(
      {
        _id: req.params.account_id,
        'projects._id': req.params.project_id
      },
      {
        $set: {
          'projects.$': req.body
        }
      },
      (err, account, numAffected) => {
        if (err) {
          return res.send(err);
        }
        return res.json({ message: 'Project Updated' });
      }
    );
  });


router.route('/accounts/:account_id/properties/:property_id')
  .get((req, res) => {
    Property.findById(req.params.property_id, (err, property) => {
      if (err) {
        return res.send(err);
      }
      return res.json(property);
    });
  })
  .delete((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        return res.send(err);
      }
      account.properties.id(req.params.property_id).remove();
      return account.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json({ message: 'Successfully Deleted' });
      });
    });
  })
  .put((req, res) => {
    Account.update(
      {
        _id: req.params.account_id,
        'properties._id': req.params.property_id
      },
      {
        $set: {
          'properties.$': req.body
        }
      },
      (err, account, numAffected) => {
        if (err) {
          return res.send(err);
        }
        return res.json({ message: 'Property Updated' });
      }
    );
  });


router.route('/accounts/:account_id/properties/:property_id/selectOptions')
  .get((req, res) => {
    Property.findById(req.params.property_id, (err, property) => {
      if (err) {
        return res.send(err);
      }
      return res.json(property.selectOptions);
    });
  })
  .post((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        return res.send(err);
      }
      const selectOption = new SelectOption(req.body);
      const propertyId = req.params.property_id;

      if (account.properties.id(propertyId).selectOptions === '') {
        account.properties.id(propertyId).selectOptions = [selectOption];
      } else {
        account.properties.id(propertyId).selectOptions.push(selectOption);
      }

      return account.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json({ message: 'Select Option Created!' });
      });
    });
  });


router.route('/accounts/:account_id/properties/:property_id/selectOptions/:selectOption_id')
  .get((req, res) => {
    SelectOption.findById(req.params.selecOption_id, (err, selectOption) => {
      if (err) {
        return res.send(err);
      }
      return res.json(selectOption);
    });
  })
  .delete((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        return res.send(err);
      }
      account.properties.id(req.params.property_id).selectOptions.id(req.params.selectOption_id)
        .remove();
      return account.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json({ message: 'Successfully Deleted' });
      });
    });
  })
  .put((req, res) => {
    const accountId = req.params.account_id;
    const propertyId = req.params.property_id;
    const selectOptionId = req.params.selectOption_id;

    Account.findById(accountId, (err, account) => {
      if (err) {
        return res.send(err);
      }

      Object.assign(account.properties.id(propertyId).selectOptions.id(selectOptionId), req.body);

      return account.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json({ message: 'Select Option Updated' });
      });
    });
  });


router.route('/accounts/:account_id/properties')
  .get((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        return res.send(err);
      }
      return res.json(account.properties);
    });
  })
  .post((req, res) => {
    Account.findById(req.params.account_id, (err, account) => {
      if (err) {
        return res.send(err);
      }
      const property = new Property(req.body);

      if (account.properties === '') {
        account.properties = [property];
      } else {
        account.properties.push(property);
      }

      return account.save((err) => {
        if (err) {
          return res.send(err);
        }

        return res.json({ message: 'Property Created!' });
      });
    });
  });


// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(7770, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});
