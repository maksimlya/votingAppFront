import React, { Fragment } from 'react';
import styles from './ViewPoll.module.css';
import PollList from './PollsList/PollsList';
import Poll from './Poll/Poll';

const data = [{
  id: 0,
  city: "BB McCullum",
  team1: "M Chinnaswamy Stadium",
  result: "Asad Rauf"
}, {
  id: 1,
  city: "haifa",
  team1: "maccabi",
  result: "winners"
}];

const viewPoll = (props) => (
  <Fragment>
    <PollList data={data} />
    <Poll pollData={props.poll}/>
  </Fragment>
);

export default viewPoll;