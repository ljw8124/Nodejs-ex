// 핸들바의 장점이자 단점은 자유도가 높다
// each 와 if 등 기본적인 함수는 제공하지만,
// 그 이외의 것은 모두 만들어서 커스텀 함수로 사용해야 한다.
// 커스텀 함수를 만드는 방법은 아래와 같다.

module.exports = {
  // 리스트 길이를 구함
  lengthOfList: (list = []) => list.length,

  // 두 값을 비교해 같은지 여부를 반환
  eq: (val1, val2) => val1 === val2,

  // ISO 날짜 문자열에서 날짜만 반환
  dateString: (isoString) => new Date(isoString).toLocaleDateString(),
};

// 헬퍼 함수 사용 시에는 {{헬퍼 함수명 변수1 변수2 ... 변수n}} 형식으로 가장 처음에 함수명을 넣고 다음으로는 변수들을 빈 칸으로 구분해준다.
// 헬퍼 함수 안에서 다시 헬퍼 함수를 사용해야 하는 경우 {{헬퍼 함수1 (헬퍼 함수2 변수1 변수2) 변수11}} 처럼 {{ }} 기호 안에 () 기호로 감싸준다.

// ex) {{lengthOfList comments}} 개의 댓글이 있습니다.
// 작성일시: {{dateString createdDt}}
// {{#if (eq. @root.paginator.page)}}eq 테스트{{/if}}
// 여기서 .과 @root 는 각각 현재 객체와 최상위 객체를 의미한다.