import React from 'react';
import styles from './Graphs.module.css';
import PieGraph from './PieGraph/PieGraph';
import TooltipGraph from './TooltipGraph/TooltipGraph';
import LineGraph from './LineGraph/LineGraph';

const graphs = (props) => (
    <div className={styles.Graphs}>
        <PieGraph />
        <TooltipGraph />
        <LineGraph />
    </div>
);

export default graphs;