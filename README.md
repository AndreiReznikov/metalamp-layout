# MetaLamp layout project

This is a training project to find hotel rooms, to which I have devoted quite a lot of time. It was a necessary and interesting experience. While I was doing this project, I realized what component layout, preprocessors, assemblers, plugins, and much more are. That was cool!

# Demo: https://andreireznikov.github.io/metalamp-layout-demo

# Plugins:

- air-datepicker: ^2.2.3,
- chart.js: ^3.4.1,
- inputmask: ^5.0.6,
- ion-rangeslider: ^2.3.1,
- jquery: ^3.6.0,
- paginationjs": ^2.1.5,
- slick-carousel": ^1.8.1

# Technologies:

- npm: 9.5.1
- Node.js 18.16.1

# Important

Most of the commits were lost in the process, due to the inexperience of the author. The project files from the folder were moved manually to a remote repository.

Due to incorrectly connected fonts at the initial stage of development, css files have become very large. An extension is used to track them .gitattributes. This issue has been fixed in the latest version.

# Start

First you have to create a copy of the remote repository locally:

```
git clone https://github.com/AndreiReznikov/metalamp-layout
```

Then you have to install all the necessary packages to work with the project. Use the following command in the local repository:

```
npm install
```

To start the project, use the command:

```
npm run server
```

# Npm commands

- "prod": build a production bundle,

```
npm run prod
```

- "dev": build a development bundle,

```
npm run dev
```

- "server": start the local server,

```
npm run server
```

- "lint": check the project for eslint errors,

```
npm run lint
```

- "fix": fix eslint errors

```
npm run fix
```

- "stylelint": check the project for stylelint errors,

```
npm run stylelint
```

- "fix:stylelint": fix stylelint errors

```
npm run fix:stylelint
```
