import React from 'react';

// style
import { RoundButton } from '../sharedStyle';

export const CountDownButton = ({
  onClick,
  isDisabled,
}: {
  onClick: () => void;
  isDisabled: any;
}) => (
  <RoundButton onClick={onClick} disabled={isDisabled}>
    ー
  </RoundButton>
);
