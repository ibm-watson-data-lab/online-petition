/**
  *
  * main() will be invoked when you Run This Action.
  * 
  * @param Whisk actions accept a single parameter,
  *        which must be a JSON object.
  *
  * Should contain:
  * - sendgridBearer = the SendGrid access token
  * - sendgridSender = the email address to send from 
  * - sendgridTemplateid = the email template to send
  *
  * @return success: true when an email is sent
  *
  */

var request = require('request');

function main(params) {

  if (!params.sendgridBearer) {
    throw new Error('missing sendgridBearer');
  }

  if (!params.sendgridSender) {
    throw new Error('missing sendgridSender');
  }

  if (!params.sendgridTemplateid) {
    throw new Error('missing sendgridTemplateid');
  }

  return new Promise(function(resolve, reject) {
    
    var req = {
      method: 'POST',
      url: 'https://api.sendgrid.com/v3/mail/send',
      json: true,
      auth: {
        bearer: params.sendgridBearer
      },
      body: {
        personalizations: [
          {
            to: [
              { email: params.doc.email }
            ],
            subject: "Thanks for signing the petition",
            substitutions: {
              "[VERIFYURL]": 'https://ibm-cds-labs.github.io/online-petition/verify.html?verify=' + params.doc._id
            }
          }
        ],
        from: {
          email: params.sendgridSender
        },
        template_id: params.sendgridTemplateid
      }
    };

    // make API call to SendGrid
    request(req, function(e, r, b) {
      if (r.statusCode > 300) {
        return reject({ statusCode: r.statusCode});
      }
      
      resolve({ success: true});
    });

  });

}