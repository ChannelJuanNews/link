const withHttp = (url) =>
  url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
    schemma ? match : `http://${nonSchemmaUrl}`
  );

export default withHttp;
