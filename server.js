if (!fetch) {
  var fetch = require('node-fetch');
}

// Construct a schema, using GraphQL schema language
var request1 = `
{
  organization(login: "tc39") {
    repositories(last: 1, isFork: false, privacy: PUBLIC) {
      nodes {
        name
        description: shortDescriptionHTML(limit: 150)
        githubUrl: url
        specUrl: homepageUrl
        readme: object(expression: "master:README.md") {
          ... on Blob {
            text
          }
        }
      }
    }
  }
  }
`;
var request = `
{
  repository(owner:"tc39", name:"proposal-dynamic-import") {
    name
    description: shortDescriptionHTML(limit: 150)
    githubUrl: url
    specUrl: homepageUrl
    readme: object(expression: "master:README.md") {
      ... on Blob {
        text
      }
    }
  }
}
`;

fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization' : "Bearer <insert>",
  },
  body: JSON.stringify({query: request})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data.data.repository.readme));

function getExample(string) {

}

function parseReadme(readme) {
}
