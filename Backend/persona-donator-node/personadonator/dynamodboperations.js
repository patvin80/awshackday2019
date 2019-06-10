var AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var mapper = require("./personatohelparticle")

exports.personaresult = async( persona ) => {
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
    let result = "https://www.foxnews.com/world/cyclone-fani-india-severe-wind-evacuation-rain-surge-warning"
    ddb.scan(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Items);
            data.Items.forEach(function(element, index, array) {
                return element.article_name;
            });
        }
    });
    return result;
}

exports.personaresultsimul = async( persona ) => {
    console.log(mapper);
    console.log("In dynamodb");
    console.log(mapper.mapper[persona]);
    return mapper.mapper[persona];
}