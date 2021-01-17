import React from "react";

interface ITab {
  label: string;
  index?: number;
  children: JSX.Element | JSX.Element[];
  disabled?: boolean;
  isActive?: boolean;
  tabIndex?: number;
  tabName?: string;
  tabRef?: () => {};
  handleClick?: (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {};
  handleKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {};
}

const Tab = ({
  label,
  index,
  disabled,
  isActive,
  tabIndex,
  tabName,
  tabRef,
  handleClick,
  handleKeyDown,
}: ITab) => {
  return (
    <li role="presentation">
      <a
        id={`${tabName}-${index}`}
        href={`#${tabName}-${index}`}
        role="tab"
        aria-selected={isActive}
        aria-controls={`${tabName}-${index}-tab`}
        onClick={(event) => {
          if (disabled) return;
          if (handleClick && index !== undefined) handleClick(event, index);
        }}
        onKeyDown={(event) => {
          if (disabled) return;
          if (handleKeyDown && index !== undefined) handleKeyDown(event, index);
        }}
        tabIndex={tabIndex}
        ref={tabRef}
      >
        {label}
      </a>
    </li>
  );
};

export default Tab;
