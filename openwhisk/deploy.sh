#!/bin/bash

# This script is expecting five environment variables
# - COUCH_URL = the URL of the Cloudant service e.g. https://u:p@host.cloudant.com
# - COUCH_DBNAME = the name of the Cloudant database e.g. petition
# - SENDGRIDBEARER = the API key used to communicate with sendgrid 
# - SENDGRIDSENDER = the email address that emails will appear to come from
# - SENDGRIDTEMPLATEID = the email template id to email 
if [ -z "$COUCH_URL" ]; then echo "COUCH_URL is required"; exit 1; fi
if [ -z "$COUCH_DBNAME" ]; then echo "COUCH_DBNAME is required"; exit 1; fi
if [ -z "$SENDGRIDBEARER" ]; then echo "SENDGRIDBEARER is required"; exit 1; fi
if [ -z "$SENDGRIDSENDER" ]; then echo "SENDGRIDSENDER is required"; exit 1; fi
if [ -z "$SENDGRIDTEMPLATEID" ]; then echo "SENDGRIDTEMPLATEID is required"; exit 1; fi

# create package with parameters from environment variables
wsk package update petition --param url $COUCH_URL --param dbname $COUCH_DBNAME --param sendgridBearer $SENDGRIDBEARER --param sendgridSender $SENDGRIDSENDER --param sendgridTemplateid $SENDGRIDTEMPLATEID

# add actions to the package
wsk action update petition/verify petition_verify.js
wsk action update petition/save petition_save.js
wsk action update petition/email petition_email.js
wsk action update petition/confirm petition_confirm.js

# create action sequence in the package
wsk action update petition/submit --sequence petition/verify,petition/save,petition/email

# expose our action petition/submit sequence as a POST petition/submit API call
wsk api-experimental create /petition /submit post petition/submit
wsk api-experimental create /petition /submit options /whisk.system/utils/echo

# expose our petition/confirm as a POST petition/confirm API call
wsk api-experimental create /petition /confirm post petition/confirm
wsk api-experimental create /petition /confirm options /whisk.system/utils/echo
