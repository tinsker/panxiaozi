export const getTotalPages = (total: number, pageSize: number) => {
  let totalPages = total / pageSize;
  if (total > 0) {
    if (!Number.isInteger(totalPages)) {
      totalPages = Math.ceil(totalPages);
    } else {
      totalPages = Number.parseInt(totalPages + "", 10);
    }
  }
  return totalPages;
}
