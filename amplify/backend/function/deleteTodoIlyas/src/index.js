/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_TODOILYAS_ARN
	STORAGE_TODOILYAS_NAME
	STORAGE_TODOILYAS_STREAMARN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const {
  DynamoDBClient,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {
  // console.log(`EVENT: ${JSON.stringify(event)}`);
  let statusCode = 0;
  let responseBody = "";
  try {
    const input = {
      TableName: "Todo-dev",
      Key: marshall({ id: event.pathParameters.id }),
    };
    const command = new DeleteItemCommand(input);
    await client.send(command);
    statusCode = 200;
    responseBody = "Success";
  } catch (error) {
    responseBody = `Unable to get Products: ${error}`;
    statusCode = 403;
  }
  return {
    statusCode: statusCode,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(responseBody),
  };
};
