import React from "react";
import SelectComp from "../Select/SelectComp";
import api from "../../../Services";
import createResponses, {
  buildErrorTemplate,
  buildLoadingTemplate,
} from "../../../helpers/createResponses";
import Loader from "../Loader/Loader";

const Tag = ({ getTagHandler, tags, selectedTag }) => {
  const { initialError, initialLoading } = createResponses;
  const dataNotFoundError = buildErrorTemplate("dataNotFound_warning_error");
  const [error, setError] = React.useState(initialError);
  const [loading, setLoading] = React.useState(initialLoading);

  return (
    <div>
      {loading.value ? (
        <Loader />
      ) : (
        <>
          {!error.value && tags.length > 0 && (
            <SelectComp
              options={tags}
              label="Select Tag"
              fullWidth
              getValue={(e) => {
                getTagHandler(e.value);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Tag;
