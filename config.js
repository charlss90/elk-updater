module.exports = {
  elasticUrl: 'http://localhost:9200',
  repositories: [
    {
      indexConfig: {
        name: 'microarrays',
        id: 'maliciousips',
      },
      name: 'CinScore ci-badguys',
      url: 'http://cinsscore.com/list/ci-badguys.txt',
      type: 'CinScore',
      fields: {
        ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      },
    },
  ],
}
