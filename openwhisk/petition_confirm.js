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
  * - id = the id of the document to confirm
  *
  * @return success:true if the vote is verified
  *
  */


function main(params) {
  
  // get cloudant instance
  var cloudant = getCloudantAccount(params);
  
  // check for cloudant database
  if (!params.dbname) {
    throw(new Error('Missing dbname'));
  }
  db = cloudant.db.use(params.dbname);

  // check for id parameter
  if (!params.id) {
    throw(new Error('Missing id'));
  }

  // insert the document into Cloudant
  return db.get(params.id).then(function(data) {
    if (!data.status || data.status !== 'unverified') {
      throw(new Error('bad status'));
    }
    data.status = 'verified';
    data.verified_ts = new Date().getTime();
    return db.insert(data);
  }).then(function(data) {
    return { success: true };
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