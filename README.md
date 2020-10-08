# vault-k8s-github-action

## Description
A github action that enables you to fetch a vault secret using a K8S service account and export it to a chosen environment variable

## Example
```yaml
    - name: Get Secret
      uses: kuperiu/vault-k8s-github-action@master
      env:
        VAULT_ADDR: https://myvault.com
        VAULT_NAMESPACE: mynamesapce
        ENV_VAR: myenvvar
        VAULT_ROLE: myvaultrole
        VAULT_KEY: myvaultsecretkey
```
