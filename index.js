const request = require('request');
const _ = require('underscore');

module.exports = function(token) {

    var access_token = token;
    var host = 'https://api.timelyapp.com/1.0/';

    var opts = {
        headers: {
            'Content-Type': 'application/json'
        },
        auth: {
            bearer: access_token
        }
    };

    var _get = function(path, params, callback) {
        request.get(host + path, opts,
            function (error, response, body) {
                if (error) return callback(error);
                var data = (typeof body === 'string') ? data = JSON.parse(body) : body;
                return callback(null, data);
        });
    };

    var _post = function(path, params, callback) {
        request.post(host + path, { form: params }, opts,
            function (error, response, body) {
                if (error) return callback(error);
                var data = (typeof body === 'string') ? data = JSON.parse(body) : body;
                return callback(null, data);
        });
    };

    var _delete = function(path, callback) {
        request.delete(host + path, opts,
            function (error, response, body) {
                if (error) return callback(error);
                var data = (typeof body === 'string') ? data = JSON.parse(body) : body;
                return callback(null, data);
        });
    };

    var _put = function(path, params, callback) {
        request.put(host + path, { form: params }, opts,
            function (error, response, body) {
                if (error) return callback(error);
                var data = (typeof body === 'string') ? data = JSON.parse(body) : body;
                return callback(null, data);
        });
    };

    var extendEvent = function(data) {

        if (_.isArray(data)) {
            data.forEach(function(event) {
                extendEvent(event);
            });
        } else {
            // PUT account_id:/events/:event_id
            data.update = function(params, cb) {
                _put(data.account_id + '/events/' + data.id, params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            };

            data.changeProject = function(projectId, cb) {
                _put(data.account_id + '/projects/' + projectId + '/events/' + data.id, params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            };

            data.changeUser = function(userId, cb) {
                _put(data.account_id + '/users/' + userId + '/events/' + data.id, params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            };


            // DELETE account_id:/users/:event_id
            data.delete = function(cb) {
                _delete(data.account_id + '/events/' + data.id, function(err, data) {
                    if (err) return cb(err);
                    cb(null, data);
                });
            };

            // GET account_id:/users/:event_id
            data.get = function(cb) {
                _get(data.account_id + '/events/' + data.id, null, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            };
        }

        return data;
    };

    var extendProject = function(data) {

        if (_.isArray(data)) {
            data.forEach(function(project) {
                extendProject(project);
            });
        } else {
            // GET EVENTS account_id:/users/:project_id/events
            data.events = function(cb) {
                _get(data.account_id + '/projects/' + data.id + '/events', null, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            };

            // PUT account_id:/users/:project_id
            data.update = function(params, cb) {
                _put(data.account_id + '/projects/' + data.id, params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, data);
                });
            };

            // DELETE account_id:/users/:project_id
            data.delete = function(cb) {
                _delete(data.account_id + '/projects/' + data.id, function(err, data) {
                    if (err) return cb(err);
                    cb(null, data);
                });
            };

            // GET account_id:/users/:project_id
            data.get = function(cb) {
                  _get(data.account_id + '/projects/' + data.id, {}, function(err, data) {
                      if (err) return cb(err);
                      cb(null, extendProject(data));
                });
            };

            data.createEvent = function(params, cb) {
                _post(data.account_id + '/projects/' + data.id + '/events', params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            }
        }

        return data;
    };

    var extendClient = function(data) {

        if (_.isArray(data)) {
            data.forEach(function(project) {
                extendClient(project);
            });
        } else {
            // PUT account_id:/clients/:client_id
            data.update = function(params, cb) {
                _put(data.account_id + '/clients/' + data.id, params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendClient(data));
                });
            };

            // DEL account_id:/clients/:client_id
            data.delete = function(cb) {
                _delete(data.account_id + '/clients/' + data.id, function(err, data) {
                    if (err) return cb(err);
                    cb(null, data);
                });
            };

            // GET account_id:/clients/:client_id
            data.get = function(cb) {
                  _get(data.account_id + '/clients/' + data.id, {}, function(err, data) {
                      if (err) return cb(err);
                      cb(null, extendUser(data));
                });
            };
        }

        return data;
    };

    var extendUser = function(data) {

        if (_.isArray(data)) {
            data.forEach(function(project) {
                extendUser(project);
            });
        } else {
            // GET accont_id:/events
            data.events = function(cb) {
                _get(data.account_id + '/users/' + data.id + '/events', null, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            };

            // PUT account_id:/users/:user_id
            data.update = function(params, cb) {
                _put(data.account_id + '/user/' + data.id, params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendUser(data));
                });
            };

            // DELETE account_id:/users/:user_id
            data.delete = function(cb) {
                _delete(data.account_id + '/user/' + data.id, function(err, data) {
                    if (err) return cb(err);
                    cb(null, data);
                });
            };

            // GET account_id:/users/:user_id
            data.get = function(cb) {
                  _get(data.account_id + '/user/' + data.id, {}, function(err, data) {
                      if (err) return cb(err);
                      cb(null, extendUser(data));
                });
            };

            data.createEvent = function(params, cb) {
                _post(data.account_id + '/users/' + data.id + '/events', params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            }
        }

        return data;
    };

    var extendAccount = function(data) {

        if (_.isArray(data)) {
            data.forEach(function(account) {
                extendAccount(account);
            });
        } else {
            // GET account_id:/projects (List all Proejcts)
            data.projects = function(cb) {
                _get(data.id + '/projects', {}, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendProject(data));
                });
            };

            // GET account_id:/events (All Account Events)
            data.events = function(cb) {
                _get(data.id + '/events', {}, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            };


            // GET account_id:/clients (All Account Clients)
            data.clients = function(cb) {
                _get(data.id + '/clients', {}, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendClient(data));
                });
            };

            // GET account_id:/users (All Account Users)
            data.users = function(cb) {
                _get(data.id + '/users', {}, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendUser(data));
                });
            };

            // GET /accounts/:id (Single Account)
            data.get = function(cb) {
                  _get('accounts/' + data.id, {}, function(err, data) {
                      if (err) return cb(err);
                      cb(null, extendAccount(data));
                });
            },

            data.createProject = function(params, cb) {
                _post(data.id + '/projects', params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendProject(data));
                });
            },

            data.createClient = function(params, cb) {
                _post(data.id + '/clients', params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendClient(data));
                });
            },

            data.createUser = function(params, cb) {
                _post(data.id + '/users', params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendUser(data));
                });
            },

            data.createEvent = function(params, cb) {
                _post(data.id + '/events', params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendEvent(data));
                });
            },

            data.createReport = function(params, cb) {
                _post(data.id + '/reports', params, function(err, data) {
                    if (err) return cb(err);
                    cb(null, data);
                });
            }
        }

        return data;
    };

    return {
        accounts: {
            list: function(cb) {
                _get('/accounts', null, function(err, results) {
                    if (err) return cb(err);
                    cb(null, extendAccount(results));
                });
            },

            // delete - Not available.

            get: function(id, cb) {
                _get('/accounts/' + id, {}, function(err, data) {
                    if (err) return cb(err);
                    cb(null, extendAccount(data));
                });
            }
        }

    };

};
