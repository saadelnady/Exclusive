import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "./styles/styles.module.scss";
import { activities, notifications, salesData, stats } from "./data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistics } from "@/store/actions/statistics/statisticsActions";
import Loading from "../Shared/loading";

const Home = () => {
  const dispatch = useDispatch();
  const { statistics, isLoading } = useSelector(
    (state) => state.statisticsReducer
  );
  const { locale } = useIntl();

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);
  const localizedData = statistics?.salesData?.data?.map((item) => ({
    ...item,
    name: item.name[locale],
  }));

  isLoading && <Loading />;
  return (
    <div className={`page ${styles.home}`}>
      <h1 className="mb-4 fw-bold page-title">
        <FormattedMessage id="home" />
      </h1>

      {/* Cards for stats */}
      <Row className="statistics">
        {statistics?.statisticsData?.map((stat, index) => (
          <div className="state-card" key={index}>
            <span>{stat?.icon}</span>
            <h4>{stat?.title?.[locale]}</h4>
            <p>{stat?.total}</p>
          </div>
        ))}
      </Row>

      {/* Charts + Notifications */}
      <Row className="g-4 mb-4">
        <Col md={12}>
          <div className="charts">
            <div className="card-header fw-semibold">
              {statistics?.salesData?.title?.[locale]}
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={localizedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#6e591a"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>

        <Col xs={12} md={4}>
          <div className="notifications">
            <h3 className="card-header fw-semibold">الإشعارات</h3>
            <ul className="list-group list-group-flush">
              {notifications.map((note, index) => (
                <li key={index}>🔵 {note}</li>
              ))}
            </ul>
          </div>
        </Col>
        <Col xs={12} md={8}>
          <div className="activities">
            <h3 className="card-header fw-semibold">الأنشطة الأخيرة</h3>
            <ul className="list-group list-group-flush">
              {activities.map((act, index) => (
                <li key={index}>🔸 {act}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
