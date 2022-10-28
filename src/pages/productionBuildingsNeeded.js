import React from 'react';
import buildings from '../data/buildings.json';

class ProductionBuildingsNeeded extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    loadData(){
        
        for (let building in Object.entries(buildings)){
            console.log(building)
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }

}

export default ProductionBuildingsNeeded;
