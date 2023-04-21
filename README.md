# EComerceDjangoReact
Django with React An Ecommerce Website 🛒

<img src='https://www.saaspegasus.com/static/images/web/modern-javascript/django-react-header.51a983c82dcb.png'>

<h2>Contents</h2>
<ul>
   <h3><a href="#info"><strong>Info</strong></a></h3><p>Information about the resources used in this project</p>
   <h3><a href="#django_react_store"><strong>DjangoReatStore</strong></a></h3><p>Django with React An Ecommerce Website i</p>
   <h3><a href="#clone_project"><strong>Clone and Run a Django Project</strong></a></h3><p>how run projects in your computer</p>
</ul>
<hr>

<h1 id='info'>Info</h1>

<details><summary style="font-size: 20px;">Backend</summary>
<h4>Information about the additional library, external Api used in this project in a backend site</h4>

<strong>Django</strong>
A high-level Python web framework that encourages rapid development and clean, pragmatic design..

<strong>DjangoRestFramework</strong>
Django REST framework is a powerful and flexible toolkit for building Web APIs.

<strong>django-cors-headers</strong> A Django App that adds Cross-Origin Resource Sharing (CORS) headers to responses. This allows in-browser requests to your Django application from other origins.

<strong>stripe</strong> Stripe is one of the most popular solutions for handling online payments. It has a fairly simple API and official SDK's. We will make use of the Stripe Python package in this project..

<strong>django-storages/boto3</strong> django-storages is a collection of custom storage backends for Django.Boto3 is the Amazon Web Services (AWS) Software Development Kit (SDK) for Python, which allows Python developers to write software that makes use of services like Amazon S3 and Amazon EC2.

</details>

<hr>

<details><summary style="font-size: 20px;">Frontend</summary>
<h4>Information about the additional library, external Api used in this project in a frontend site</h4>

<strong>React</strong>
A JavaScript library for building user interfaces.

<strong>React-bootstrap</strong>
The most popular front-end framework
Rebuilt for React..

<strong>React Stripe.js</strong>React Stripe.js is a thin wrapper around Stripe Elements. It allows you to add Elements to any React app..

</details>

<center><h1 id="django_react_store"> DjangoReatStore <img src="https://img.icons8.com/ios-filled/50/null/grocery-store.png"/></h1></center>

This is an example of how great Django and React can work together.

I am connecting the frontend to the backend inside the backend. To do this, I create a path that render only the Reach index,
and django use static files from path 'frontend/build/static'.

To avoid the 404 error problem in the django app, I chose instead of duplicate urls (create the same urls in React and Django) I used HashRouter instead of BrowserRouter in React index.js.

*This project is online, you can check how it works in <a href='https://web-production-6394.up.railway.app/#/store'>Here</a>.

<center><h2 id="clone_project">Clone and Run a Django Project</h2></center>

Before diving let’s look at the things we are required to install in our system.

To run Django prefer to use the Virtual Environment

`pip install virtualenv`

Making and Activating the Virtual Environment:-

`python -m venv “name as you like”`

`source env/bin/activate`

Installing Django:-

`pip install django`

Now, we need to clone project from Github:-
<p>Above the list of files, click Code.</p>
<img src="https://docs.github.com/assets/cb-20363/images/help/repository/code-button.png">

Copy the URL for the repository.
<ul>
<li>To clone the repository using HTTPS, under "HTTPS", click</li>
<li>To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click SSH, then click</li>
<li>To clone a repository using GitHub CLI, click GitHub CLI, then click</li>
</ul>
<img src="https://docs.github.com/assets/cb-33207/images/help/repository/https-url-clone-cli.png">

Open Terminal.

Change the current working directory to the location where you want the cloned directory.

Type git clone, and then paste the URL you copied earlier.

`$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`

Press Enter to create your local clone.

```
$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
> Cloning into `Spoon-Knife`...<br>
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

Install the project dependencies:

`pip install -r requirements.txt`

create .env file,
put this information in file.

```python
DEBUG=True 
SECRET_KEY='your_secret'

SRTIPE_PUBLICK_KEY='publick'
STRIPE_SECRET_KEY='secret'
```

*to use Stripe payments firs create an accont, check hoto do this -> <a href='https://www.youtube.com/watch?v=-g3nUV_y648'> Here</a>

`python manage.py createsuperuser`

then

`python manage.py makemigrations`

then run

`python manage.py migrate`


to start the development server

`python manage.py runserver`

and open localhost:8000 on your browser to view the app.

if you have an error try check in `/frontend/package.json`

in the third line `"proxy": "http://127.0.0.1:8000",` <-- should be exactly the same.

Have fun
<p style="font-size:100px">&#129409;</p>
