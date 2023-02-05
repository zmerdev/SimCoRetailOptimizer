import functionPlot from 'function-plot';
import React from 'react'
// @ts-ignore
import nerdamer from "nerdamer/all.js";
import NumericInput from 'react-numeric-input';
import Form from 'react-bootstrap/Form'
import saturationData from '../data/saturation.json';
import r2recessionRetailData from '../data/r2retailModelsRecession.json';
import r2boomRetailData from '../data/r2retailModelsBoom.json';
import r2normalRetailData from '../data/r2retailModelsNormal.json';
import r1recessionRetailData from '../data/r1retailModelsRecession.json';
import r1boomRetailData from '../data/r1retailModelsBoom.json';
import r1normalRetailData from '../data/r1retailModelsNormal.json';
import { Button } from 'react-bootstrap';

class Retail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: "2",
            updated: "never",
            resource: "Apple",
            saturation: 1.1875107382766068,
            adjustedSat: 1.1875107382766068,
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
            quality: 0,
            econPhase: 'Recession',
            r2recessionRetailModels: new Map(),
            r2normalRetailModels: new Map(),
            r2boomRetailModels: new Map(),
            r1recessionRetailModels: new Map(),
            r1normalRetailModels: new Map(),
            r1boomRetailModels: new Map(),
            saturations: new Map([
                ['Apples', '1.1199495989189976'],
                ['Coffee powder', '3.0474785067910872'],
                ['Eggs', '0.8029803217635234'],
                ['Grapes', '1.2232558511205256'],
                ['Oranges', '1.1189683256723917'],
                ['Sausage', '1.3736872260414887'],
                ['Steak', '2.102062276069676'],
            ]),
            values: [],
            retailmodel: "",
            max: 0,
            maxI: 0
        };
    }

    loadData = () => {

        let r1satData = new Map(Object.entries(r1saturationData))
        let r2satData = new Map(Object.entries(r2saturationData))
        let r2recModels = new Map(Object.entries(r2recessionRetailData))
        let r2normModels = new Map(Object.entries(r2normalRetailData))
        let r2boomModels = new Map(Object.entries(r2boomRetailData))
        let r1recModels = new Map(Object.entries(r1recessionRetailData))
        let r1normModels = new Map(Object.entries(r1normalRetailData))
        let r1boomModels = new Map(Object.entries(r1boomRetailData))

        if(this.state.realm == '1'){
            let lastupdated = r1satData.get("LastUpdated")
            r1satData.delete("LastUpdated")
            let values = [...r1satData.keys()]
            this.setState({ updated: lastupdated, saturations: r1satData, 
                r2recessionRetailModels: r2recModels, r2normalRetailModels: r2normModels, r2boomRetailModels: r2boomModels,
                r1recessionRetailModels: r1recModels, r1normalRetailModels: r1normModels, r1boomRetailModels: r1boomModels,
                values: values })
        }
        else{
            let lastupdated = r2satData.get("LastUpdated")
            r2satData.delete("LastUpdated")
            let values = [...r2satData.keys()]
            this.setState({ updated: lastupdated, saturations: r2satData, 
                r2recessionRetailModels: r2recModels, r2normalRetailModels: r2normModels, r2boomRetailModels: r2boomModels,
                r1recessionRetailModels: r1recModels, r1normalRetailModels: r1normModels, r1boomRetailModels: r1boomModels,
                values: values })
        }
        
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
        let n1 = nerdamer(`(x-${this.state.materialCost})*((3600/((x * ${this.state.aa} + (-${this.state.bb} + (${Math.max( (this.state.saturation < 0.3 ? this.state.saturation- 0.3 : this.state.saturation) - 0.24 * this.state.quality, -0.38)} - 0.5) / ${this.state.cc}))^2 * ${this.state.dd} + ${this.state.ee}))/(1-(${this.state.salesBonus}/100) ))-(${this.state.laborCost}*(1+${this.state.admin}))`);
        let sol = nerdamer.solve(n1, 'x')

        let max = -1;
        let maxI = 0

        let low = sol.symbol.elements[0].valueOf()
        let high = sol.symbol.elements[1].valueOf()
        let step = Math.pow(10, Math.floor(Math.log10((high - low) / 100))) / 2
        console.log(low + ' ' + high + ' ' + step + " " + this.state.quality + " " + this.state.laborCost + " " + this.state.salesBonus)

        for (let i = low; i < high; i += step) {
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
                fn: `(x-${this.state.materialCost})*((3600/((x * ${this.state.aa} + (-${this.state.bb} + (${Math.max((this.state.saturation < 0.3 ? this.state.saturation- 0.3 : this.state.saturation) - .24 * this.state.quality, -0.38)} - 0.5) / ${this.state.cc}))^2 * ${this.state.dd} + ${this.state.ee}))/(1-(${this.state.salesBonus}/100) ))-(${this.state.laborCost}*(1+${this.state.admin}))`,
                nSamples: 700
            }]
        })
    }

    updateModels = () => {
        console.log(this.getRetailModel(this.state.resource))
        this.setState({
            retailmodel: this.getRetailModel(this.state.resource),
            saturation: this.state.saturations.get(this.state.resource)
        }, this.parseRetailModel)
    }

    getRetailModel(value) {
        if(this.state.realm == '1'){
            switch (this.state.econPhase) {
                case 'Recession':
                    return this.state.r1recessionRetailModels.get(value)
                case 'Normal':
                    return this.state.r1normalRetailModels.get(value)
                case 'Boom':
                    return this.state.r1boomRetailModels.get(value)
                default:
            }
        }
        else{
            switch (this.state.econPhase) {
                case 'Recession':
                    return this.state.r2recessionRetailModels.get(value)
                case 'Normal':
                    return this.state.r2normalRetailModels.get(value)
                case 'Boom':
                    return this.state.r2boomRetailModels.get(value)
                default:
            }
        }        
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
                    <Form.Select onChange={(event) => { this.setState({ realm: event.target.value }, this.loadData) }}>
                        <option value={'1'}>Realm 1</option>
                        <option value={'2'}>Realm 2</option>
                    </Form.Select>
                </div>
                <div>
                    <Form.Select onChange={(event) => { this.setState({ resource: event.target.value }, this.updateModels) }}>
                        <option>Select Resource</option>
                        {this.state.values.map((key, idx) => {
                            return (<option value={key}>{key}</option>)
                        })}
                    </Form.Select>
                </div>
                <div>
                    <Form.Select onChange={(event) => { this.setState({ econPhase: event.target.value }, this.updateModels) }}>
                        <option value={'Recession'}>Recession</option>
                        <option value={'Normal'}>Normal</option>
                        <option value={'Boom'}>Boom</option>
                    </Form.Select>
                </div>
                <div>retail model <input value={this.state.retailmodel} /></div>
                <div>Saturation <NumericInput step={0.01} precision={15} value={this.state.saturation} onChange={(event) => this.setState({ saturation: event }, this.solve())} /></div>
                <div>Cost <NumericInput step={0.01} precision={3} value={this.state.materialCost} onChange={(event) => this.setState({ materialCost: event }, this.solve())} /></div>
                <div>Sales Bonus <NumericInput step={1} value={this.state.salesBonus} onChange={(event) => this.setState({ salesBonus: event }, this.solve())} /></div>
                <div>Admin <NumericInput step={0.01} precision={3} value={this.state.admin} onChange={(event) => this.setState({ admin: event }, this.solve())} /></div>
                <div>Labor <NumericInput step={1} value={this.state.laborCost} onChange={(event) => this.setState({ laborCost: event }, this.solve())} /></div>
                <div>Quality <NumericInput step={0.1} value={this.state.quality} onChange={(event) => this.setState({ quality: event }, this.solve())} /></div>
                <div>Best Sale Price: {this.state.maxI} PPHPL: {this.state.max}</div>
                <br></br>
                <Button onClick={() => { this.loadData(); this.solve(); }}>Load Data</Button>
                <br></br>
                <br></br>
                <div>Last Updated: {this.state.updated}</div>
            </div>
        )
    }
}

export default Retail;
