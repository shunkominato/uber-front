import React from 'react';

// style
import { RoundButton } from '../sharedStyle';

export const CountUpButton = ({
  onClick,
  isDisabled,
}: {
  onClick: () => void;
  isDisabled: any;
}) => (
  <RoundButton onClick={onClick} disabled={isDisabled}>
    ＋
  </RoundButton>
);
