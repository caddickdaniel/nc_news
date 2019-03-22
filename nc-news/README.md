# NC-News

This is a front-end news site built using the NC-News API I created [here](https://github.com/caddickdaniel/BE2-NC-Knews)

This application allows you to browse user articles, post articles of your own, comment and vote on articles/comments, create new topics and more.

## Getting Started

### Prerequisites

You will need an editor such as VS Code, as well as Node.js (no later than v11.0) and Node Package Manager (no later than 6.4.1) up and running on your machine.

## Installing

### Get the code

First off you want to fork the repo from GitHub. To do this click on the fork option to the upper right hand side and select the GitHub account you want to fork too.

Then you want to clone the repo. To do this you want to select clone repo, copy the link provided and paste that link into your terminal in an appropriate folder like so

`git clone https://github.com/caddickdaniel/BE2-NC-Knews.git`

This will download the repo onto your machine. You want to then open the repo using your code editor.

## Install Dependancies

Once you have successfully cloned the repo, you are going to want to install all the relative dependancies needed to run the code. To do this run the following bit of code in your terminal.

`npm install body-parser chai express nodemon knex mocha pg supertest`

Once the install is complete you may want to go into your node_modules folder and check that the dependancies have been downloaded.

## Run the App

Once you've successfully downloaded the dependancies you are ready to run the code yourself. Now all you need to do is type the following command into your console.

`npm start`

This will open a local version of the website that you can then test and play around with.

## Tech

### Front-end

The only technology used in the development of this application is React. I felt like sticking solely to React as I created this App would help my understanding of it's lifecycle and principles much more than if I was to use various tech and frameworks.

### Back-end

The API I created originally to accompany my Front-end (linked at the top) was built using Postgres and Express. With mocha and chai used for testing purposes.

## Contributors

Danny Caddick [caddickdaniel](https://github.com/caddickdaniel)
