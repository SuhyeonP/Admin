const getTitle = {
  admin: {
    label: 'admin',
    sub: {
      'admin-setting': '관리자 설정',
    },
  },
  company: {
    label: '기업',
    sub: {
      list: '기업 조회',
      detail: '기업 상세',
    },
  },
  member: {
    label: '회원',
    sub: {
      list: '회원 조회',
      detail: '회원 상세',
    },
  },
  operation: {
    label: '운영',
    sub: {
      'send-email': {
        sub: {
          list: '이메일 발송',
          create: '신규 이메일 발송',
          detail: '이메일 발송 내역 상세',
        },
      },
      'email-template': {
        sub: {
          edit: '이메일 템플릿 편집',
          list: '이메일 템플릿',
        },
      },
      deployment: {
        sub: {
          detail: '버전 상세',
          list: '버전 관리',
        },
      },
    },
  },
};

function checkInclude(str: string): string {
  if (str.includes('edit')) {
    return 'edit';
  } else if (str.includes('detail')) {
    return 'detail';
  } else {
    return str;
  }
}

export function getTitleWithLabel(split: string[]): string[] {
  const temp: string[] = [];
  const main = getTitle[split[0]];
  const checkSub = checkInclude(split[1]);
  const sub = main.sub[checkSub];

  temp.push(main.label);

  if (split.length === 3) {
    temp.push(sub.sub['list']);

    if (split[2] !== 'list') {
      temp.push(sub.sub[checkInclude(split[2])]);
    }
  } else {
    temp.push(sub);
  }

  return temp;
}
