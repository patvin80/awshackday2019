var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var mapper = require("./personatohelparticle")

exports.personaresult = async( persona ) => {
    //console.log(persona);
    // Create DynamoDB service object
    var params = {
        ExpressionAttributeValues: {
            ':pc' : {S: persona}
        },
        //KeyConditionExpression: 'id = :i',
        ProjectionExpression: 'article_name, publish_date',
        FilterExpression: 'personacat = :pc',
        TableName: 'unarticleslist'
    };
    let result = "Article2";//"https://www.foxnews.com/world/cyclone-fani-india-severe-wind-evacuation-rain-surge-warning"
    result = await ddb.scan(params).promise();
    console.log(result);
    let articleStory = 'www.google.com';
    if (result.Count > 0) {
        articleStory = '';
        result.Items.forEach((data) => {
            articleStory += data.article_name.S;
        });
    }
    return articleStory;

}

exports.personaresultsimul = async( persona ) => {
    console.log(mapper);
    console.log("In dynamodb");
    console.log(mapper.mapper[persona]);
    return mapper.mapper[persona];
}