# Deforum Helper

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-brightgreen)](https://deforum-helper.vercel.app/)

This repository contains a helper tool for [Deforum](https://github.com/deforum-art/deforum-stable-diffusion), a stable diffusion extension that allows users to create videos with the Stable Diffusion Image Generator AI. Deforum Helper assists users in writing camera animations on a timeline in Deforum and provides a visualization of the changes between frames.

## Live Demo

Check out the live demo of the application [here](https://deforum-helper.vercel.app/).

## Features

- Create a visual timeline with 6 channels: Translation X, Translation Y, Translation Z, Rotation X, Rotation Y, and Rotation Z.
- Hover over the upper ruler to see the timestamp in minutes, seconds, and thousandths of a second (00:00:000).
- Click on a channel to expand the timeline for that channel.
- Activate/deactivate specific frames with on/off buttons inside each frame.
- Adjust frame values using the up-down buttons inside the frame.
- Copy button for each channel to easily copy the channel values, ready to paste into Deforum settings file or [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) interface input.
- Control panel with copy and download buttons to get the full settings ready to go with Deforum.

## Usage

To run the application, you have two options:

1. Access the [live demo](https://deforum-helper.vercel.app/) directly in your browser.
2. Clone this repository, install the required dependencies, and run the development server using npm:

```bash
npm install
npm run dev
```

## Technologies Used

This application is made with Next.js, a popular React framework for building server-rendered applications.

## Credits

[Deforum](https://github.com/deforum-art/deforum-stable-diffusion): Stable diffusion extension for creating videos with Stable Diffusion Image Generator AI.
[Stable Diffusion](https://github.com/Stability-AI/stablediffusion): The core library behind Deforum's stable diffusion extension.
[AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui): An interface for interacting with Stable Diffusion AI.
Me: this app code 😊

## Contribution

Contributions to this project are welcome! If you find any issues or have suggestions, please feel free to create an issue or submit a pull request.

## License

This project is licensed under the MIT License.
