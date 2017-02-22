# Serverless online-petition system

Demo code to show how to create a web form that collects signatures for an online petition saving
the data into a Cloudant database. It uses 

- GitHub Pages to serve out static content
- OpenWhisk to handle the form submissions
- IBM Cloudant to store the petition submission data
- SendGrid to send transactional emails

One workflow handles the form submission itself:

![schematic](https://raw.githubusercontent.com/ibm-cds-labs/online-petition/master/img/workflow1.png)

Another handles what happens when the link on the confirmation is clicked:

![schematic](https://raw.githubusercontent.com/ibm-cds-labs/online-petition/master/img/workflow2.png)

All of the above can be deployed without having any fixed computing hardware dedicated to you.

All of the services can be started for free and operated (within time and load limits) for zero cost. To 
handle larger volumes of traffic, smaller fees or pay-as-you-go charges will apply.

OpenWhisk actions run singly or as a sequence of actions to handle form submissions and email verification links:

![schematic](https://raw.githubusercontent.com/ibm-cds-labs/online-petition/master/img/workflow3.png)

[Read why and how we created this app](https://medium.com/@glynn_bird/2779161c4c68#.4rrlf2nig). See the page in action at https://ibm-cds-labs.github.io/online-petition/

### Sample deployment

#### Create a Cloudant database

* Provision a Cloudant service instance in Bluemix using the [web console](https://console.ng.bluemix.net/catalog/services/cloudant-nosql-db/) or the Cloud Foundry CLI:

```
$ cf create-service cloudantNoSQLDB Lite serverless-demo
```

* Create database named `petitions` in this Cloudant instance

#### Clone the sample repository

```
$ git clone https://github.com/ibm-cds-labs/online-petition.git
$ cd online-petition
```
#### Configure SendGrid

* Sign-up for a [SendGrid account (or log in)](https://sendgrid.com/)

* Create an API token
  * Open the dashboard
  * Select _Settings_ > _API keys_ > _Create API key_
  * Name the API key and grant _Full access_ to _Mail send_
  * Take note of the API Key ID (e.g. `r9....OTQ`)
* Create a transactional email template 
  * In the dashboard select _Templates_ > _Transactional_
  * In the email body include the following text
  
    ```
      Click here [VERIFYURL] to confirm your email address.
    ```
* Take note of the template id (e.g. `b544f3c7-...d`)

#### Deploy the OpenWhisk artifacts

* Configure the deployment script

  ```
  $ cd openwhisk
  $ export COUCH_URL=https://...:...@...-bluemix.cloudant.com
  $ export COUCH_DBNAME=petitions
  $ export SENDGRIDBEARER=r9....OTQ
  $ export SENDGRIDSENDER=petitions@...
  $ export SENDGRIDTEMPLATEID=b544f3c7-...d
  ```

* In https://github.com/ibm-cds-labs/online-petition/blob/master/openwhisk/petition_email.js#L50 replace hostname and path with your desired githubio hostname and path.

* Deploy the artifacts

 ```
 $ deploy.sh
 ```

* Take note of the displayed API URLs (e.g. `https://1...9-gws.api-gw.mybluemix.net/petition/submit` and `https://1...9-gws.api-gw.mybluemix.net/petition/confirm`)

#### Customize the petition web pages

* In https://github.com/ibm-cds-labs/online-petition/blob/master/index.html#L109 replace the default API URL with your API URL

* In https://github.com/ibm-cds-labs/online-petition/blob/master/verify.html#L19 replace the default API URL with your API URL

* Publish the content of the online-petition directory (without the openwhisk folder) on github
