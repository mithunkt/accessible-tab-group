import React, { useState } from "react";
import "./Tabs.css";

interface ITabs {
  name: string;
  children: JSX.Element | JSX.Element[];
}

const Tabs = ({ name, children }: ITabs) => {
  const hash = window.location.hash;
  const hashName = hash.match(/[a-zA-Z]+/g)?.join();
  let initIndex = 0;

  if (hash !== "" && hashName === name) {
    const hashIndex = parseInt(hash.replace(/^\D+/g, ""));
    if(!isNaN(hashIndex) && hashIndex < React.Children.count(children)) {
      initIndex = hashIndex
    }
  }

  const [selectedIndex, setSelectedIndex] = useState(initIndex);
  const tabList: HTMLAnchorElement[] = [];

  const handleClick = (event: any, index: number) => {
    setSelectedIndex(index);
  };

  const handleKeyDown = (event: any, index: number) => {
    let newIndex;
    const tabCount = React.Children.count(children);
    switch (event.key) {
      case "ArrowLeft":
        newIndex = index - 1 >= 0 ? index - 1 : tabCount - 1;
        break;
      case "ArrowRight":
        newIndex = index + 1 < tabCount ? index + 1 : 0;
        break;
      case "Home":
        newIndex = 0;
        break;
      case "End":
        newIndex = tabCount - 1;
        break;
      default:
        break;
    }
    if (newIndex !== undefined) {
      setSelectedIndex(newIndex);
      if (tabList[newIndex]) {
        tabList[newIndex].focus();
      }
    }
  };

  const renderTabsWithProps = React.Children.map(children, (tab, index) => {
    const isActive = index === selectedIndex;
    const tabIndex = isActive ? 0 : -1;
    const newTab = React.cloneElement(tab, {
      index,
      handleClick,
      handleKeyDown,
      tabIndex,
      tabName: name,
      isActive,
      tabRef: (e: any) => {
        tabList.push(e);
      },
    });

    return newTab;
  });

  const renderTabContent = React.Children.map(children, (tab, index) => (
    <div
      id={`${name}-${index}-tab`}
      tabIndex={0}
      role="tabpanel"
      aria-labelledby={`${name}-${index}`}
      hidden={index !== selectedIndex}
    >
      {tab.props.children}
    </div>
  ));

  return (
    <div className="tab-container">
      <ul role="tablist">{renderTabsWithProps}</ul>
      {renderTabContent}
    </div>
  );
};

export default Tabs;
