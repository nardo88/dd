export enum Categories {
  any = 'any',
  javaScript = 'javaScript',
  typeScript = 'typeScript',
  nodeJS = 'nodeJS',
  react = 'react',
  redux = 'redux',
  nextJS = 'nextJS',
  html = 'html',
  mobx = 'mobx',
  linux = 'linux',
  test = 'test',
  css = 'css',
  mongoDB = 'mongoDB',
  postgreSQL = 'postgreSQL',
  docker = 'docker',
  fireBase = 'fireBase',
  vue = 'vue',
  meteor = 'meteor',
  php = 'php',
  git = 'git',
  polifils = 'polifils',
  Plugins = 'Plugins',
  womanUP = 'womanUP',
  webpack = 'webpack',
  vite = 'vite',
  browserApi = 'browserApi',
  webRtc = 'webRtc',
}

interface ICategory {
  id: Categories
  title: string
}

const _categories: ICategory[] = [
  { id: Categories.any, title: 'Разное' },
  { id: Categories.javaScript, title: 'JavaScript' },
  { id: Categories.typeScript, title: 'TypeScript' },
  { id: Categories.nodeJS, title: 'NodeJS' },
  { id: Categories.react, title: 'React' },
  { id: Categories.redux, title: 'Redux' },
  { id: Categories.nextJS, title: 'NextJS' },
  { id: Categories.html, title: 'HTML' },
  { id: Categories.mobx, title: 'Mobx' },
  { id: Categories.linux, title: 'Linux' },
  { id: Categories.test, title: 'Тесты' },
  { id: Categories.css, title: 'CSS' },
  { id: Categories.mongoDB, title: 'MongoDB' },
  { id: Categories.postgreSQL, title: 'PostgreSQL' },
  { id: Categories.docker, title: 'Docker' },
  { id: Categories.fireBase, title: 'FireBase' },
  { id: Categories.vue, title: 'Vue' },
  { id: Categories.meteor, title: 'Meteor' },
  { id: Categories.php, title: 'PHP' },
  { id: Categories.git, title: 'Git' },
  { id: Categories.polifils, title: 'Polifils' },
  { id: Categories.Plugins, title: 'Plugins' },
  { id: Categories.womanUP, title: 'WomanUP' },
  { id: Categories.webpack, title: 'Webpack' },
  { id: Categories.vite, title: 'Vite' },
  { id: Categories.browserApi, title: 'Browser APIs' },
  { id: Categories.webRtc, title: 'Web RTC' },
]

export const categories = _categories.sort((a, b) =>
  a.title.localeCompare(b.title)
)

export const covers: Partial<Record<Categories, string>> = {
  javaScript: '/img/templates/javaScript.jpg',
  typeScript: '/img/templates/typeScript.jpg',
  nodeJS: '/img/templates/nodeJS.jpg',
  react: '/img/templates/react.jpg',
  redux: '/img/templates/redux.jpg',
  nextJS: '/img/templates/nextJS.jpg',
  linux: '/img/templates/linux.jpg',
  mongoDB: '/img/templates/mongoDB.jpg',
  docker: '/img/templates/docker.jpg',
  vite: '/img/templates/vite.jpg',
  webpack: '/img/templates/webpack.jpg',
  css: '/img/templates/css.jpg',
  postgreSQL: '/img/templates/postgreSQL.jpg',
  fireBase: '/img/templates/fireBase.png',
  webRtc: '/img/templates/WEBRTC.png',
  test: '/img/templates/jest.png',
}
