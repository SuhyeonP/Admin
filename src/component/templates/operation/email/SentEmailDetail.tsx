import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SentEmailDetail = (): JSX.Element => {
  const params = useParams().sentMailId;
  const navigate = useNavigate();

  const [emailId, setEmailId] = React.useState<number>(-1);

  React.useEffect(() => {
    if (!isNaN(Number(params))) {
      setEmailId(Number(params));
    } else {
      navigate('/operation/send-email/list');
    }
  }, []);

  return (
    <>
      <div>
        <p>test</p>
        <p>email id {emailId}</p>
      </div>
    </>
  );
};

export default SentEmailDetail;
