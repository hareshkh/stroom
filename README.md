## Inspiration
Many a times, our speakers have too low a volume for everyone to listen. Here is when **Stroom** will come in handy. No matter what device you have, as long as you have a browser and are connected to the internet, you have all the speakers in your bags. 

## What it does
It creates virtual rooms and a single song playing in each room at an instant, streamed from soundcloud(PS: More streaming services support in TODO).

## How we built it
We created a server in **Node.JS** along with **Express**, **ejs** and **socket.io**. The server has a functionality to support many groups at one instant i.e. you can have Group A playing some song X and Group B playing some song Y. You can join any room and listen to the song playing. Sync is maintained in all devices by the server and also devices can manually sync via a button click.
 
## What's next for Stroom
 - High scope of scaling up to various streaming services.
 - Putting up dedicated servers online
 - Creating fun virtual rooms which not just play music but can have various games, activities etc. too
 - Making user capable of sending songs to server and server queuing up music as a normal music playlist does.
 - Creating localised room searching, that will help you to find friends romm quicker

## Contributors
 - [Paras Chetal](https://github.com/paraschetal)
 - [Utsav Mangal](https://github.com/mangalutsav)
