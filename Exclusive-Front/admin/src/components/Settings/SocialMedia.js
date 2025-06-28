import React, { use } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

const SocialMedia = () => {
  const { page, isLoading } = useSelector((state) => state.pageReducer);
  useEffect(() => {
    dispatch(fetchPageBySlug({}));
  }, []);
  return (
    <div className="socialMedia">
      <div className="page-header">
        <div className="text">
          <h4 className="page-title">
            <FormattedMessage id="socialMediaDescription" />
          </h4>
        </div>
        <button className="btn addSocialMedia">
          + <FormattedMessage id="addSocialMedia" />
        </button>
      </div>
    </div>
  );
};

export default SocialMedia;
