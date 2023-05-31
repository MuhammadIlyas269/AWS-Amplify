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
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {
  //   console.log(`EVENT: ${JSON.stringify(event)}`);
  let statusCode = 0;
  let responseBody = "";
  const body = JSON.parse(event.body);
  const dateString = new Date().toString();
  const id = Math.random().toString();
  const item = {
    id,
    ...body,
    createdAt: dateString,
  };

  try {
    const input = {
      TableName: "Todo-dev",
      Item: marshall(item),
    };
    const command = new PutItemCommand(input);
    await client.send(command);
    statusCode = 200;
    responseBody = JSON.stringify("Item created successfully");
  } catch (err) {
    responseBody = `Unable to get Products: ${err}`;
    statusCode = 403;
  }
  return {
    statusCode: statusCode,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(responseBody),
  };
};
