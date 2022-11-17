import React from "react";
import Section from "./../../Section";
import GridComponent from "./../../../../UI/Grid/Grid";
import Stack from "./../../../../UI/Stack/Stack";
import Card from "./../../../../UI/Card/Card";
import Typography from "./../../../../UI/Typography/TypographyCompo";
import IconButton from "./../../../../UI/IconButton/IconButton";
import Calender from "./../../../../UI/Calender/Calender";
import CalenderIcon from "./icons/CalenderIco";
import constants from "./../../../../../config/constants";
import palette from "./../../../../../config/palette";
import ClickAwayListener from "react-click-away-listener";
import CoursesChart from "./../../../../UI/Charts/CourseChart";
import stylesOverrides from "./calenderStyleOverrides";
import api from "../../../../../Services";
import { useSelector } from "react-redux";
import {
  NumberOfCourses,
  CardLabel,
  StatCardFixedHeight,
  StatCardsLayout,
  Span,
  Div,
  HeadingTypography,
  PercentageTypography,
  ArrowUpward,
} from "./../../Dashboard.style";
import TransparentSelect from "./../../TransparentSelect/TransparentSelect";
import { useMediaQuery } from "@mui/material";
import Loader from "../../../../UI/Loader/Loader";
import { useSnackbar } from "notistack";
import ErrorBoundary from "./../../../../../Errors/ErrorBoundary";

const Statistics = () => {
  const userStatistics = useSelector((state) => state.user.stats);
  const { enqueueSnackbar } = useSnackbar();
  const [dataChart, setDataChart] = React.useState([]);
  const [loadingSummary, setLoadingSummary] = React.useState(false);
  const [showChartData, setShowChartData] = React.useState(false);
  const [showCalender, setShowCalender] = React.useState(false);

  const matches = useMediaQuery("(min-width:1000px)");
  const small = useMediaQuery("(max-width:530px)");
  const { statistics } = constants.dashboard;
  const [init, setInit] = React.useState({
    coursesCompleted: 0,
    coursesInProgress: 0,
  });

  const loadStatistics = () => {
    const buildStatistics = userStatistics.map((day) => ({
      day: day.day[0],
      lineRange: Math.round(day.hours),
    }));
    const numberOfDaysToPresent = statistics.daysToPresentInChart;
    const filter14days = buildStatistics.slice(
      -numberOfDaysToPresent,
      buildStatistics.length
    );
    setDataChart(filter14days);
  };

  const loadInitialData = () => {
    loadStatistics();
  };

  React.useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <ErrorBoundary>
      <Section>
        <GridComponent item xs={12}>
          <Stack direction="row" space={0} justifyContent="space-between">
            <HeadingTypography variant="h6">
              {constants.dashboard.sectionHeadings[0]}
            </HeadingTypography>
            <ErrorBoundary>
              <Stack
                alignItems="center"
                sx={{ position: "relative" }}
                space={2.25}
                direction="row"
              >
                <IconButton
                  style={{ width: "25px", height: "25px" }}
                  onClick={(e) => setShowCalender((prevState) => !prevState)}
                >
                  <CalenderIcon />
                </IconButton>
                {showCalender && (
                  <ClickAwayListener
                    onClickAway={(e) => {
                      return setShowCalender(false);
                    }}
                  >
                    <Span>
                      <Calender
                        id="calender"
                        close={(e) => setShowCalender(false)}
                        getDates={(e) => {
                          setShowCalender(false);
                          const { start, end } = e;
                          if (end) {
                            enqueueSnackbar(
                              `Selected dates from ${start.date} ${start.month} ${start.year} to ${end.date} ${end.month} ${end.year}`,
                              {
                                variant: "success",
                              }
                            );
                          } else {
                            enqueueSnackbar(
                              `Selected date ${start.date} ${start.month} ${start.year}`,
                              {
                                variant: "success",
                              }
                            );
                          }
                        }}
                        styleOverrides={{ ...stylesOverrides }}
                      />
                    </Span>
                  </ClickAwayListener>
                )}
                <TransparentSelect
                  getSelected={(e) => {
                    enqueueSnackbar(`Selected dates from ${e.toLowerCase()}`, {
                      variant: "success",
                    });
                  }}
                  title={statistics.selectdate}
                />
              </Stack>
            </ErrorBoundary>
          </Stack>
        </GridComponent>
        {loadingSummary ? (
          <Loader />
        ) : (
          <>
            <GridComponent item spacing={3.125} container xs={12}>
              <GridComponent item xs={matches ? 3 : small ? 12 : 6}>
                <StatCardFixedHeight>
                  <StatCardsLayout justifyContent="center">
                    <NumberOfCourses variant="h3">
                      {init.coursesCompleted}
                    </NumberOfCourses>
                    <CardLabel variant="h5">
                      {statistics.coursesCompleted}
                    </CardLabel>
                  </StatCardsLayout>
                </StatCardFixedHeight>
              </GridComponent>

              <GridComponent item xs={matches ? 3 : small ? 12 : 6}>
                <StatCardFixedHeight>
                  <StatCardsLayout justifyContent="center">
                    <NumberOfCourses variant="h3">
                      {init.coursesInProgress}
                    </NumberOfCourses>
                    <CardLabel variant="h5">{statistics.progress}</CardLabel>
                  </StatCardsLayout>
                </StatCardFixedHeight>
              </GridComponent>
              <GridComponent item xs={matches ? 6 : 12}>
                <Card sx={{ height: matches ? "246px" : "fit-content" }}>
                  <Stack justifyContent="center">
                    <Typography
                      variant="body2"
                      sx={{ color: palette.colors.unselected }}
                    >
                      Spent time this week
                    </Typography>
                    <Div>
                      <Typography variant="h5">
                        <strong>23 h 40 min</strong>
                      </Typography>
                      <PercentageTypography variant="body1">
                        <ArrowUpward />
                        +10%
                      </PercentageTypography>
                    </Div>
                    {showChartData ? (
                      <Loader />
                    ) : (
                      <CoursesChart dataController={dataChart} />
                    )}
                  </Stack>
                </Card>
              </GridComponent>
            </GridComponent>
          </>
        )}
      </Section>
    </ErrorBoundary>
  );
};

export default Statistics;
