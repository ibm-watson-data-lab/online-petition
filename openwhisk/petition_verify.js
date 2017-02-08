/**
  *
  * main() will be invoked when you Run This Action.
  * 
  * @param Whisk actions accept a single parameter,
  *        which must be a JSON object.
  *
  * Should contain
  * - email = the email address
  * - name = the name 
  * - citizen = 1/0 whether the user is a citizen of the UK
  * - location = country code
  *
  * @return the verified document or an error
  *
  */
function main(params) {

  // email, name, citizen, location
  if (!params.email || !params.name || !params.citizen || !params.location) {
    return new Error('missing default parameters');
  }

  // build verified object to save in the next action
  var doc = {
    email: params.email,
    name: params.name,
    citizen: (params.citizen === '1') ? true : false,
    location: params.location,
    status: 'unverified',
    ts: new Date().getTime()
  };

  return { doc: doc };
}

