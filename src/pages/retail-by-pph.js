import saturationData from '../data/saturation.json';
import recessionRetailData from '../data/retailModelsRecession.json';
import boomRetailData from '../data/retailModelsBoom.json';
import normalRetailData from '../data/retailModelsNormal.json';
import React from 'react'
import nerdamer from "nerdamer/all.js";
import NumericInput from 'react-numeric-input';



class RetailByPph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recessionRetailModels: new Map(),
            normalRetailModels: new Map(),
            boomRetailModels: new Map(),
            saturations: new Map([
                ['Apples', '1.1199495989189976'],
                ['Coffee powder', '3.0474785067910872'],
                ['Eggs', '0.8029803217635234'],
                ['Grapes', '1.2232558511205256'],
                ['Oranges', '1.1189683256723917'],
                ['Sausage', '1.3736872260414887'],
                ['Steak', '2.102062276069676'],
            ]),
            retailproducts: [],
            retailmodel: "",
            saturation: 1.1875107382766068,
            adjustedSat: 1.1875107382766068,
            salesBonus: 4,
            admin: 0.04,
            laborCost: 138,
            materialCost: 0.821,
            price: 32,
            pphpl: 150,
            aa: 1,
            bb: 1,
            cc: 1,
            dd: 1,
            ee: 1,
        }
    }

    loadData = () => {

        let satData = new Map(Object.entries(saturationData))
        let recModels = new Map(Object.entries(recessionRetailData))
        let normModels = new Map(Object.entries(normalRetailData))
        let boomModels = new Map(Object.entries(boomRetailData))

        let retailproducts = [...satData.keys()]
        this.setState({ saturations: satData, recessionRetailModels: recModels, normalRetailModels: normModels, boomRetailModels: boomModels, retailproducts: retailproducts })
    }

    parseRetailModel(model) {
        try {
            let words = model.split('price*');

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

            return [a, b, c, d, e]
        }
        catch (error) {
            console.error(error.toString() + "failed to parse retail model")
        }
    }

    calculatePrices = () => {

    }


    solve = () => {
        
        let modelConstants = parseRetailModel() 

        let n1 = nerdamer(`(x-${this.state.materialCost})*((3600/((x * ${this.state.aa} + (-${this.state.bb} + (${Math.max(this.state.saturation - 0.24 * this.state.quality, -0.38)} - 0.5) / ${this.state.cc}))^2 * ${this.state.dd} + ${this.state.ee}))/(1-(${this.state.salesBonus}/100) ))-(${this.state.laborCost}*(1+${this.state.admin}))`);
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

    render(){
        return(
            <div>

            </div>
        )
    } 


}

export default RetailByPph;