# Serverless online-petition system

Demo code to show how to create a web form that collects signatures for an online petition saving
the data into a Cloudant database. It uses 

- GitHub Pages to serve out static content
- OpenWhisk to handle the form submissions
- IBM Cloudant to store the petition submission data
- SendGrid to send transactional emails

![schematic](https://raw.githubusercontent.com/ibm-cds-labs/online-petition/master/img/workflow1.png)

All of the above can be deployed without having any fixed computing hardware dedicated to you.

All of the services can be started for free and operated (within time and load limits) for zero cost. To 
handled larger volumes of traffic, smaller fees or pay-as-you-go charges will apply.

OpenWhisk actions run to handle form submissions and email verification links:

![schematic](https://raw.githubusercontent.com/ibm-cds-labs/online-petition/master/img/workflow2.png)

![schematic](https://raw.githubusercontent.com/ibm-cds-labs/online-petition/master/img/workflow3.png)

See the page in action at https://ibm-cds-labs.github.io/online-petition/