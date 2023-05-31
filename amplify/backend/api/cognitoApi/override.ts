// This file is used to override the REST API resources configuration
import {
  AmplifyApiRestResourceStackTemplate,
  AmplifyProjectInfo,
} from "@aws-amplify/cli-extensibility-helper";
export function override(
  resources: AmplifyApiRestResourceStackTemplate,
  amplifyProjectInfo: AmplifyProjectInfo
) {
  resources.addCfnParameter(
    {
      type: "String",
      description: "The Id of the exsiting cognito pool",
      default: "NONE",
    },
    "AuthCognitoUserPoolId",
    { "Fn::GetAtt": ["authtodoilyase1510957", "Outputs.UserPoolId"] }
  );
  resources.addCfnParameter(
    { type: "String", description: "Custom authorizer arn", default: "NONE" },
    "functionUri",
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

  resources.restApi.addPropertyOverride("Body.securityDefinitions", {
    CognitoAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      "x-amazon-apigateway-authtype": "cognito_user_pools",
      "x-amazon-apigateway-authorizer": {
        type: "cognito_user_pools",
        providerARNs: [
          {
            "Fn::Join": [
              "",
              [
                "arn:aws:cognito-idp:",
                { Ref: "AWS::Region" },
                ":",
                { Ref: "AWS::AccountId" },
                ":userpool/",
                { Ref: "AuthCognitoUserPoolId" },
              ],
            ],
          },
        ],
      },
    },
  });

  resources.restApi.addPropertyOverride("Body.paths.v1", {
    get: {
      produces: ["application/json"],
      consumes: ["application/json"],
      parameters: [
        {
          name: "v1",
          in: "path",
          required: true,
          type: "string",
        },
      ],
      responses: {},
      "x-amazon-apigateway-integration": {
        uri: { Ref: "functionUri" },
        httpMethod: "GET",
        type: "aws_proxy",
      },
    },
  });
  //   resources.addCfnResource(
  //     {
  //       type: "AWS::ApiGateway::Resource",
  //       properties: {
  //         RestApiId: resources.restApi.attrRestApiId,
  //         ParentId: resources.restApi.attrRootResourceId,
  //         PathPart: "items",
  //       },
  //     },
  //     "v1Resource"
  //   );
  //   resources.addCfnResource(
  //     {
  //       type: "AWS::ApiGateway::Method",
  //       properties: {
  //         HttpMethod: "GET",
  //         Integration: {
  //           Type: "HTTP_PROXY",
  //           IntegrationHttpMethod: "GET",
  //           Uri: {
  //             Ref: "functionUri",
  //           },
  //         },
  //         RestApiId: resources.restApi.attrRestApiId,
  //         ResourceId: { Ref: "v1Resource" },
  //         AuthorizationType: "NONE",
  //       },
  //     },
  //     "v1ResourceMethod"
  //   );
}
