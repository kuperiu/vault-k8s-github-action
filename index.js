const jwt = process.env.VAULT_JWT_TOKEN;
const envVar = process.env.ENV_VAR
const endpont = process.env.VAULT_ADDR;
const namespace = process.env.VAULT_NAMESPACE;

const core = require('@actions/core');

var options = {
    apiVersion: 'v1', 
    endpoint: endpont, 
    namespace: namespace
  };
 
const vault = require("node-vault")(options);

const resp = vault.kubernetesLogin({  jwt: jwt, role: 'github-runner'})
.then( () => vault.read('bots/github-runner'))
.then(function(resp) {
    return resp;
})
.catch((err) => console.error(err.message));

Promise.resolve(resp).then((values) => {
    core.exportVariable(envVar, values.data.token);
});

