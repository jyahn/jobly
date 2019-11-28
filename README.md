# Jobly

Jobly is a full-stack job board application built with a React frontend, Express backend, and PostgreSQL database.

Jobly is [live on Heroku](https://jobly-jy-frontend.herokuapp.com/).


## Table of Contents
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Features](#features)
- [Technologies](#technologies)
- [Features to add](#features-to-add)

## Screenshots

![Alt text](/frontend/public/images/jobly-home.png?raw=true "Home")
![Alt text](/frontend/public/images/jobly-companies.png?raw=true "Companies")
![Alt text](/frontend/public/images/jobly-company.png?raw=true "Single company and its' jobs")
![Alt text](/frontend/public/images/jobly-jobs.png?raw=true "Jobs")
![Alt text](/frontend/public/images/jobly-jobs-filtered.png?raw=true "Jobs filtered by salary and text simultaneously")

## Installation
### Backend Setup:  

```shell
cd backend
npm install
npm start
```

### Frontend Setup:

```shell
cd frontend
npm install
npm start
```

## Features

- User authentication / authorization
- View companies / jobs
- Filter jobs by multiple criteria and easily switch between any combination of filters
- Apply to jobs
- Edit profile

## Technologies

- React
- Create-React-App
- Axios
- Bootstrap
- Node / Express 
- PostgreSQL
- Bcrypt

## Features to add

- Infinite scrolling
- Users should be able to view the list of jobs they've applied to
