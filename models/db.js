//Load the app config and initalise config variables
var config = require('config');
var cbLocation = 'couchbase://' + config.get('Database.couchbaseLocation');
var cbBucket = config.get('Database.bucket');

//Require the Couchbase SDK, connect to the cluster and our bucket
var couchbase = require('couchbase');
var cluster = new couchbase.Cluster(cbLocation);
var cb = cluster.openBucket(cbBucket);
