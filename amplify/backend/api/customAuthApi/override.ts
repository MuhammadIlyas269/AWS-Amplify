// This file is used to override the REST API resources configuration
import {
  AmplifyApiRestResourceStackTemplate,
  AmplifyProjectInfo,
} from "@aws-amplify/cli-extensibility-helper";

export function override(
  resources: AmplifyApiRestResourceStackTemplate,
  amplifyProjectInfo: AmplifyProjectInfo
) {
  resources.restApi.description = "Custom Authorizer Amplify demo";

  resources.addCfnParameter(
    { type: "String", description: "Custom authorizer arn", default: "NONE" },
    "authorizerUri",
    {
      "Fn::Join": [
        "",
        [
          "arn:aws:apigateway:",
          { Ref: "AWS::Region" },
          ":lambda:path/2015-03-31/functions/",
          {
            "Fn::GetAtt": ["functioncustomAuthorizerFunction", "Outputs.Arn"],
          },
          "/invocations",
        ],
      ],
    }
  );

  resources.addCfnParameter(
    { type: "String", description: "authorizer role arn", default: "NONE" },
    "authorizerRoleArn",
    {
      "Fn::GetAtt": [
        "functioncustomAuthorizerFunction",
        "Outputs.LambdaExecutionRoleArn",
      ],
    }
  );

  resources.restApi.addPropertyOverride("Body.securityDefinitions", {
    customAuthorizer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      "x-amazon-apigateway-authtype": "custom",
      "x-amazon-apigateway-authorizer": {
        type: "request",
        authorizerUri: { Ref: "authorizerUri" },
        authorizerCredentials: { Ref: "authorizerRoleArn" },
        authorizerResultTtlInSeconds: 0,
        identitySource: "method.request.header.Authorization",
      },
    },
  });
}
