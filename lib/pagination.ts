export const PAGE_SIZE = 24;

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = (page - 1) * pageSize;
  return {
    page,
    totalPages,
    items: items.slice(start, start + pageSize)
  };
}
