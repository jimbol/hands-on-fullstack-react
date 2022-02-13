# Creating a scalable database
## Document DB
AWS offers a scalable database that implements a very similary database to Mongo, its called Document DB. It seems like a natural fit for our application but we're not going to use it today for a few reasons.

- It is expensive. You must allocate servers that run continuously.
- It doesn't auto-scale. You have to manually scale when in need.
- It requires that we set up an entire networking environment.

## Dynamo DB
DynamoDB is the main document-style database offered by AWS. Its super fast, super cheap, scales automatically, and doesnt require the maintainence of any servers. Lets see how we can add Dynamo DB to the project.
