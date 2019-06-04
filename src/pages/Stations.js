import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Spinner from '../components/Spinner/Spinner';
import Table from '../components/Table/Table';

const ALL_STATIONS_QUERY = gql`
  query ALL_STATIONS_QUERY {
    bikeRentalStations {
      stationId
      name
      bikesAvailable
      spacesAvailable
      lat
      lon
      allowDropoff
    }
  }
`;

class StationsPage extends Component {
  render() {
    return (
      <Query query={ALL_STATIONS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Spinner />;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <React.Fragment>
              <Table data={data.bikeRentalStations} />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default StationsPage;
