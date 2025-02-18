import { FastifyReply, FastifyRequest } from "fastify";
import { ApiException } from "../../utils/exception.js";

type FastifyErrorType = {
  code: string;
  statusCode: number;
  message: string;
} & Error;

export default function ErrorHandler(
  error: ApiException | Error | FastifyErrorType,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  console.log(error);
  if (error instanceof ApiException || isFastifyError(error)) {
    const { code, statusCode, message } = error;
    return reply.code(statusCode).send({
      statusCode,
      code,
      message,
    });
  }

  reply.code(500).send({
    statusCode: 500,
    code: "Internal Server Error",
    message: "The request failed due to an internal error.",
  });
}

function isFastifyError(error: Error): error is FastifyErrorType {
  return Object.hasOwn(error, "code") && Object.hasOwn(error, "statusCode");
}
