# Bamazon - Command Line Node App

## Overview
This app is a mock online store. 
<br>
When the app is ran it will first ask the user if they would like to shop with us.
<br>

<br>
![](bamazon.gif)
<br>
<br>


## How to Use

Start App with node bamazonCustomer.js.

## Commands
### 1. concert
###### Info
Name of Concert <br>
Location <br>
Date
### 2. song
###### Info
Artist <br>
Song <br>
Album <br>
Preview Link
### 3. movie
###### Info
Title <br>
Year Released <br>
IMDB Rating <br>
Rotten Tomatoes Rating <br>
Production Location <br>
Languages <br>
Plot <br>
Actors 

## NPMs Used
axios <br>
Node-Spotify-API <br>
Moment <br>
DotEnv <br>

## What You Need To Run The App
The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
<br>
<br>
Step 1: <br> Visit https://developer.spotify.com/my-applications/#!/
<br>
<br>
Step 2: <br> Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
<br>
<br>
Step 3: <br> Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
<br>
<br>
Step 4: <br> On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
<br>
<br>
Spotify API keys <br>
**SPOTIFY_ID=your-spotify-id** <br>
**SPOTIFY_SECRET=your-spotify-secret** <br>
inside of the .env file
