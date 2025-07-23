import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { FormattedMessage } from "react-intl";

import Loading from "../Shared/loading";
import styles from "./styles/styles.module.scss";
import { fetchSettings } from "@/store/actions/settings/settingsActions";
import { Col, Row } from "react-bootstrap";

import {
  sellrOtp,
  sellerResendOtp,
} from "@/store/actions/seller/sellerActions";

const Index = () => {
  const { isLoading } = useSelector((state) => state.sellerReducer);
  const { locale } = useSelector((state) => state.localeReducer);
  const { settings } = useSelector((state) => state.settingsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const targetEmail = localStorage.getItem("targetEmail");

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = otp.join("");
    const email = targetEmail;

    const values = {
      verificationCode,
      email,
    };
    const payload = { values, toast, navigate, locale };
    dispatch(sellrOtp(payload));
  };

  const handleResendOtp = () => {
    const values = {
      email: targetEmail,
    };
    const payload = { values, toast, locale };
    dispatch(sellerResendOtp(payload));
  };
  useEffect(() => {
    dispatch(fetchSettings({ toast, locale }));
  }, []);
  return (
    <div className={styles.otp}>
      <div className="inner">
        <div className="logo">
          <img src={settings?.logo} alt="logo" />
        </div>
        <div className="content">
          <h1 className="title">
            <FormattedMessage id="activateAccount" />
          </h1>
          <p className="sub-title">
            <FormattedMessage id="enter-code" values={{ email: targetEmail }} />
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12}>
              <div className="otp-inputs" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className={`otp-box ${digit ? "filled" : ""}`}
                  />
                ))}
              </div>
              <Col xs={12}>
                <div className="resend">
                  <p>
                    <FormattedMessage id="send-code" />
                  </p>
                  <button
                    className="resendBtn"
                    type="button"
                    onClick={handleResendOtp}
                  >
                    <FormattedMessage id="resend-code" />
                  </button>
                </div>
              </Col>
              <Col xs={11} className="mx-auto">
                <button
                  type="submit"
                  className="saveBtn"
                  disabled={otp.includes("")}
                >
                  {isLoading ? <Loading /> : <FormattedMessage id="activate" />}
                </button>
              </Col>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};
export default Index;
