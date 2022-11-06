# DALL·E Experiments

This experiment plays with DALL·E, an image generation model by OpenAI.

Supported operations:

-   Describe an image and let DALL·E create it
-   Pick an image and have DALL·E create a variation
-   Select a source image and a mask, and write a description, so DALL·E produces an updated image.

## Prerequisites

To run this experiment, you need the following:

-   An [OpenAI](https://openai.com/) API key
-   NPM

## Install

Create a `.env.development.local` file at the root of the project and set the value of the `VITE_OPENAI_API_KEY` variable to your API key:

```
VITE_OPENAI_API_KEY="PASTE YOUR API KEY HERE"
```

To install dependencies, execute the following commands:

```bash
npm i
```

## Run

In a terminal:

```
npm run dev
```

## Customize the defaults

To customize the default values, override them in the `.env.development.local` file or change the value directly in the `.env` file.

-   `VITE_NUMBER_OF_IMAGES_TO_GENERATE` changes the number of generated images for each operation.
-   `VITE_DEFAULT_PROMPT` changes the default value loaded in the prompt textboxes.
