export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function notFound(message = "Recurso não encontrado") {
  return new ApiError(404, "not_found", message);
}

export function badRequest(message = "Requisição inválida") {
  return new ApiError(400, "bad_request", message);
}
