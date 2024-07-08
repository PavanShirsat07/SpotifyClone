# Music Player Web Application

## Overview

This project is a web-based music player that allows users to browse through different albums and play songs from those albums. The application fetches song data from a server and dynamically updates the playlist based on user interactions. It includes features such as play, pause, next, previous, and seek functionalities.

## Features

- **Albums and Songs**: Browse through different albums and view the songs within them.
- **Dynamic Playlist**: Click on an album to dynamically load and display its songs.
- **Play and Pause**: Play or pause the currently selected song.
- **Next and Previous**: Navigate through songs in the playlist.
- **Seek Functionality**: Click on the seek bar to jump to a specific part of the song.
- **Responsive Design**: Adjusts to different screen sizes for a better user experience.

## Project Structure

```plaintext
SpotifyClone/
├── Songs/
│   ├── album1/
│   │   ├── song1.mp3
│   │   ├── song2.mp3
│   │   └── info.json
│   ├── album2/
│   │   ├── song1.mp3
│   │   ├── song2.mp3
│   │   └── info.json
│   └── ...
├── img/
│   ├── play.svg
│   ├── paused.svg
│   ├── music.svg
│   ├── play2.svg
│   ├── cross.svg
│   └── hamburger.svg
├── index.html
├── style.css
└── script.js


### Explanation of the Project

1. **HTML Structure**:
    - The main page consists of a container for displaying album cards (`.cardContainer`) and a list for displaying songs (`.songlist ul`).
    - The player controls include play/pause buttons, seek bar, and navigation buttons (next/previous).

2. **CSS Styling**:
    - Ensures a responsive layout and visually appealing design.
    - Styles the album cards, song list, and player controls.

3. **JavaScript Logic**:
    - **Fetching Data**: Uses `fetch` to retrieve album and song data from the server.
    - **Dynamic Updates**: Updates the DOM to display albums and songs dynamically based on user interactions.
    - **Player Controls**: Implements play, pause, next, previous, and seek functionalities. It also updates the song time and progress bar in real-time.
    - **Event Listeners**: Adds event listeners to album cards, songs, and player controls to handle user interactions.

This project demonstrates a simple yet functional music player with a clean and responsive user interface, making it easy for users to browse and play songs from different albums.

Installation
clone:
git clone https://github.com/your-username/SpotifyClone.git

Usage
- Browse Albums: On the main page, you will see a list of albums. Each album displays its title, description, and cover image.
- View Songs: Click on an album to load and view the list of songs in that album.
- Play a Song: Click on a song to play it. The player controls at the bottom will allow you to play, pause, seek, and navigate through the playlist.
- Navigate Songs: Use the previous and next buttons to navigate through the songs in the album.
