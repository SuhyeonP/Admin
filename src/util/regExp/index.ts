export const emailRegExp = new RegExp(
  /^[a-zA-Z0-9+-_.]+@[a-zA-Z-]+\.[a-zA-Z-.]+$/,
);
// todo check email @ 이후 원래는 숫자 있는거에서 숫자 뺏는데 그게 맞는지

export const nameCheck = new RegExp(/[가-힣a-zA-Z]/g);
export const pnCheck = new RegExp(/^\d{2,3}\d{3,4}\d{4}/g);
export const checkDetail = new RegExp(/detail/g);

export const lastNameCheck = new RegExp(/^[가-힣a-zA-Z]{1,10}$/g);
export const firstNameCheck = new RegExp(/^[가-힣a-zA-Z]{1,10}$/g);
export const pnc = new RegExp(/^[\S]{9,30}$/);
// export const length30 = new RegExp(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,30}$/);
export const length30 = new RegExp(/^[가-힣a-zA-Z\W]{1,30}$/);

// export const length50 = new RegExp(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,50}$/);
export const length50 = new RegExp(/^[가-힣a-zA-Z\W0-9]{1,50}$/);

export const checkNameError = (ln: string, fn: string) => {
  const lnc = new RegExp(/^[가-힣a-zA-Z]{1,10}$/g);
  const fnc = new RegExp(/^[가-힣a-zA-Z]{1,10}$/g);

  return [!lnc.test(ln), !fnc.test(fn)];
};
