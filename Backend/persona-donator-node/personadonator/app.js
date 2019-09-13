
const axios = require('axios')
const url = 'http://checkip.amazonaws.com/';
var AWS = require("aws-sdk");
var dynamodbops = require("./dynamodboperations");
let response;
var mapper = require("./personatodonate");
var mapper2 = require('./personatostory');
var mapper3 = require('./personatohelparticle');
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {string} event.resource - Resource path.
 * @param {string} event.path - Path parameter.
 * @param {string} event.httpMethod - Incoming request's method name.
 * @param {Object} event.headers - Incoming request headers.
 * @param {Object} event.queryStringParameters - query string parameters.
 * @param {Object} event.pathParameters - path parameters.
 * @param {Object} event.stageVariables - Applicable stage variables.
 * @param {Object} event.requestContext - Request context, including authorizer-returned key-value pairs, requestId, sourceIp, etc.
 * @param {Object} event.body - A JSON string of the request payload.
 * @param {boolean} event.body.isBase64Encoded - A boolean flag to indicate if the applicable request payload is Base64-encode
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 * @param {string} context.logGroupName - Cloudwatch Log Group name
 * @param {string} context.logStreamName - Cloudwatch Log stream name.
 * @param {string} context.functionName - Lambda function name.
 * @param {string} context.memoryLimitInMB - Function memory.
 * @param {string} context.functionVersion - Function version identifier.
 * @param {function} context.getRemainingTimeInMillis - Time in milliseconds before function times out.
 * @param {string} context.awsRequestId - Lambda request ID.
 * @param {string} context.invokedFunctionArn - Function ARN.
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * @returns {boolean} object.isBase64Encoded - A boolean flag to indicate if the applicable payload is Base64-encode (binary support)
 * @returns {string} object.statusCode - HTTP Status Code to be returned to the client
 * @returns {Object} object.headers - HTTP Headers to be returned
 * @returns {Object} object.body - JSON Payload to be returned
 * 
 */
exports.personaget = async (event, context) => {
    try {

        const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                newlist: 'hello world',
                location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

exports.personapost = async (event, context) => {
    try {   
        var  jsonBody = JSON.parse(event.body);
        let newsArticle
        // let newsArticleResult = await dynamodbops.personaresult(jsonBody.persona);
        // console.log(newsArticleResult);
        // newsArticleResult((err, data) => {
        //     if (err) {
        //         console.log("Error", err);
        //     } else {
        //         console.log("Success", data.Items);
        //         data.Items.forEach(function(element, index, array) {
        //             console.log(element.article_name);
        //         });
        //     }
        // });
        //let newsArticleResult = await dynamodbops.personaresultsimul(jsonBody.persona);
        //console.log(result);\
        var newsArticleResult = mapper3.mapper[jsonBody.persona];
        var donateLinkResult =  mapper.mapper[jsonBody.persona];
        var personaStory = mapper2.mapper[jsonBody.persona];
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                newsArticle: newsArticleResult,
                donateLink: donateLinkResult,
                story: personaStory 

            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};