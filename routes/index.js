/**
 * Module Dependencies
 */
const errors = require('restify-errors');

module.exports = function (server, knex) {

  /**
   * GET
   */
  server.get('/', (req, res, next) => {
    res.send("Hello World");
    next();
  });

  /**
   * GET
   */
  server.get('/projects', (req, res, next) => {
    knex.select().table('projects').then(function(results) {
      res.end(JSON.stringify(results));
      next();
    })
    .catch(function(error) {
      throw error;
    })
  });

  server.get('/projects/:id', function (req, res) {
    knex('projects').where('pid', req.params.id)
    .then(function(results) {
      var response = {
        result: results,
        status: 200
      };
      res.end(JSON.stringify(response));
    })
    .catch(function(error) {
       var response = {
        error: error,
        status: 503
      };
      res.end(JSON.stringify(response));
    })
  });

  server.post('/project-total/update/:pid', function (req, res) {
    let now = Math.floor(Date.now() / 1000);
    knex('projects').where('pid', req.params.pid)
    .update({
      estimated_hours: req.body.estimated_hours || 0,
      low_estimated_hours: req.body.low_estimated_hours || 0,
      high_estimated_hours: req.body.high_estimated_hours || 0,
      low_estimated_cost: req.body.low_estimated_cost || 0,
      high_estimated_cost: req.body.high_estimated_cost || 0
    }).then(function(results) {
      var response = {
        result: results,
        status: 200
      };
      res.end(JSON.stringify(response));
    })
    .catch(function(error) {
       var response = {
        error: error,
        status: 503
      };
      res.end(JSON.stringify(response));
    })
  });

  //rest api to create a new record into mysql database
  server.post('/project', function (req, res) {
    let now = Math.floor(Date.now() / 1000);
    knex('projects').insert({
      title: req.body.title || '',
      description: req.body.description || '',
      creator: req.body.creator || '',
      owner: req.body.owner || '',
      reviewer: req.body.reviewer || '',
      signer: req.body.signer || '',
      mlid: req.body.mlid || '',
      type: req.body.type,
      created: now,
      updated: now,
      deleted: 0
    }).then(function(results) {
      var response = {
        result: results,
        status: 200
      };
      res.end(JSON.stringify(response));
    })
    .catch(function(error) {
       var response = {
        error: error,
        status: 503
      };
      res.end(JSON.stringify(response));
    })
  });

//rest api to update record into mysql database
  server.post('/project/update/:pid', function (req, res) {
    let now = Math.floor(Date.now() / 1000);
    knex('projects').where('pid', req.params.pid)
    .update({
      title: req.body.title,
      description: req.body.description,
      creator: req.body.creator,
      owner: req.body.owner,
      reviewer: req.body.reviewer,
      signer: req.body.signer,
      mlid: req.body.mlid,
      type: req.body.type,
      updated: now
    }).then(function(results) {
      var response = {
        result: results,
        status: 200
      };
      res.end(JSON.stringify(response));
    })
    .catch(function(error) {
       var response = {
        error: error,
        status: 503
      };
      res.end(JSON.stringify(response));
    })
  });

  /**
   * Get role rates defined in a project.
   */
  server.get('/rates/:pid', (req, res) => {
    knex('rates').where('pid', req.params.pid).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
      throw error;
    })
  });

  /**
   * Save rates for a project.
   */
  server.post('/rates', function (req, res) {
    knex('rates').insert({
      category: req.body.category || '',
      role: req.body.role,
      rate: req.body.rate,
      pid: req.body.pid
    }).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
       throw error;
    })
  });

  /**
   * Updates rates for a project.
   */
  server.post('/rates/update/:rid', function (req, res, next) {
    knex('rates').where({
      rid: req.params.rid,
      pid: req.body.pid
    })
    .update({
      category: req.body.category,
      role: req.body.role,
      rate: req.body.rate
    }).then(function(results) {
      var response = {
        result: results,
        status: 200
      };
      res.end(JSON.stringify(response));
    }).catch(function(error) {
       var response = {
        error: error,
        status: 503
      };
      res.end(JSON.stringify(response));
    })
  });

  /**
   * Save uncertainity factors for a project.
   */
  server.post('/factors', function (req, res) {
    knex('uncertainity_factors').insert({
      title: req.body.title || '',
      points: req.body.points,
      lower_multiplier: req.body.lower_multiplier,
      pid: req.body.pid,
      heigher_multiplier: req.body.heigher_multiplier,
    }).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
       throw error;
    })
  });

  /**
   * Updates uncertainity factors for a project.
   */
  server.post('/factors/update/:ufid', function (req, res, next) {
    knex('uncertainity_factors').where({
      ufid: req.params.ufid,
      pid: req.body.pid
    })
    .update({
      title: req.body.title || '',
      points: req.body.points,
      lower_multiplier: req.body.lower_multiplier,
      heigher_multiplier: req.body.heigher_multiplier,
    }).then(function(results) {
      var response = {
        result: results,
        status: 200
      };
      res.end(JSON.stringify(response));
    }).catch(function(error) {
       var response = {
        error: error,
        status: 503
      };
      res.end(JSON.stringify(response));
    })
  });

  /**
   * Get uncertainity factors defined in a project.
   */
  server.get('/factors/:pid', (req, res) => {
    knex('uncertainity_factors').where('pid', req.params.pid).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
      throw error;
    })
  });

  /**
   * Save tasks for a project.
   */
  server.post('/tasks', function (req, res) {
    knex('tasks').insert({
      pid: req.body.pid,
      ufid: req.body.ufid,
      rid: req.body.rid,
      title: req.body.title,
      hours_low: req.body.hours_low,
      hours_high: req.body.hours_high,
      assumptions: req.body.assumptions || '',
      estimated_hours: req.body.estimated_hours,
      rate_low: req.body.rate_low,
      hours_high: req.body.hours_high,
      rate_high: req.body.rate_high
    }).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
       throw error;
    })
  });

  /**
   * Get role rates defined in a project.
   */
  server.get('/tasks/:pid', (req, res) => {
    knex('tasks').where('pid', req.params.pid).then(function(results) {
      res.end(JSON.stringify(results));
    })
    .catch(function(error) {
      throw error;
    })
  });

  /**
   * Updates taks for a project.
   */
  server.post('/tasks/update/:pid', function (req, res, next) {
    knex('tasks').where({
      pid: req.body.pid,
      tid: req.body.tid
    })
    .update({
      ufid: req.body.ufid,
      rid: req.body.rid,
      title: req.body.title,
      hours_low: req.body.hours_low,
      hours_high: req.body.hours_high,
      assumptions: req.body.assumptions || '',
      estimated_hours: req.body.estimated_hours,
      rate_low: req.body.rate_low,
      hours_high: req.body.hours_high,
      rate_high: req.body.rate_high
    }).then(function(results) {
      var response = {
        result: results,
        status: 200
      };
      res.end(JSON.stringify(response));
    }).catch(function(error) {
       var response = {
        error: error,
        status: 503
      };
      res.end(JSON.stringify(response));
    })
  });



// //rest api to delete record from mysql database
//   server.delete('/project/:id', function (req, res) {
//     db.query('DELETE FROM `project` WHERE `pid`=?', [req.params.id], function (error, results, fields) {
//       if (error) throw error;
//       res.end('Record has been deleted!');
//     });
//   });
}
