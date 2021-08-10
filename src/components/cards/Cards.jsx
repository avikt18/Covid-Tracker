import React from "react";
import styles from "./card.module.css";
import { CardContent, Typography, Grid, Container } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

function Cards({ info: { confirmed, recovered, deaths, lastUpdate } }) {
  if (!confirmed) {
    return "Loading...";
  }
  const stats = [confirmed.value, recovered.value, deaths.value, lastUpdate];
  // console.log(stats);

  const bodyText = [
    "Number of Active cases of COVID-19",
    "Number of recoveries from COVID-19",
    "Number of deaths by COVID-19"
  ];
  const secondaryText = ["Infected", "Recovered", "Deaths"];

  return (
    <div className={styles.container}>
      <Container maxWidth="md">
        <Typography color="textSecondary" variant="caption">
          {new Date(lastUpdate).toDateString()}
        </Typography>
      </Container>
      <Grid
        container
        className={styles.container}
        style={{ "flex-direction": "row" }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start="0"
                end={confirmed.value}
                duration="1"
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              Number of Active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start="0"
                end={recovered.value}
                duration="1"
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              Number of recoveries from COVID-19
            </Typography>
          </CardContent>
        </Grid>{" "}
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          className={cx(styles.card, styles.death)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start="0"
                end={deaths.value}
                duration="1"
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              Number of deaths by COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cards;
