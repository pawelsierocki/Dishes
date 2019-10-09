import React, { Component } from "react";

import ReactLightCalendar from "@lls/react-light-calendar";
import "@lls/react-light-calendar/dist/index.css";

const DAY_LABELS = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela"
];
const MONTH_LABELS = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień"
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const startDate = date.getTime();
    this.state = {
      startDate, // Today
      endDate: new Date(startDate).setDate(date.getDate() + 6) // Today + 6 days
    };
  }

  componentDidMount() {
    this.props.onChange(this.state.startDate, this.state.endDate);
  }

  onChange = (startDate, endDate) => {
    this.setState({ startDate, endDate }, () =>
      this.props.onChange(this.state.startDate, this.state.endDate)
    );
  };

  render = () => {
    const { startDate, endDate } = this.state;

    return (
      <ReactLightCalendar
        startDate={startDate}
        endDate={endDate}
        onChange={this.onChange}
        range
        monthLabels={MONTH_LABELS}
        dayLabels={DAY_LABELS}
      />
    );
  };
}

export default Calendar;
