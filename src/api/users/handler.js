const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postUserHandler(request, h) {
    this._validator.userValidationPostPayload(request.payload);
    const { username, password, fullname, role } = request.payload;

    const userId = await this._service.addUser({ username, password, fullname, role });

    const response = h.response({
      status: 'success',
      message: 'User successfully added',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

}

module.exports = UsersHandler;
