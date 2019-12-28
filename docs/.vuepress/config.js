module.exports = {
  base: '/vue-currency-input/',
  title: 'Vue Currency Input',
  description: 'Easy input of currency formatted numbers for Vue.js',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  themeConfig: {
    smoothScroll: true,
    search: false,
    editLinks: false,
    nav: [{
      text: 'Release Notes',
      link: 'https://github.com/dm4t2/vue-currency-input/releases'
    }],
    sidebar: {
      '/': [
        '/guide/',
        '/config/',
        '/playground/',
        '/api/'
      ]
    },
    repo: 'dm4t2/vue-currency-input',
    docsDir: 'docs',
    docsBranch: 'gh-pages'
  }
}
