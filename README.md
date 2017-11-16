# Pure Aloe App

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com)

Pure Aloe is a  sample application that demonstrates the power of the Salesforce Platform to build modern apps fast. It is a rebranded and anonymized version of the application showcased during the Dreamforce 17 developer keynote.

## Installation Instructions

In the commands below, terms wrapped in \*asterisks\* signify places where you'll need to replace the dummy text we're providing with values that match your Salesforce DX setup.

1. Authenticate with your hub org (if not already done)
    ```
    sfdx force:auth:web:login -d -a *your_hub_org*
    ```

1. Clone the purealoe repository:
    ```
    git clone https://github.com/dreamforce17/purealoe
    cd purealoe
    ```

1. Create a scratch org and provide it with an alias (ex: purealoe):
    ```
    sfdx force:org:create -s -f config/project-scratch-def.json -a *purealoe*
    ```

1. Push the app to your scratch org:
    ```
    sfdx force:source:push
    ```

1. Assign the purealoe permission set to the default user:
    ```
    sfdx force:user:permset:assign -n purealoe
    ```

1. Load sample data:
    ```
    sfdx force:data:tree:import --plan ./data/Harvest_Field__c-plan.json
    sfdx force:data:tree:import --plan ./data/Merchandise__c-plan.json
    ```

1. Open the scratch org:
    ```
    sfdx force:org:open
    ```
