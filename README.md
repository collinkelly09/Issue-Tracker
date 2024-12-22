<!-- Improved compatibility of back to top link: See: https://github.com/collinkelly09/issue-tracker/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/collinkelly09/issue-tracker">
    <img src="assets/logo.png" alt="Logo" width="100" height="auto">
  </a>

  <h3 align="center">Issue Tracker</h3>

  <p align="center">
    A great issue tracking app to help you stay on top of your projects!
    <br />
    <a href="https://github.com/collinkelly09/issue-tracker"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/collinkelly09/issue-tracker">View Demo</a> -->
    <!-- · -->
    <a href="https://github.com/collinkelly09/issue-tracker/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/collinkelly09/issue-tracker/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#run-locally">Run Locally</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This is an Issue Tracking Application designed to help teams manage and track issues efficiently. Whether you're working on a software project, product development, or any other collaborative effort, this app allows users to create, manage, and collaborate on issues in a streamlined, user-friendly environment.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With



* [![TypeScript][TypeScript]][TypeScript-url]
* [![Next][Next.js]][Next-url]
* [![NextAuth.js][NextAuth.js]][NextAuth-url]
* [![React][React.js]][React-url]
* [![Prisma][Prisma]][Prisma-url]
* [![Tailwind][Tailwind.com]][Tailwind-url]
* [![Radix-Ui][Radix-ui.com]][Radix-ui-url]


<!-- Features -->
### Features


- Create an Issue
  * Users can create new issues by filling in the relevant details (e.g., title, description).


- Edit an Issue
  * Users can edit any previously created issue.
  * Changes can be made to the title, description, and other relevant fields.


- View an Issue
    - Users can view the details of an issue, including the title, description, current status, assigned user, and comments.


- Delete an Issue
    - Users have the ability to delete any issue they have created or have permission to manage.
    - Once deleted, the issue will be removed from the system.


- Update the Status of an Issue
    - Users can update the status of an issue (e.g., Open, In Progress, Resolved, Closed).
    - The status helps track the progress and workflow of the issue.


- Assign an Issue to a User
    - Users can assign issues to specific team members or individuals.
    - This helps in ensuring accountability and progress tracking on each issue.


- Comment on an Issue
    - Users can add comments to an issue for collaboration, discussion, or clarification.
    - Comments are stored chronologically and can be edited or deleted by the comment author.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This project uses NPM as package manager
* npm
  ```sh
  npm install npm@latest -g
  ```

### Run Locally

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._


1. Clone the repo
   ```sh
   git clone https://github.com/collinkelly09/issue-tracker.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Rename [.env.example](.env.example) to .env (no period after) and follow the provided instructions within the file to set the environment variables.

4. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
5. Make migrations
    ```sh
    npx prisma migrate dev
    ```
6. Run and start the server
    ```sh
    npm run build
    npm start
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Collin Kelly - [LinkedIn](https://www.linkedin.com/in/collinkelly09/) - collinkelly09@gmail.com

Project Link: [https://github.com/collinkelly09/issue-tracker](https://github.com/collinkelly09/issue-tracker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Zod](https://zod.dev/)
* [React SimpleMDE](https://www.npmjs.com/package/react-simplemde-editor)
* [React Markdown](https://www.npmjs.com/package/react-markdown/v/8.0.7)
* [React Icons](https://react-icons.github.io/react-icons/)
* [Radix-Ui Icons](https://www.radix-ui.com/icons)
* [Img Shields](https://shields.io)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/collinkelly09/issue-tracker?style=for-the-badge
[contributors-url]: https://github.com/collinkelly09/issue-tracker/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/collinkelly09/issue-tracker.svg?style=for-the-badge
[forks-url]: https://github.com/collinkelly09/issue-tracker/network/members

[stars-shield]: https://img.shields.io/github/stars/collinkelly09/issue-tracker.svg?style=for-the-badge
[stars-url]: https://github.com/collinkelly09/issue-tracker/stargazers

[issues-shield]: https://img.shields.io/github/issues/collinkelly09/issue-tracker.svg?style=for-the-badge
[issues-url]: https://github.com/collinkelly09/issue-tracker/issues

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/collinkelly09/


<!-- Screenshots -->
[product-screenshot]: assets/dashboard.png


<!-- Tech Stack -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[NextAuth.js]: https://img.shields.io/badge/nextauth.js-000000?style=for-the-badge&logo=nextdns&logoColor=white
[NextAuth-url]: https://next-auth.js.org/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Tailwind.com]: https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[Tailwind-url]: https://tailwindcss.com/

[Radix-ui.com]: https://img.shields.io/badge/radixui-161618?style=for-the-badge&logo=radixui&logoColor=white
[Radix-ui-url]: https://www.radix-ui.com/

[TypeScript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[Prisma]: https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/docs/orm
