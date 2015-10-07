# Veritaseum-proof-of-concept  [![NPM version](https://badge.fury.io/js/veritaseum-proof-of-concept.png)](http://badge.fury.io/js/veritaseum-proof-of-concept)

this is just a proof of concept repository.

The main goal is to indentify all bugs and bad implementations on the file id.js.

The final fixed code will reside inside ***lib/id-fix.js*** file.


##  Browser and cli test for id-fix.js

If you want to run and test the code, you will need ***npm***, ***Node.js***. It will require ***grunt*** installed on the test environment.

Download this repository and uncompress to a given directory, lets assume: ***/Users/YourName/apps/Veritaseum-proof-of-concept/***

Or, use ***npm**

    npm i veritaseum-proof-of-concept


#### Step 1

Open and edit the file Gruntfile.js. Look for the following lines:

If you want to test on **browser**, please set runInBackground as false in Gruntfile.js

    runInBackground: false

If you want to test on **terminal**, please set runInBackground as true in Gruntfile.js

    runInBackground: true

#### Step 2

Now, on terminal, navigate to the project directory:

    $ cd /Users/YourName/apps/Veritaseum-proof-of-concept/

Install grunt (if you don't have it installed):

    $ npm install -g grunt-cli

Install dependencies:

    $ npm install grunt-contrib-connect --save-dev

    $ npm install grunt-http-server

#### Step 3

###### Browser

Now , if you want to run the test on **browser** (please see Step 2), type on terminal:

    $ grunt livetest

Then open the browser and reach the following address: 

http://localhost:8282/test/t.html

###### Terminal

Now , if you want to run the test on **terminal** (please see Step 2), type on terminal:

    $ grunt test





## Proposal

Implement a global array to store resource IDs and avoid multiple object instances of resource with same id