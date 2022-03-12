import React from 'react';

export const Foods: React.VFC<{ match: any }> = ({ match }: { match: any }) => {
  console.log(match);
  return (
    <>
      フード一覧
      <p>
        restaurantsIdは
        {match.params.restaurantsId || ''}
        です
      </p>
    </>
  );
};
