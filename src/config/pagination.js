
const configPagination = {
	totalDocs: 'totalItems',
    docs: 'data',
    limit: 'pageSize',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'totalPages',
    pagingCounter: 'slNo',
    meta: 'paginator',
}

const getPagination = (page, size) => {
  const limit = size ? +size : process.env.PAGE_SIZE;
  const offset = page ? page * limit : 0;

  return { limit, offset, customLabels: configPagination };
};

module.exports.getPagination = getPagination