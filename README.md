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
