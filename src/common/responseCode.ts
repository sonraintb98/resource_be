export class ResponseCode {
  public static readonly SUCCESS = new ResponseCode('1', 'success', 'success');
  public static readonly FAILURE = new ResponseCode('0', 'failure', 'failure');

  private constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly description,
  ) {}
}
