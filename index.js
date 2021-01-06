const fs = require('fs')
const jwt = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token','utf8');
const envVar = process.env.ENV_VAR
const endpont = process.env.VAULT_ADDR;
const namespace = process.env.VAULT_NAMESPACE;
const role = process.env.VAULT_ROLE;
const vaultKey = process.env.VAULT_KEY;
const vaultField = process.env.VAULT_FIELD;

const core = require('@actions/core');
var options = {
    apiVersion: 'v1', 
    endpoint: endpont, 
    namespace: namespace
  };
 
const vault = require("node-vault")(options);

const resp = vault.kubernetesLogin({  jwt: jwt, role: role})
.then( () => vault.read(vaultKey))
.then(function(resp) {
    return resp;
})
.catch((err) => {
    console.log(err)
    process.exit(1)
});

Promise.resolve(resp).then((values) => {
    core.setOutput(envVar, values.data[vaultField]);
});

