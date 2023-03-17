/**
 * 
 * @param {
 *  page: Текщая страница, 
 *  pageSize: Количество новостей на странице 
 *  totalResults: Всего найдено результатов
 * } params 
 */

export function getSearchMeta(params) {
  const { page, pageSize, totalResults} = params;
  const pageCount = Math.round(totalResults / pageSize);
  const numbers = [];

  if (pageCount <= 10) {
    numbers.push(...new Array(pageCount).fill(0).map((el, idx) => el + idx));
  } else {
    if (page - 3 <= 1) {
      numbers.push(1, 2, 3, 4, 5, 6, 7, 8, 9, null, pageCount)
    } else {
      const base = page - 3;
      numbers.push(1, null, ...new Array(7).fill(base).map((el, index) => el + index), null, pageCount);
    }
  }

  return numbers
}