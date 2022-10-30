# Serverless CRUD

This is my test project in which a serverless architecture is implemented using the example of a movie catalog.

The catalog of films is represented by standard СRUD operations, some of them are protected by the custom authorizer.
It's not a real authorizer it's just "authorizer emulation" where we check the user's auth token and allow or disallow
access to the endpoint.

The project was made just for fun and for implemented knowledge of the serverless framework and AWS beautiful technology
stack.

## Development

Serverless offline:

```shell
npm start
```

## Deployment

1. Sign in to AWS console
2. Go to your AWS account overview
3. Account menu in the upper-right (has your name on it)
4. sub-menu: Security Credentials
5. Copy <Access Key ID>
6. Copy <Secret Access Key>
7. Run on local:

```shell
serverless config credentials --provider aws --key <Access Key ID> --secret <Secret Access Key>
```
