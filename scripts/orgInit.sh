#!/bin/bash

DURATION=7

if [ "$#" -eq 1 ]; then
  DURATION=$1
fi

sfdx force:org:create -a purealoe -s -f config/project-scratch-def.json -f $DURATION
sfdx force:source:push
sfdx force:user:permset:assign -n purealoe
sfdx force:data:tree:import --plan ./data/Harvest_Field__c-plan.json
sfdx force:data:tree:import --plan ./data/Merchandise__c-plan.json
sfdx force:org:open -p /lightning/page/home
echo "Org is set up"
