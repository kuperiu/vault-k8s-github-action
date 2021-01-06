# vault-k8s-github-action

## Description
A github action that enables you to fetch a vault secret using a K8S service account and set it as an output

## Example
```yaml
    - name: Get Secret
      id: secrets
      uses: kuperiu/vault-k8s-github-action@master
      env:
        vault_address: https://myvault.com
        vault_namespace: mynamesapce
        vault_role: myvaultrole
        vault_key: myvaultsecretkey
        vault_field: myvaultfield
        secret_name: my_secret

    - name: Output
      run: echo "${{ steps.secrets.outputs.my_secret }}"

```
