# AWS Hack Day Experience - AWS Washington DC Meetup

## Presented by  [Vinit Patankar](www.linkedin.com/in/pvinit) and [Robert Donovan](https://www.linkedin.com/in/robertbdonovan/)

# Team Objectives / Problem Selection Metrics

As a team, we wanted to collaborate on a Problem that would help us develop solution which could address the following objectives:

### Techincal Objectives
1. AI / Machine Learning Challenge
2. Serverless Solution

### Business Objectives
1. Be Actionable
2. Be a relatively short term solution. 

## Problem

### Decisions
1. Rejected Problems which tend to focus on Voice Bots. 
2. Rejected Problems which only wanted a Technical Upgrade.

***

**UNHCR wanted to the Teams to evaluate News and Media articles and present them capabilities to:**
1. Engages Americans in support of the world’s 68.5 million displaced people. 
2. Help enhance website with the ability for two-way communications that inspires interest, engenders empathy and allows Americans to more easily engage on refugee issues.
***

# Idea Phase

## "Found the Tech Stack / Lets do it Phase"

### Approach: 
1. Process the news articles through an Entity Detection Model - [AWS Comprehend](https://aws.amazon.com/comprehend/) and categorize the news appropriately say by Country
2. Distribute the News based upon Country or Nationality identified in the Entity Detection Module.

### Challenges:
1. Did not resonate with the Problem Statement.
2. Did not align with "Actionable Business Objective"
3. Client already had done that.

## Back to the Drawing Board

Agile Practices at its best. Only when you manage your own budget / Blank Check

1. "Engages Americans in support" - What stories are important to people? 
2. Categorize Donors or Individuals into Personas 
    - Family
    - Empathy for Violence
    - Religion
    - Health and Well Being

### Challenges / Decisions

| Challenge | Decision |
|--- | --- |
| Custom Model Development |  [Custom Comprehend Model](https://docs.aws.amazon.com/comprehend/latest/dg/auto-ml.html) |
| Actionable Donation  | [Gifts for Refugees](https://www.unrefugees.org/gifts/) |

# Sprint Planning

| Phase | Objective | Fallback |
|--- | --- | --- |
| [Model Development](#model---comprehend-custom-entity-modeling) |  Categorize a news Article based upon the Custom Comprehend Model | None | 
| [Integration Endpoint](#integration-endpoint---serverless-application-model) | React Frontend | API |
| [Proposal](#presentation) | Powerpoint Deck | None |

# Implementation

## Model - Comprehend Custom Entity Modeling

Detailed steps about the Custom Entity Modeling are availabe [here](https://docs.aws.amazon.com/comprehend/latest/dg/cer-entity-list.html)
1. Prepared a document with a list of values which we were looking for.
2. The model needs a lot of training data so be prepared.
3. Setup a Custom Classifier Job on the AWS Comprehend Console
4. Start the Detection Job using [start-entities-detection-job](https://docs.aws.amazon.com/cli/latest/reference/comprehend/start-entities-detection-job.html) CLI 

```
aws comprehend start-entities-detection-job \
            --entity-recognizer-arn "arn:aws:comprehend:us-east-1:013730889080:entity-recognizer/PersonaRecognizerFamily6" \ 
            --job-name IndiaFloodsDataFamily --data-access-role-arn "arn:aws:iam::013730889080:role/service-role/AmazonComprehendServiceRole-aws-hack-day-s3role" \ --language-code en \
            --input-data-config "S3Uri=s3://aws-devday-hack-team7/IndiaFloods.txt" \
            --output-data-config "S3Uri=s3://aws-devday-hack-team7/indiafloodresults" --region us-east-1
```
5. Review the [results](/Comprehend/Results/indiafloods.json)

```
{
    "Entities": [
        {
            "BeginOffset": 520,
            "EndOffset": 524,
            "Score": 0.7068798542022705,
            "Text": "huts",
            "Type": "FAMILY"
        },
        {
            "BeginOffset": 551,
            "EndOffset": 559,
            "Score": 0.7578069567680359,
            "Text": "orchards",
            "Type": "FAMILY"
        },
        {
            "BeginOffset": 1065,
            "EndOffset": 1071,
            "Score": 0.5238461494445801,
            "Text": "places",
            "Type": "FAMILY"
        },
        {
            "BeginOffset": 1098,
            "EndOffset": 1102,
            "Score": 0.5044220089912415,
            "Text": "navy",
            "Type": "FAMILY"
        },
        {
            "BeginOffset": 1615,
            "EndOffset": 1620,
            "Score": 0.514423668384552,
            "Text": "towns",
            "Type": "FAMILY"
        }
    ],
    "File": "IndiaFloods.txt",
    "Line": 0
}
```

## Integration Endpoint - [Serverless Application Model](https://github.com/awslabs/serverless-application-model)

**Time Crunch!!! Be Agile. FALLBACK!!!**
Decided to build an AWS API Gateway/ Lambda Serverless Solution to simulate the front end.

Request:
```
curl -X POST \
  https://f260tabrs0.execute-api.us-east-1.amazonaws.com/Prod/personadonator \
  -H 'Content-Type: application/json' \
  -H 'Host: f260tabrs0.execute-api.us-east-1.amazonaws.com' \
  -H 'cache-control: no-cache' \
  -d '{"persona": "VIOLENCE"}'
```

Response:
```
{
    "newsArticle": "https://www.aljazeera.com/news/2019/05/killings-wave-arrests-syria-deraa-190521195046560.html",
    "donateLink": "https://www.unrefugees.org/gifts/all-gifts/therapeutic-food/",
    "story": "The 11 deaths that took place from July 26, 2018, to March 13, 2019, included fatal drive-by shootings, the UN rights office said in a report."
}
```

# Presentation

The presentation we did for the judges and client is [here](/Presentation/Pitch_UNHCR.pptx)

# Featured AWS Services 

## AWS Comprehend - Custom Entity Modeling

1. Enables extending the Out of the Box Model Provided by AWS.
2. Faciliates Business or Domain Specific Recategorization of the Data. Amazon offers a [Comprehend Medical Service](https://console.aws.amazon.com/comprehend/v2/home?region=us-east-1#welcome). 
3. Bold Statement - Eliminates Bias from a Service Provider.

## Serverless Application Model

1. Benefits of SAM - Unit Testable Lambda Function Starter Kit
```
 npm test 
```
2. Works with CloudFormation to Simplify Deployment Pipelines. #DevOps
```
sam package \
    --template-file template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket aws-devday-hack-team7

sam deploy \
    --template-file packaged.yaml \
    --stack-name persona-donator-node \
    --capabilities CAPABILITY_IAM
``` 
3. My Advice - Stop Writing Lambda functions in AWS Console.
```
sam init --help
```

