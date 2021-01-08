import * as core from '@actions/core'
import fs from 'fs';
import NodeVault, * as vault from 'node-vault';


async function readSecret(endpoint: string, namespace: string, jwt: string, role: string, vaultKey: string, vaultField: string) {
    const options = {
        apiVersion: 'v1', 
        endpoint: endpoint, 
        namespace: namespace
      };

    const svc = vault.default(options)
    const resp = svc.kubernetesLogin({  jwt: jwt, role: role})
    .then( () => svc.read(vaultKey))
    .then(function(resp) {
        return resp;
    })
    .catch((err) => {
        console.log(err)
        return err
    });

    Promise.resolve(resp).then((values) => {
        core.setSecret(values.data[vaultField])
    });

}

async function run() {
    try {
        const jwt = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token','utf8');

        const endpont = core.getInput('vault_address');
        const namespace = core.getInput('vault_namespace');
        const role = core.getInput('vault_role');
        const vaultKey = core.getInput('vault_key');
        const vaultField = core.getInput('vault_field');
        const secretName = core.getInput('secret_name')

        readSecret(endpont, namespace, jwt, role, vaultKey, vaultField)

    }
    catch (error) {
        core.setFailed(error.message)
    }
}   

run()