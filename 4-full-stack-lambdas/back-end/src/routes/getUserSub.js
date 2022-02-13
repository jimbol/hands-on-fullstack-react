export const getUserSub = (req) => {
  let userSub = req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1]
  return userSub;
}
