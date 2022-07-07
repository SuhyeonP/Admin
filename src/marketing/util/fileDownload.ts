import { AxiosResponse } from 'axios';

export function fileDownload(res: AxiosResponse<string>) {
  const temp = document.createElement('a');

  const blob = new Blob([res.data], {
    type: res.headers['content-type'],
  });

  temp.setAttribute('href', URL.createObjectURL(blob));
  // temp.setAttribute('href', URL.createObjectURL(success.data));
  temp.setAttribute(
    'download',
    res.headers['content-disposition']
      .split('filename=')[1]
      .replaceAll('"', ''),
  );
  document.body.appendChild(temp);
  temp.click();
  document.body.removeChild(temp);
}
