export default {
    logo: <span>KIMZEROVIRUS</span>,
    repository: 'https://github.com/kimzerovirus/TIL',
    project: {
      link: 'https://github.com/kimzerovirus/TIL',
    },
    useNextSeoProps() {
      return { titleTemplate: `%s - KIMZEROVIRUS's Today I Learned` }
    },
    // titleSuffix: '',
    path:'/TIL',
    footer: {
      text: `© ${new Date().getFullYear()} © KIMZEROVIRUS.`
    },
}

// https://nextra.site/docs/docs-theme/theme-configuration
