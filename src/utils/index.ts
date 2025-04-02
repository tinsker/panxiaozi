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

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
