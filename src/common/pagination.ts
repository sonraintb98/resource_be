import { CONST } from './constants';

export class Pagination {
  total: number;
  page: number;
  limit: number;

  constructor() {
    this.total = 0;
    this.page = CONST.DEFAULT_START_PAGE;
    this.limit = CONST.DEFAULT_PAGE_LIMIT;
  }
}
