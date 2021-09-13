module.exports = {
  title: 'Vue Currency Input',
  description: 'Easy input of currency formatted numbers for Vue.js',
  head: [
    ['link', { rel: 'icon', href: '/vue-currency-input/favicon.png' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap' }]
  ],
  base: '/vue-currency-input/',
  themeConfig: {
    logo: '/favicon.png',
    nav: [
      {
        text: '❤ Donate',
        link: 'https://ko-fi.com/dm4t20593'
      },
      {
        text: 'v1 Docs',
        link: 'https://vue-currency-input-v1.netlify.app/'
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/dm4t2/vue-currency-input/releases'
      }
    ],
    sidebar: [
      {
        text: 'Guide',
        link: '/guide'
      },
      {
        text: 'Config Reference',
        link: '/config'
      },
      {
        text: 'Playground',
        link: '/playground'
      },
      {
        text: 'Examples',
        link: '/examples'
      },
      {
        text: 'API',
        link: '/api'
      }
    ],
    repo: 'dm4t2/vue-currency-input',
    docsDir: 'docs'
  }
}
