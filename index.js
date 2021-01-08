const core = require('@actions/core');
const fs = require('fs')
const jwt = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token','utf8');

const endpont = core.getInput('vault_address');
const namespace = core.getInput('vault_namespace');
const role = core.getInput('vault_role');
const vaultKey = core.getInput('vault_key');
const vaultField = core.getInput('vault_field');
const envVar = core.getInput('env_var')

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
    core.setFailed()
});

Promise.resolve(resp).then((values) => {
    core.setSecret(values.data[vaultField]);
    core.exportVariable(envVar, values.data[vaultField]);
});

