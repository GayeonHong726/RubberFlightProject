import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel, Text } from '@chakra-ui/react';
import FlightInfoCard from './FlightInfoCard';

const FlightInfoTabs = ({ pastFlights, upcomingFlights }) => {
  const [tabIndex, setTabIndex] = useState(0); 

  const handleTabChange = (index) => {
    setTabIndex(index); 
  };

  return (
    <Tabs variant="line" className="flight-tab-container" onChange={handleTabChange}>
      <TabList>
        <Tab _selected={{ color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }}>
          예정된 예약
        </Tab>
        <Tab _selected={{ color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }}>
          지난 예약
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {upcomingFlights.length > 0 ? (
            upcomingFlights.map((flight, index) => (
              <FlightInfoCard key={flight.id} flight={flight} index={index} tabKey={tabIndex} />
            ))
          ) : (
            <Text>예약된 항공편이 없습니다.</Text>
          )}
        </TabPanel>
        <TabPanel>
          {pastFlights.length > 0 ? (
            pastFlights.map((flight, index) => (
              <FlightInfoCard key={flight.id} flight={flight} index={index} tabKey={tabIndex} />
            ))
          ) : (
            <Text>지난 예약된 항공편이 없습니다.</Text>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FlightInfoTabs;
