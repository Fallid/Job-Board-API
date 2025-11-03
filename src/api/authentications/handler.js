const autoBind = require('auto-bind');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, validator, tokenManager) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._validator = validator;
    this._tokenManager = tokenManager;
    autoBind(this);
  }

  async postAuthenticationHandler(request, h) {
    this._validator.validatePostAuthenticationPayload(request.payload);

    const { username, password } = request.payload;

    // Verify user credential
    const { id, role } = await this._usersService.verifyUserCredential({ username, password });

    // Generate access token and refresh token
    const accessToken = this._tokenManager.generateAccessToken({ id, username, role });
    const refreshToken = this._tokenManager.generateRefreshToken({ id, username, role });

    // Save refresh token to database
    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

}

module.exports = AuthenticationsHandler;