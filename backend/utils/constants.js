const REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const SECRET_JWT = 'new secret key';

const allowedCors = [
  'https://praktikum.tk',
  'http://localhost:3000',
  'http://pioneer.students.nomoredomains.icu',
  'http://settler.students.nomoredomains.icu',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  SECRET_JWT,
  REGEX,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
