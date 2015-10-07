# Veritaseum-proof-of-concept

this is just a proof of concept repository.

The main goal is to indentify all bugs and bad implementations on the file id.js.

The final fixed code will reside inside ***lib/id-fix.js*** file.


##  Live test for id-fix.js

If you want to run and test the code, you will need ***npm***, ***Node.js***. It will require ***grunt*** installed on the test environment.

Download this repository and uncompress to a given directory, lets assume: ***/Users/YourName/apps/Veritaseum-proof-of-concept/***

Open and edit the file Gruntfile.js. Look for the following lines:

    root: '/Users/eduardoalmeida/apps/Veritaseum-proof-of-concept/',

    cache: '/Users/eduardoalmeida/apps/Veritaseum-proof-of-concept/',

Now change it to:

    root: '/Users/YourName/apps/Veritaseum-proof-of-concept/',

    cache: '/Users/YourName/apps/Veritaseum-proof-of-concept/',

Now, on terminal, navigate to the project directory:

    $ cd /Users/YourName/apps/Veritaseum-proof-of-concept/

Install grunt (if you don't have it installed):

    $ npm install -g grunt-cli

Now start the http dev server:

    $ grunt http-server:dev


#### Grunt plugins / dependencies

  * grunt-http-server ( https://www.npmjs.com/package/grunt-http-server )


##  Code test for id-fix.js using Qunit

https://github.com/web2solutions/Veritaseum-proof-of-concept/blob/master/t.html

## example of original implementation using browser console to debug

https://github.com/web2solutions/Veritaseum-proof-of-concept/blob/master/id-bug.html

## example of fixed implementation using browser console to debug

https://github.com/web2solutions/Veritaseum-proof-of-concept/blob/master/id-fix.html


## Proposal

Implement a global array to store resource IDs and avoid multiple object instances of resource with same id