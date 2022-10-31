interface Pagination {
  page: number;
  amount: number;
  offset?: number;
}

function validPagination({ page, amount }: Pagination): Pagination {
  const pagination: Pagination = { page, amount };

  pagination.page = pagination.page ? pagination.page : 1;
  pagination.amount = pagination.amount ? pagination.amount : 50;
  pagination.offset = (pagination.page - 1) * pagination.amount;

  return pagination;
}

export { validPagination };