import Autosuggest from "react-autosuggest";
import { useField } from "formik";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { CheckNotificationIcon } from "../../assets/svg";

import s from "./AutosuggestByValue.module.scss";

const DEBOUNCE_TIME = 500;

function AutosuggestByValue({
  id,
  placeholder = "Не выбрано",
  disabled = false,
  label,
  lazyQuery,
  options = [],
}) {
  const [field, meta, helpers] = useField(id);
  const { value: v, error, touched } = meta;
  const { setValue, setTouched } = helpers;
  const value = v ?? ""; // Сюда тоже пришлось вставить этот костыль :()

  const [suggestions, setSuggestions] = useState([]); // создаем состояние для выпадающего списка
  const [inputValue, setInputValue] = useState(value); // создаем состояние для хранения значения инпута
  const [searchQuery] = lazyQuery();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleFetchRequest = async (inputVal) => {
    if (!inputVal) {
      setSuggestions([]);
      return;
    }
    try {
      const result = await searchQuery(inputVal);
      if (result.data) {
        setSuggestions(result.data);
      } else {
        setSuggestions([]);
      }
    } catch (e) {
      setSuggestions([]);
    }
  };

  const debounce = useDebouncedCallback((inputVal) => {
    handleFetchRequest(inputVal);
  }, DEBOUNCE_TIME);

  const handleChange = (e, { newValue }) => {
    setInputValue(newValue);
    setValue(newValue);
  };

  const handleBlur = () => {};

  const handleSuggestionSelect = (e, { suggestion }) => {
    setValue(suggestion.value);
  };

  const handleSuggestionsClearRequest = () => {
    setSuggestions([]);
  };

  return (
    <>
      <label className={s.autosuggest_label}>
        <div className={s.checkNotification}>{value ? <CheckNotificationIcon /> : null}</div>
        <div>{label}</div>
      </label>
      <Autosuggest
        theme={s}
        inputProps={{
          placeholder,
          autoComplete: "off",
          spellCheck: false,
          id,
          value: inputValue,
          onChange: handleChange,
          onBlur: handleBlur,
          disabled,
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value: inputVal }) => debounce(inputVal)}
        onSuggestionSelected={handleSuggestionSelect}
        onSuggestionsClearRequested={handleSuggestionsClearRequest}
        getSuggestionValue={(suggestion) => suggestion.value} // Подставляет выбранное значение в инпут
        renderSuggestion={(suggestion) => <div>{suggestion.value}</div>} // Как рендерить список suggestions'ов
        highlightFirstSuggestion={true} // Автоматически ставится курсор на первое значение (думаю так удобнее)
      />
    </>
  );
}

export default AutosuggestByValue;
