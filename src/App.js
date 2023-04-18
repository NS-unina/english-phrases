import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Bibtex from './Bibtex';
import Json from './Json';

import {styles} from './Styles'



import {
  ReactiveBase,
  DataSearch,
  MultiList,
  ReactiveList,
  SingleRange,
  ToggleButton,
  ResultCard,
  SingleDropdownList
} from "@appbaseio/reactivesearch";






function reactiveBase() {
  return (
    <ReactiveBase
      url={process.env.REACT_APP_ELK_URL}
      app="phrases"
      theme = {{
        colors: {
          textColor: '#fff',
          backgroundColor: '#212121',
          primaryTextColor: '#fff',
          primaryColor: '#2196F3',
          titleColor: '#fff',
          alertColor: '#d9534f',
          borderColor: '#666',
        }
      }}
      // credentials="04717bb076f7:be54685e-db84-4243-975b-5b32ee241d31"
      enableAppbase={false}

    >
    <h1 className="text-center"> Useful Phrases</h1>

      {/* Our components will go over here */}
  <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

  <DataSearch
    componentId="searchbox"
    dataField={[
      {
        "field": "Phrase",
        "weight": 3
      },
      {
        "field": "Phrase.autosuggest",
        "weight": 1
      },
      {
        "field": "Section",
        "weight": 5
      },
      {
        "field": "Section.autosuggest",
        "weight": 1
      },
      {
        "field": "What",
        "weight": 5
      },
      {
        "field": "What.autosuggest",
        "weight": 1
      },
    ]}
    placeholder="Search"
  />
  <div className="row">
  <ReactiveList
            componentId="results"
            dataField="Section"
            className="col-9"
            size={100}
            pagination={true}
            react={{
              and: ["searchbox", "sectionfilter", "whatfilter"]
            }}
            style={{ textAlign: "center" }}
            renderItem={phrase}
      />
  <div className="col-2">
  <MultiList
    componentId="sectionfilter"
    showSearch={false}
    placeholder="Search for section"
    size={100}
    dataField="Section.keyword"
    title="Filter by Section"
  />
  <br></br>
  <MultiList
    componentId="whatfilter"
    placeholder="Search for What"
    size={100}
    dataField="What.keyword"
    title="Filter by What"
  />

  </div>
  </div>

      </div>



    </ReactiveBase>
  );

}


/* Phrase Section What */
function App() {
  return (
    <div style={styles.AppStyle}>
    <Tabs>
    <TabList>
      <Tab> Phrases </Tab>
      <Tab>Citations</Tab>
    </TabList>

    <TabPanel>
      {/* {reactiveBase()} */}
      <Json></Json>
    </TabPanel>
    <TabPanel>
      <Bibtex></Bibtex>
    </TabPanel>
  </Tabs>
  </div>
  )

}
function phrase(data) {
    return (
      <div key={data._id}>{data.What} - {data.Phrase}</div>
      // <div key={data._id}>{data.Phrase}</div>
    );
  }

export default App;
