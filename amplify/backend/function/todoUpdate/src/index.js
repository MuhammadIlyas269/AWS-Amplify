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
  const id = event.pathParameters.proxy;
  console.log(".....", id);
  const { title, description, completed = "false" } = JSON.parse(event.body);
  console.log(".........", title, description, completed);

  try {
    const command = new UpdateItemCommand({
      TableName: "Todo-dev",
      Key: marshall({ id }),
      UpdateExpression: "set completed = :cm, title = :tl, description = :des",
      ExpressionAttributeValues: marshall({
        ":cm": completed,
        ":tl": title,
        ":des": description,
      }),
      ReturnValues: "ALL_NEW",
    });

    const data = await client.send(command);
    console.log("......", data);
    // const item = unmarshall(data.Item);
    statusCode = 200;
    responseBody = "Updated Successfully";
  } catch (err) {
    responseBody = `Unable to get Products: ${err}`;
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
