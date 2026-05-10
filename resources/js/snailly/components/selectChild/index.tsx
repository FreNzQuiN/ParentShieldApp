import ChevronBottom from '@/assets/chevronBottom';
import ChildFace from '@/assets/childFace';
import SearchIcon from '@/assets/search';
import { zustand } from '@/services';
import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  sChildListContainer,
  sChildrenListWrapper,
  sChildSearchIcon,
  sChildSearchWrapper,
  sSelectChildBoxContainer,
  sSelectChildChevron,
  sSelectChildIcon,
  sSelectChildPreview,
  sSelectChildPreviewBox,
  sSelectChildPreviewChildName,
  sSelectChildPreviewLabel,
  sSelectChildWrapper,
} from './styles';

const SelectChild = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchChild, setSearchChild] = useState('');
  const { selectedChildId, setSelectedChildId, childrenList } = zustand();

  const DEFAULT_CHILDREN_LIST = [
    {
      id: '',
      name: 'All',
    },
  ];

  const filterChildList = useCallback(() => {
    if (searchChild)
      return childrenList.filter((child) =>
        child.name.toLowerCase().includes(searchChild.toLowerCase())
      );
    else {
      return [...DEFAULT_CHILDREN_LIST, ...childrenList];
    }
  }, [searchChild, childrenList]);

  const onSearchChild = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchChild(e.target.value);
  };

  const handleClickOutside = (event: any) => {
    if (event.target.closest(`.${sSelectChildWrapper}`)) return;
    setIsOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div className={sSelectChildWrapper}>
      <div
        className={sSelectChildBoxContainer}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className={sSelectChildPreviewBox}>
          <span className={sSelectChildIcon}>
            <ChildFace />
          </span>
          <div className={sSelectChildPreview}>
            <p className={sSelectChildPreviewLabel}>Selected child name</p>
            <h2 className={sSelectChildPreviewChildName}>
              {childrenList.find((child) => child.id == selectedChildId)
                ?.name || 'All'}
            </h2>
          </div>
        </div>
        <span className={sSelectChildChevron}>
          <ChevronBottom />
        </span>
      </div>
      {isOpen && (
        <div className={sChildListContainer}>
          <div className={sChildSearchWrapper}>
            <span className={sChildSearchIcon}>
              <SearchIcon />
            </span>
            <input
              value={searchChild}
              onChange={onSearchChild}
              placeholder="Search by name"
              type={'text'}
            />
          </div>
          <div>
            <div className={sChildrenListWrapper}>
              {filterChildList().map((child) => (
                <div
                  key={child.id}
                  className={selectedChildId == child.id ? 'active' : ''}
                  onClick={() => {
                    setSelectedChildId(child.id);
                    setIsOpen(false);
                  }}
                >
                  {child.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectChild;
