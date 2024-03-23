'use client'

import type { ReactElement } from 'react';

type BaseButtonProps = {
  color: string
  hoverColor: string
  textColor: string
  onClick: () => void
  disabled?: boolean
  text: string
  extraClasses?: string
}

export default function BaseButton(props: BaseButtonProps): ReactElement {
  return (
    <button
      className={`btn ${props.color} ${props.hoverColor} ${props.textColor} glass ${props.extraClasses}`}
      onClick={() => {props.onClick()}}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
