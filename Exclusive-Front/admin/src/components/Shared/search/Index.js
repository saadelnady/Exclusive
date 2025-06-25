import { useForm } from "react-hook-form";
import styles from "./styles/styles.module.scss";
import { useIntl } from "react-intl";
import IcSearch from "./assets/svgs/ic-search.svg";
const SearchComponent = ({ searchHandler }) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const { formatMessage, locale } = useIntl();
  const onSubmit = (data) => {
    console.log("data", data);

    if (data.searchText === "") return;
    searchHandler(data.searchText);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="search-container">
          <input
            type="text"
            {...register("searchText", {
              required: formatMessage({ id: "required" }),
            })}
            className="search-input"
            placeholder={formatMessage({ id: "search-placeholder" })}
          />
          {getValues("searchText") !== "" && (
            <button
              type="button"
              className="btn-clear"
              onClick={() => reset()}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button type="submit" className="btn-search">
            <span>{formatMessage({ id: "search" })}</span>
            <IcSearch />
          </button>
        </div>
      </form>
      {errors.searchText && (
        <p className="error">{errors?.searchText?.message}</p>
      )}
    </div>
  );
};

export default SearchComponent;
