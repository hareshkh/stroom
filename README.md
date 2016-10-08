# Inspiration
Many a times, our speakers have too low a volume for everyone to listen. Here is when **Stroom** will come in handy. No matter what device you have, as long as you have a browser and are connected to the internet, you have all the speakers in your bags. 

# What it does
It creates virtual rooms and a single song playing in each room at an instant, streamed from soundcloud(PS: More streaming services support in TODO).

# How it works
A server is created in **Node.JS** along with **Express**, **ejs** and **socket.io**. The server has a functionality to support many groups at one instant i.e. you can have, say **Group A** playing some **Song X** and **Group B** playing some **Song Y**. You can join any room and listen to the song playing or create a new room. Sync is maintained among all devices of the same group (room) by the server and also devices can manually sync via a button click.
 
# TODO
 - [ ] Refactor the current code
 - [ ] Make links in join room clickable
 - [ ] Make an option for uploading songs by users and maintaining a song queue for a room
 - [ ] Make a Music Player like UI
 - [ ] Integrate the concept of room recommendations based on location

# Contributors
 - [Haresh Khanna](https://github.com/hareshkh)
 - [Paras Chetal](https://github.com/paraschetal)
 - [Utsav Mangal](https://github.com/mangalutsav)