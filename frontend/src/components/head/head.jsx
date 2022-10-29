import { Helmet } from "react-helmet-async";

const Head = ({ title = "", description = "" }) => {
  return (
    <Helmet
      title={title ? `${title} | Defaulters App` : undefined}
      defaultTitle="Defaulters App"
    >
      <meta name="description" content={description}></meta>
    </Helmet>
  );
};

export default Head;
