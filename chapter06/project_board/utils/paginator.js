const lodash = require("lodash");
const PAGE_LIST_SIZE = 10;

// 게시물의 총 개수, 현재 페이지, 한 페이지당 표시하는 게시물 개수
module.exports = ({ totalCount, page, perPage = 10 }) => {
 const PER_PAGE = perPage;
 const totalPage = Math.ceil(totalCount / PER_PAGE);    // 총 페이지 수 계산

  // 시작 페이지: 몫 * PAGE_LIST_SIZE + 1
  let quotient = parseInt(page / PAGE_LIST_SIZE);

  if(page % PAGE_LIST_SIZE === 0) {
    quotient -= 1;  // 현재 page 가 딱 10의 배수일 때를 고려한 상황
  }

  const startPage = quotient * PAGE_LIST_SIZE + 1;    // 시작페이지 구하기 => 현재 페이지를 PAGE_LIST_SIZE 로 나눈 몫에 +1 을 함

  // 끝 페이지: startPage + PAGE_LIST_SIZE - 1
  const endPage = startPage + PAGE_LIST_SIZE - 1 < totalPage ? startPage + PAGE_LIST_SIZE - 1 : totalPage;

  const isFirstPage = page === 1;
  const isLastPage = page === totalPage;
  const hasPrev = page > 1;
  const hasNext = page < totalPage;

  const paginator = {
    // 표시할 페이지 번호 리스트를 만들어줌
    pageList: lodash.range(startPage, endPage + 1),   // lodash.range() 함수를 이용하여 리스트를 리턴함
    page,
    prevPage: page - 1,
    nextPage: page + 1,
    startPage,
    lastPage: totalPage,
    hasPrev,
    hasNext,
    isFirstPage,
    isLastPage,
  };

  return paginator;
}