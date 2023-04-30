# AskMe Bot Documentation

This project was developed as part of an assignment task.

Introduction
AskMe Bot is an AI Q&A bot that helps in querying any youtube of your choice. It helps you in getting a better understanding of the youtube video that you want to query. You can ask any question related to the content of the video or even ask for a summary of the whole video.

## Setup and Installation

- Clone the repository on your system by running the command
  `git clone https://github.com/88h88h/AskMe_Bot_Assignment`

- Install the dependencies
  `yarn install`

- Go to the client folder
  `cd ./client`

- Install the dependencies
  `yarn install`

- Install ‘ffmpeg’ from ‘https://ffmpeg.org/’ and add its ‘bin’ folder in the environment variables
- Install ‘Docker’ from ‘https://docs.docker.com/get-docker/’, open ‘docker desktop,’ and run the command in the main folder

```
git clone https://github.com/chroma-core/chroma.git
cd chroma
docker-compose up -d --build
```

## To run the frontend and backend together

Ensure that you’re in the client folder and then write in the Powershell
`yarn dev`

## Using the application

There are two options for using this application:
Only query the youtube video whose URL was given in the assignment
Query any youtube video by passing its URL in the given bar

If the user wants to go with option B, then it is recommended that they use any video of a length of fewer than 5 minutes. As the app is still in its early development stage, using a video of more than 5 minutes in length may take a lot of time to process. The approximate time it will take to process is approximately the same as the length of the youtube video.

Option A will take the least time and has been provided by considering the specific youtube URL given in the assignment.

After any of the two options is chosen, the user can then ask any question related to that video and after a few sec/min, they will receive an AI-generated answer.

Note: Option B will not work if ‘ffmpeg’ is not installed, but option A will work regardless of whether it has been installed or not.
Note: As Pinecone was not working, I used Chroma as the vector database.

Hope You Like It!
