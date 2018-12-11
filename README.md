# Pure Aloe Aura Sample Application

> IMPORTANT: This is the Aura version of the Pure Aloe sample application. If you are looking for the new Lightning Web Components version, click [here](https://github.com/trailheadapps/purealoe-lwc).

![purealoe-logo](purealoe-logo.png)

[![CircleCI](https://circleci.com/gh/trailheadapps/purealoe.svg?style=svg)](https://circleci.com/gh/trailheadapps/purealoe)

Pure Aloe is a fictional agricultural and manufacturing company that grows aloe and produces soaps and lotions for distributors and consumers. This app helps manage crops and harvests, as well as product distribution. Platform Events are used to update [external distributor systems](https://github.com/trailheadapps/purealoe-distributor) about stock, and publish updates from those systems in Salesforce.

Find more details about Pure Aloe on the Salesforce Developer blog:

[Pure Aloe Sample App Part 1: Lightning Components & Salesforce DX](https://developer.salesforce.com/blogs/2017/11/pure-aloe-sample-application-part-1-lightning-components-salesforce-dx.html)

[Pure Aloe Sample App Part 2: Integration with Platform Events](https://developer.salesforce.com/blogs/2017/11/pure-aloe-sample-app-part-2-integration-platform-events.html)

[Spring 18 for Developers: Go With the Flow Like Never Before](https://developer.salesforce.com/blogs/2018/01/spring-18-for-developers-flow.html)


## Table of Contents

*   [Installation](#installation)
    *   [Installing Pure Aloe using Salesforce DX](#installing-pure-aloe-using-salesforce-dx)
    *   [Installing Pure Aloe using an unlocked package](#installing-pure-aloe-using-an-unlocked-package)
*   [Additional Resources](#additional-resources)


## Installation

### Installing Pure Aloe using Salesforce DX
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

### Installing Pure Aloe using an unlocked package
Use this option if you don't have Salesforce DX configured or if you want to experience the sample app and do not plan to modify the code.

1. [Sign up](https://developer.salesforce.com/signup) for a Developer Edition (DE) org.

1. Enable MyDomain in your DE org. Instructions to do this are [here](https://trailhead.salesforce.com/modules/identity_login/units/identity_login_my_domain).

1. Click [this link](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t1I0000036u9DQAQ) to install the Pure Aloe unlocked package into your DE org.

1. Select **Install for All Users**

1. Import Harvest Field data:
    - In **Setup**, type **Data Import** in the Quick Find box and click **Data Import Wizard**.
    - Click **Launch Wizard**.
    - Click the **Custom objects** tab, click **Harvest Fields**, and click **Add New Records**.
    - Drag **Harvest_Fields_Data.csv** from the data folder of this project to the upload area.
    - Click **Next**, **Next**, and **Start Import**.

1. Import Merchandise data:
    - In **Setup**, type **Data Import** in the Quick Find box and click **Data Import Wizard**.
    - Click **Launch Wizard**.
    - Click the **Custom objects** tab, click **Merchandise**, and click **Add New Records**.
    - Drag **Merchandise_Data.csv** from the data folder of this project to the upload area.
    - Click **Next**, **Next**, and **Start Import**.

1. In **App Launcher**, select the **PureAloe** app

1. Have fun exploring!

## Distributor App

To explore how Pure Aloe uses Platform Events to integrate with external systems, download and configure the [Pure Aloe distributor app](https://github.com/trailheadapps/purealoe-distributor).

When you create a Product Bundle in Salesforce and change its status to **Submitted to Distributors**, the **Bundle Submitted** process automatically publishes the **Bundle_Submitted__e** platform event. The distributor app is listening for that event and automatically adds the product bundle to the bundle list when a **Bundle_Submitted__e** event comes in.

When you click the **Order** button next to a bundle in the distributor app, the distributor app publishes a **Bundle_Ordered__e** event. The **Bundle Ordered** process (in Process Builder) listens for that event and automatically changes the order status to **Ordered by Distributor** when an event comes in. If a user is looking at the record details page for that bundle, the status will automatically change (no page refresh required) because the status path component is using the Streaming API to listen for status changes. For this last part to work, you need to execute the following Salesforce DX command to create the Streaming API topic:

```
sfdx force:apex:execute -f ./apex/createPushTopic.apex
```

Take a look at the `createPushTopic.apex` file in the `/apex` folder to examine the push topic creation logic.

Note that you could also have listened directly for the platform event in the status path component and update the status to **Ordered by Distributor** in the UI when the event comes in. However, that approach could lead to inconsistencies in case the server-side status update (handled by the **Bundle Ordered** process) fails, because a validation rule is not met for example. In that case the UI would show the status as **Ordered by Distributor**, while the status in the database would still be **Submitted to Distributor**.
