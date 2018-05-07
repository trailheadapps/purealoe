# Pure Aloe App

Pure Aloe is a fictional agricultural and manufacturing company that grows aloe and produces soaps and lotions for distributors and consumers. This app helps manage crops and harvests, as well as product distribution. Platform Events are used to update <a href="https://github.com/trailheadapps/purealoe-distributor" target="_blank">external distributor systems</a> about stock, and publish updates from those systems in Salesforce.

Find more details about this repository on the Salesforce Developer blog:

<a href="https://developer.salesforce.com/blogs/2017/11/pure-aloe-sample-application-part-1-lightning-components-salesforce-dx.html" target="_blank">Pure Aloe Sample App Part 1: Lightning Components & Salesforce DX</a>

<a href="https://developer.salesforce.com/blogs/2017/11/pure-aloe-sample-app-part-2-integration-platform-events.html" target="_blank">Pure Aloe Sample App Part 2: Integration with Platform Events</a>

## Installation Instructions

In the commands below, terms wrapped in \*asterisks\* signify places where you'll need to replace the dummy text we're providing with values that match your Salesforce DX setup.

1. Authenticate with your hub org (if not already done)
    ```
    sfdx force:auth:web:login -d -a *your_hub_org*
    ```

1. Clone the purealoe repository:
    ```
    git clone https://github.com/trailheadapps/purealoe
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
