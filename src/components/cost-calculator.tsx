import React from "react";

interface CostCalculatorProps {
  className: string
}

interface CostCalculatorState {
  averageSalary: number,
  amountPeople: number,
  meetingDuration: number,
  frequency: Frequency
}

enum Frequency {
  DAIlY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  YEARLY = "Yearly"
}

class CostCalculator extends React.Component<CostCalculatorProps, CostCalculatorState> {

  static readonly DAY_OF_WORK_PER_YEAR = 261;
  static readonly WEEK_PER_YEAR = 52 - 4; // 4 week of vacation
  static readonly HOUR_OF_WORK_PER_DAY = 8;

  constructor(props: any) {
    super(props);

    this.state = {
      averageSalary: 0,
      amountPeople: 1,
      meetingDuration: 1,
      frequency: Frequency.WEEKLY
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({...this.state, [name]: value})
  }

  handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let value = event.target.value as Frequency;
    this.setState({...this.state, frequency: value})
  }

  computeHourlyEmployeeCost(): number {
    return this.state.averageSalary / CostCalculator.DAY_OF_WORK_PER_YEAR / CostCalculator.HOUR_OF_WORK_PER_DAY;
  }

  computeCostPerMeeting(): number {
    return this.computeHourlyEmployeeCost() * this.state.amountPeople * this.state.meetingDuration;
  }

  computeYearlyCostOfMeeting(): number {
    let timePerYear;
    switch (this.state.frequency) {
      case Frequency.DAIlY: timePerYear = CostCalculator.DAY_OF_WORK_PER_YEAR; break;
      case Frequency.WEEKLY: timePerYear = CostCalculator.WEEK_PER_YEAR; break;
      case Frequency.MONTHLY: timePerYear = 12; break;
      case Frequency.YEARLY: timePerYear = 1; break;
    }

    return this.computeCostPerMeeting() * timePerYear;
  }

  render() {
    return (
      <>
        <form className={this.props.className}>
          <label htmlFor="averageSalary">Average salary (CHF)</label>
          <input name="averageSalary" type="number" value={this.state.averageSalary} onChange={this.handleInputChange}/>

          <label htmlFor="amountPeople">Amount of participant</label>
          <input name="amountPeople" type="number" value={this.state.amountPeople} onChange={this.handleInputChange}/>

          <label htmlFor="meetingDuration">Duration of a meeting in hours</label>
          <input name="meetingDuration" type="number" value={this.state.meetingDuration}
                 onChange={this.handleInputChange}/>

          <label htmlFor="frequency">Frequence of the meeting</label>
          <select name="frequency" value={this.state.frequency} onChange={this.handleSelectChange}>
            {Object.values(Frequency).map((freq) => (
              <option value={freq}>{freq}</option>
            ))}
          </select>
        </form>

        <p>The average cost per hour per employee is <strong>CHF {this.computeHourlyEmployeeCost().toFixed(2)}</strong>.</p>
        <p>The average cost per meeting is <strong>CHF {this.computeCostPerMeeting().toFixed(2)}</strong>.</p>
        <p>Considering its frequency, it costs <strong>CHF {this.computeYearlyCostOfMeeting().toFixed(2)}</strong> per year.</p>
      </>
    );
  }
}

export default CostCalculator;
