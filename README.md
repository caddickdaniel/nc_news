# NC-News

This is a front-end news site built using the NC-News API I created [here](https://github.com/caddickdaniel/nc_news_backend)

This application was built to imitate a popular social news site, allowing users creative control on what articles they want to see, vote and comment on. First you will be asked to sign-in, to do so use the example within the placeholder if you haven't made one already.

Once reaching the home page you will be shown a list of the most recent articles which you can open to see in full, you can then vote on the article and take part in the discussion within the comments directly below it. You can also sort and order by various queries, post an article of your own and navigate to the various other pages available to you. Once navigating to Topic page, you will be shown a list of topics already created, you can then select a topic you would like and it will display all the articles relating to that or you can create a topic of your own.

Finally we have the users page where you can see a list of all the active users and create an account yourself. You're more than welcome to add and delete as you feel necessary.

You can find the Front-end hosted on Netlify [here](https://nc-newz.netlify.com/)

## Getting Started

### Prerequisites

You will need an editor such as VS Code, as well as Node.js (v11.0 or later) and Node Package Manager (6.4.1 or later) up and running on your machine.

## Installing

### Get the code

First off you want to fork the repo from GitHub. To do this click on the fork option to the upper right hand side and select the GitHub account you want to fork too.

Then you want to clone the repo. To do this you want to select clone repo, copy the link provided and paste that link into your terminal in an appropriate folder like so

```bash
git clone https://github.com/caddickdaniel/nc_news.git
```

This will download the repo onto your machine. You want to then open the repo using your code editor.

## Install Dependancies

Once you have successfully cloned the repo, you are going to want to install all the relative dependancies needed to run the code. To do this run the following bit of code in your terminal.

```bash
npm i
```

Once the install is complete you may want to go into your node_modules folder and check that the dependancies have been downloaded.

## Run the App

Once you've successfully downloaded the dependancies you are ready to run the code yourself. Now all you need to do is type the following command into your console.

```bash
npm start
```

This will open a local version of the website that you can then test and play around with.

## Tech

### Front-end

The only technology used in the development of this application is React. I felt like sticking solely to React as I created this App would help my understanding of it's lifecycle and principles much more than if I was to use various tech and frameworks.

### Back-end

The API I created originally to accompany my Front-end (linked at the top) was built using Postgres and Express. With mocha and chai used for testing purposes.

## Contributors & Resources

Danny Caddick [GitHub: caddickdaniel](https://github.com/caddickdaniel) &
React [Documentation](https://reactjs.org/docs/hello-world.html)
