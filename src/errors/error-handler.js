import { ApiError } from "./api-error";
import { ERROR_MESSAGES } from "/constants";

const ERRO_GENERICO = {
  statusCode: 500,
  message: ERROR_MESSAGES.ERRO_PADRAO,
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err);
  } else {
    console.error(err);
    res.status(ERRO_GENERICO.statusCode).json(ERRO_GENERICO);
  }
};

export { errorHandler };
