const fs = require('fs')
const jwt = fs.readFileSync('/var/run/secrets/eks.amazonaws.com/serviceaccount/token','utf8').replace("\n", "");
const envVar = process.env.ENV_VAR
const endpont = process.env.VAULT_ADDR;
const namespace = process.env.VAULT_NAMESPACE;
const role = process.env.VAULT_ROLE;
const vaultKey = process.env.VAULT_KEY;
const vaultField = process.env.VAULT_FIELD;

const core = require('@actions/core');
console.log(jwt)
var options = {
    apiVersion: 'v1', 
    endpoint: endpont, 
    namespace: namespace
  };


  
 


