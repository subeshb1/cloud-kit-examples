#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CollegeProjectCloudKitStack } from '../lib/college-project-cloud-kit-stack';

const app = new cdk.App();
new CollegeProjectCloudKitStack(app, 'CollegeProjectCloudKitStack');
