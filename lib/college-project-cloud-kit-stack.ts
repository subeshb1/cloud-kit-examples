import * as cdk from '@aws-cdk/core';
import * as codebuild from '@aws-cdk/aws-codebuild';

export class CollegeProjectCloudKitStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const gitHubSource = codebuild.Source.gitHub({
      owner: 'subeshb1',
      repo: 'project-back-end',
      webhook: true, // optional, default: true if `webhookFilters` were provided, false otherwise
      webhookFilters: [
        codebuild.FilterGroup.inEventOf(codebuild.EventAction.PUSH).andBranchIsNot('master'),
      ], // optional, by default all pushes and Pull Requests will trigger a build
    });

    new codebuild.Project(this, 'MyProject', {
      source: gitHubSource,
      environment: {
        buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_3,
        privileged: true

      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: [
              'docker-compose up -d postgres',
              'docker-compose up create-db',
              'docker-compose up test',
            ],
          },
        },
      }),
    });
  }
}
