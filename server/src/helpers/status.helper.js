module.exports = {
  information: {
    continue: 100,
    changingProtocols: 101,
    processing: 102
  },
  success: {
    success: 200,
    created: 201,
    noContent: 204,
    reset: 205,
    partialContent: 206,
    multiStatus: 207
  },
  redirect: {
    multipleChoice: 300,
    moved: 301,
    found: 302,
    checkOthers: 303,
    notChanged: 304,
    useProxy: 305,
    proxySwitch: 306,
    temporaryRedirect: 307,
    permanentRedirect: 308
  },
  clientError: {
    badRequest: 400,
    unauthorized: 401,
    paymentRequired: 402,
    forbidden: 403,
    notFound: 404,
    notAllowed: 405,
    notAcceptable: 406,
    proxyAuthenticatioNeeded: 407,
    timeout: 408,
    generalConflict: 409,
    gone: 410,
    lengthNeeded: 411,
    preConditionFailed: 412,
    requestEntityTooLarge: 413,
    uriTooLarge: 414,
    mediaNotSupported: 415
  },
  serverError: {
    internalError: 500,
    notImplemented: 501,
    badGateway: 502,
    serviceUnavaliable: 503,
    gatewayTimeout: 504,
    httpVersionNotSupported: 505
  }
};
