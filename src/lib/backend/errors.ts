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

export function unauthorized(message = "Autenticação necessária") {
  return new ApiError(401, "unauthorized", message);
}

export function forbidden(message = "Você não tem permissão para executar esta ação") {
  return new ApiError(403, "forbidden", message);
}
