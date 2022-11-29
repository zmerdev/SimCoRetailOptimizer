import NumericInput from 'react-numeric-input';
import React from 'react'


class QualityCalc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q0: 0,
            q1: 0,
            q2: 0,
            q3: 0,
            q4: 0,
            q5: 0,
            q6: 0,
            q7: 0,
            q8: 0,
            q9: 0,
            q10: 0,
            q11: 0,
            q12: 0,
        };
    }


    render() {
        return (
            <div>
                <div>Q0 <NumericInput step={1} value={this.state.q0} onChange={(event) => this.setState({ q0: event })} /></div>
                <div>Q1 <NumericInput step={1} value={this.state.q1} onChange={(event) => this.setState({ q1: event })} /></div>
                <div>Q2 <NumericInput step={1} value={this.state.q2} onChange={(event) => this.setState({ q2: event })} /></div>
                <div>Q3 <NumericInput step={1} value={this.state.q3} onChange={(event) => this.setState({ q3: event })} /></div>
                <div>Q4 <NumericInput step={1} value={this.state.q4} onChange={(event) => this.setState({ q4: event })} /></div>
                <div>Q5 <NumericInput step={1} value={this.state.q5} onChange={(event) => this.setState({ q5: event })} /></div>
                <div>Q6 <NumericInput step={1} value={this.state.q6} onChange={(event) => this.setState({ q6: event })} /></div>
                <div>Q7 <NumericInput step={1} value={this.state.q7} onChange={(event) => this.setState({ q7: event })} /></div>
                <div>Q8 <NumericInput step={1} value={this.state.q8} onChange={(event) => this.setState({ q8: event })} /></div>
                <div>Q9 <NumericInput step={1} value={this.state.q9} onChange={(event) => this.setState({ q9: event })} /></div>
                <div>Q10 <NumericInput step={1} value={this.state.q10} onChange={(event) => this.setState({ q10: event })} /></div>
                <div>Q11 <NumericInput step={1} value={this.state.q11} onChange={(event) => this.setState({ q11: event })} /></div>
                <div>Q12 <NumericInput step={1} value={this.state.q12} onChange={(event) => this.setState({ q12: event })} /></div>
                <br></br>
                <div>{
                    ((this.state.q0 * 1 +
                        this.state.q1 * 2 +
                        this.state.q2 * 3 +
                        this.state.q3 * 4 +
                        this.state.q4 * 5 +
                        this.state.q5 * 6 +
                        this.state.q6 * 7 +
                        this.state.q7 * 8 +
                        this.state.q8 * 9 +
                        this.state.q9 * 10 +
                        this.state.q10 * 11 +
                        this.state.q11 * 12 +
                        this.state.q12 * 13) /
                        (this.state.q0 +
                            this.state.q1 +
                            this.state.q2 +
                            this.state.q3 +
                            this.state.q4 +
                            this.state.q5 +
                            this.state.q6 +
                            this.state.q7 +
                            this.state.q8 +
                            this.state.q9 +
                            this.state.q10 +
                            this.state.q11 +
                            this.state.q12)) - 1
                } </div>
            </div>
        )
    }



}
export default QualityCalc;
