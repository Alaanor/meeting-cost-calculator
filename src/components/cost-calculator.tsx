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

        <p>@TODO computed result</p>
      </>
    );
  }
}

export default CostCalculator;
