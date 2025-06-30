import React from "react";
import s from "./FilterPopup.module.css";
import { PlusIcon, MinusIcon, SearchIcon2 } from "../Icon/Icon";

interface Option {
  id: number;
  name: string;
}

interface FilterAttributeListProps {
  name: string;
  slug: string;
  options: Option[];
  selectedOptions: string[];
  search: string;
  setSearch: (v: string) => void;
  isOpen: boolean;
  toggleOpen: () => void;
  toggleOption: (slug: string, optionId: string) => void;
}

export const FilterAttributeList: React.FC<FilterAttributeListProps> = ({
  name,
  slug,
  options,
  selectedOptions,
  search,
  setSearch,
  isOpen,
  toggleOpen,
  toggleOption,
}) => {
  return (
    <div className={s.backDrop}>
      <label className={isOpen ? s.active : ""} onClick={toggleOpen}>
        {isOpen ? (
          <PlusIcon className={s.plus} />
        ) : (
          <MinusIcon className={s.minus} />
        )}
        {name} <span className={s.qty}>{options.length}</span>
      </label>
      {isOpen && (
        <div className={s.list}>
          {options.length > 20 && (
            <div className={s.inputContainer}>
              <input
                type="text"
                className={s.searchInput}
                placeholder={`Пошук ${name.toLowerCase()}`}
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
              <SearchIcon2 />
            </div>
          )}
          {options
            .filter((opt) => opt.name.toLowerCase().includes(search))
            .map((option) => (
              <label key={option.id} className={s.customCheckbox}>
                <input
                  type="checkbox"
                  className={s.hiddenCheckbox}
                  checked={selectedOptions.includes(option.id.toString())}
                  onChange={() => toggleOption(slug, option.id.toString())}
                />
                <span className={s.checkboxLabel}>{option.name}</span>
              </label>
            ))}
        </div>
      )}
    </div>
  );
};
