import functionPlot from 'function-plot';
import React from 'react'
// @ts-ignore
import nerdamer from "nerdamer/all.js";
import NumericInput from 'react-numeric-input';
import Form from 'react-bootstrap/Form'
import saturationData from '../data/saturation.json';

class Retail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saturation: 1.1875107382766068,
            salesBonus: 4,
            admin: 0.04,
            laborCost: 138,
            materialCost: 0.821,
            price: 32,
            aa: 1,
            bb: 1,
            cc: 1,
            dd: 1,
            ee: 1,
            domainX1: 0,
            domainX2: 3,
            domainY1: 0,
            domainY2: 500,
            retailmodels: new Map([
                ['Apples', '(Math.pow(price*3.179206 + (-7.356975 + (saturation - 0.5)/0.599775), 2.000000)*0.678778 + 20.484356)*amount'],
                ['Coffee powder', '(Math.pow(price*13.751570 + (-423.535513 + (saturation - 0.5)/0.113014), 2.000000)*0.027581 + 23.229650)*amount'],
                ['Eggs', '(Math.pow(price*5.230146 + (-6.077741 + (saturation - 0.5)/1.269072), 2.000000)*0.786793 + 6.616450)*amount'],
                ['Grapes', '(Math.pow(price*6.458955 + (-19.626893 + (saturation - 0.5)/0.222521), 2.000000)*0.124865 + 28.088719)*amount'],
                ['Oranges', '(Math.pow(price*5.440812 + (-13.289307 + (saturation - 0.5)/0.322054), 2.000000)*0.182793 + 25.111029)*amount'],
                ['Sausages', '(Math.pow(price*0.376938 + (-3.646306 + (saturation - 0.5)/4.855919), 2.000000)*38.148198 + 21.343798)*amount'],
                ['Steak', '(Math.pow(price*6.128719 + (-222.432256 + (saturation - 0.5)/0.095397), 2.000000)*0.055572 + 64.124642)*amount']
            ]),
            saturations: new Map([
                ['Apples', '1.1199495989189976'],
                ['Coffee powder', '3.0474785067910872'],
                ['Eggs', '0.8029803217635234'],
                ['Grapes', '1.2232558511205256'],
                ['Oranges', '1.1189683256723917'],
                ['Sausage', '1.3736872260414887'],
                ['Steak', '2.102062276069676'],
            ]),
            retailmodel: "",
            max: 0,
            maxI: 0
        };
    }

    loadData = () => {
        let satData =  new Map(Object.entries(saturationData))
        console.log(satData)
        this.setState({ saturations: satData }, () => { console.log(this.state) })
    }

    parseRetailModel = () => {
        //model = "(Math.pow(price*3.192824 + (-7.661700 + (saturation - 0.5)/0.618222), 2.000000)*0.695800 + 20.495550)*amount"
        //(Math.pow(price*3.192824 + (-7.661700 + (saturation - 0.5)/0.618222), 2.000000)*0.695800 + 20.495550)*amount
        try {
            let words = this.state.retailmodel.split('price*');

            words = words[1].split(' + (-');
            let a = words[0]

            words = words[1].split(' + (saturation - 0.5)/');
            let b = words[0]

            words = words[1].split('), 2.000000)*');
            let c = words[0]

            words = words[1].split(' + ');
            let d = words[0]

            words = words[1].split(')*amount');
            let e = words[0]

            this.setState({
                aa: a,
                bb: b,
                cc: c,
                dd: d,
                ee: e,
            }, () => { this.solve() })
        }
        catch (error) {
            console.error(error.toString() + "failed to parse retail model")
        }
    }

    solve = () => {
        let n1 = nerdamer(`(x-${this.state.materialCost})*((3600/((x * ${this.state.aa} + (-${this.state.bb} + (${this.state.saturation} - 0.5) / ${this.state.cc}))^2 * ${this.state.dd} + ${this.state.ee}))/(1-(${this.state.salesBonus}/100) ))-(${this.state.laborCost}*(1+${this.state.admin}))`);
        let sol = nerdamer.solve(n1, 'x')

        let max = -1;
        let maxI = 0

        let low = sol.symbol.elements[0].valueOf()
        let high = sol.symbol.elements[1].valueOf()
        console.log(new Date(Date.now()).toString())

        for (let i = low; i < high; i += .01) {
            let ans = n1.evaluate({ x: i })
            if (ans.valueOf() > max) {
                max = ans.valueOf()
                maxI = i
            }
            else break
        }

        this.setState({ max: max, maxI: maxI, domainX1: low, domainX2: high, domainY2: max.valueOf() * 1.2 }, () => { this.setPlot() })
    }

    setPlot = () => {
        functionPlot({
            title: 'Profit Per Hour vs Price',
            target: '#plot',
            yAxis: { domain: [this.state.domainY1, this.state.domainY2], label: "pph" },
            xAxis: { domain: [this.state.domainX1, this.state.domainX2], label: "price" },

            data: [{
                fn: `(x-${this.state.materialCost})*((3600/((x * ${this.state.aa} + (-${this.state.bb} + (${this.state.saturation} - 0.5) / ${this.state.cc}))^2 * ${this.state.dd} + ${this.state.ee}))/(1-(${this.state.salesBonus}/100) ))-(${this.state.laborCost}*(1+${this.state.admin}))`,
                nSamples: 700
            }]
        })
    }

    

    handleResourceChange = (event) => {
        this.setState({
            retailmodel: this.state.retailmodels.get(event.target.value)
            , saturation: this.state.saturations.get(event.target.value)
        }, this.parseRetailModel)
    }

    componentDidMount() {
        this.loadData()
        this.solve()
    }

    render() {
        return (
            <div>
                <div id='plot'></div>
                <div>
                    <Form.Select onChange={this.handleResourceChange}>
                        <option>Select Resource</option>
                        <option value="Apples">Apples</option>
                        <option value="Coffee powder">Coffee powder</option>
                        <option value="Eggs">Eggs</option>
                        <option value="Grapes">Grapes</option>
                        <option value="Oranges">Oranges</option>
                        <option value="Sausages">Sausages</option>
                        <option value="Steak">Steak</option>
                    </Form.Select>
                </div>
                <div>retail model <input value={this.state.retailmodel} /></div>
                <div>Saturation <NumericInput step={0.01} precision={15} value={this.state.saturation} onChange={(event) => this.setState({ saturation: event }, this.solve())} /></div>
                <div>Cost <NumericInput step={0.01} precision={3} value={this.state.materialCost} onChange={(event) => this.setState({ materialCost: event }, this.solve())} /></div>
                <div>Sales Bonus <NumericInput step={1} value={this.state.salesBonus} onChange={(event) => this.setState({ salesBonus: event }, this.solve())} /></div>
                <div>Admin <NumericInput step={0.01} precision={3} value={this.state.admin} onChange={(event) => this.setState({ admin: event }, this.solve())} /></div>
                <div>Labor <NumericInput step={1} value={this.state.laborCost} onChange={(event) => this.setState({ laborCost: event }, this.solve())} /></div>
                <div>Best Sale Price: {this.state.maxI} PPHPL: {this.state.max}</div>
            </div>
        )
    }
}

export default Retail;
