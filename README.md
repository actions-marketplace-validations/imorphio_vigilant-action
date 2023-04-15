
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://cdn.imorph.club/site-docs/b458226c-3578-429e-93ea-1515acd6400a/0d-jO84sc9FnaArk9Liha.png" alt="Logo" width="200">
  </a>

  <h3 align="center">Vigilant action</h3>

  <p align="center">
    Vigilant action helps you to deploy you Static and SPA sites easily. 
    <br />
    <br />
    <a href="https://imorph.io/">View Demo</a>
    ·
    <a href="https://github.com/imorphio/vigilant-action/issues">Report Bug</a>
    ·
    <a href="https://github.com/imorphio/vigilant-action/issues">Request Feature</a>
  </p>
</div>




<!-- ABOUT THE PROJECT -->
## About The Project
This projects use the Imorph vigilant build to deploy the websites. 

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project.
To get your webiste  up and running follow these simple example steps.

### Prerequisites

Generate the `IMORPH_SECRET` and `IMORPH_DOMAIN` from the settings section of your dashboard.

Add your keys in Github actions secrets and below step in workflow file.

* step
  ```sh
      - name: Run imorph
        uses: imorphio/vigilant-action@main
        with:
          imorphSecret: ${{ secrets.IMORPH_SECRET }}
          imorphDomain: ${{ secrets.IMORPH_DOMAIN }}
  ```
 Done 
 Now, when your workflow will get trigger it will automatically deploy your website to Imorph.
 
 
 If you want to change you output build dir just pass `buildDir` in step mentioned below. By defaults its value is `/dist`
 
 * step
  ```sh
      - name: Run imorph
        uses: imorphio/vigilant-action@main
        with:
          imorphSecret: ${{ secrets.IMORPH_SECRET }}
          imorphDomain: ${{ secrets.IMORPH_DOMAIN }}
          buildDir: ${{ secrets.OUTPUT_DIR }}
  ```
 
 Here is a example workflow file 
 https://github.com/imorphio/vigilant-action-example/blob/main/.github/workflows/ci.yml

