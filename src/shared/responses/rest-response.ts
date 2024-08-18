import { ResponseCode } from 'src/common/responseCode';
import { Pagination } from 'src/common/';

export function restResponse(responseCode: ResponseCode, data?: any) {
  return {
    code: responseCode.code,
    message: [responseCode.message],
    data: data,
  };
}

export function successResponse(
  data?: any,
  customMessage?: string,
  pagination?: Pagination,
) {
  return {
    code: ResponseCode.SUCCESS.code,
    message: !customMessage ? [ResponseCode.SUCCESS.message] : [customMessage],
    data: data,
    pagination: {
      total: Number(pagination?.total),
      page: Number(pagination?.page),
      limit: Number(pagination?.limit),
    },
  };
}

export function failureResponse(
  data?: any,
  customMessage?: string,
  pagination?: Pagination,
) {
  return {
    code: ResponseCode.FAILURE.code,
    message: !customMessage ? [ResponseCode.FAILURE.message] : [customMessage],
    data: data,
    pagination: {
      total: Number(pagination?.total),
      page: Number(pagination?.page),
      limit: Number(pagination?.limit),
    },
  };
}

export function successResponseWithoutPagination(
  data?: any,
  customMessage?: string,
) {
  return {
    code: ResponseCode.SUCCESS.code,
    message: !customMessage ? [ResponseCode.SUCCESS.message] : [customMessage],
    data,
  };
}

export function failureResponseWithoutPagination(
  data?: any,
  customMessage?: string,
) {
  return {
    code: ResponseCode.FAILURE.code,
    message: !customMessage ? [ResponseCode.FAILURE.message] : [customMessage],
    data,
  };
}
