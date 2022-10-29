import SiteDescription from "components/site-description/site-description";
import Head from "components/head/head";
import DefaulterItem from "components/defaulterList/defaulterItem";
import SvgSpinner from "icons/Spinner";
import Button from "components/button/button";
import { useFetch } from "store/useFetch";
import DefaultersList from "components/defaulterList/defaultList";

function Main() {
  const { data, isLoading, isError, setData } = useFetch("defaulters");

  return (
    <>
      <Head title="Dashboard" />

      <SiteDescription />
      <div className="add-defaulter-btn">
        <Button href={"/defaulter/new"} primary>
          {" "}
          Add defaulter{" "}
        </Button>
      </div>

      {isLoading && (
        <div className="loading">
          <SvgSpinner />
        </div>
      )}

      {data && data.defaulters?.length === 0 && (
        <p className="notice">No Defaulters yet</p>
      )}

      {isError && <p>Sorry something went wrong..</p>}

      <DefaultersList>
        {data &&
          data.defaulters.map(({ id, name, telephone, arrears }) => {
            return (
              <DefaulterItem
                key={id}
                id={id}
                name={name}
                telephone={telephone}
                arrears={arrears}
                setData={setData}
              />
            );
          })}
      </DefaultersList>
    </>
  );
}

export default Main;
