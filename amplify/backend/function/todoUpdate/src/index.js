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
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");

const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {
  //   console.log(`EVENT: ${JSON.stringify(event)}`);
  let statusCode = 0;
  let responseBody = "";
  const id = event.pathParameters.id;

  try {
    const command = new UpdateItemCommand({
      TableName: "Todo-dev",
      Key: marshall({ id }),
      UpdateExpression: "set completed = :cm, title = :tl, description = :des",
      ExpressionAttributeValues: marshall({
        ":cm": completed,
        ":tl": title,
        ":desc": description,
      }),
    });

    const data = await client.send(command);
    const item = unmarshall(data.Item);
    statusCode = 200;
    responseBody = JSON.stringify(item);
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
