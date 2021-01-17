import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import TabPanel from "./TabPanel";
import "./Tabs.css";

interface ITabs {
  name: string;
  children: JSX.Element | JSX.Element[];
}

const Tabs = ({ name, children }: ITabs) => {
  const location = useLocation();
  let history = useHistory();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabList: HTMLAnchorElement[] = [];

  const getTabName = (hashName: string) => hashName.match(/[a-zA-Z]+/g)?.join();

  const getTabIndex = (hashName: string) =>
    parseInt(hashName.replace(/^\D+/g, ""));

  useEffect(() => {
    const urlTabName = getTabName(location.pathname);
    if (urlTabName && urlTabName === name) {
      const urlTabIndex = getTabIndex(location.pathname);
      if (
        !isNaN(urlTabIndex) &&
        urlTabIndex < React.Children.count(children) &&
        urlTabIndex !== selectedIndex
      ) {
        setSelectedIndex(urlTabIndex);
      }
    }
  }, [location, children, name, selectedIndex]);

  const handleClick = (event: React.MouseEvent, index: number) => {
    setSelectedIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
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
        history.push(`/${name}-${newIndex}`);
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

  const renderTabPanels = React.Children.map(children, (tab, index) => (
    <TabPanel controlName={`${name}-${index}`} hidden={index !== selectedIndex}>
      {tab.props.children}
    </TabPanel>
  ));

  return (
    <div className="tab-container">
      <ul role="tablist">{renderTabsWithProps}</ul>
      {renderTabPanels}
    </div>
  );
};

export default Tabs;
