/**
  *
  * main() will be invoked when you Run This Action.
  * 
  * @param Whisk actions accept a single parameter,
  *        which must be a JSON object.
  *
  * Should contain:
  * - url = the Cloudant URL
  * - dbname = the name of the database
  * - doc = the document to save
  * 
  * @return returns the documetn with its _id and _rev
  *
  */

function main(params) {
  
  // get cloudant instance
  var cloudant = getCloudantAccount(params);
  
  // ensure we have have a doc to save
  if (!params.doc || typeof params.doc !== 'object') {
    throw(new Error('Missing doc'));
  }
  
  // check for cloudant database
  if (!params.dbname) {
    throw(new Error('Missing dbname'));
  }
  db = cloudant.db.use(params.dbname);

  // insert the document into Cloudant
  return db.insert(params.doc).then(function(data) {
    // return the document and its id/rev
    params.doc._id = data.id;
    params.doc._rev = data.rev;
    return { doc: params.doc };
  });
}

function getCloudantAccount(message) {
  // full cloudant URL - Cloudant NPM package has issues creating valid URLs
  // when the username contains dashes (common in Bluemix scenarios)
  var cloudantUrl;

  if (message.url) {
    // use bluemix binding
    cloudantUrl = message.url;
  } else {
    if (!message.host) {
      return 'cloudant account host is required.';
    }
    if (!message.username) {
      return 'cloudant account username is required.';
    }
    if (!message.password) {
      return 'cloudant account password is required.';
    }

    cloudantUrl = "https://" + message.username + ":" + message.password + "@" + message.host;
  }

  return require('cloudant')({
    url: cloudantUrl,
    plugin: 'promises'
  });
}