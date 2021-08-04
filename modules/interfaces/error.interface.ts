export default interface IError {
  message?: string | string[];
  status?: number;
  errors?: Array<Duplicate>;
  kind?: string;
  code?: number;
  keyValue?: {
    username?: string;
  };
}

type Duplicate = {
  properties?: { message?: string };
};

export const Validate = function (message: string, status: number) {
  return {
    message: message,
    status: status,
  };
};
