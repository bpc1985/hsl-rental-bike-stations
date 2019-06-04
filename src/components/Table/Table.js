import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Pagination from '../Pagination/Pagination';
import Search from '../Search/Search';

import './Table.css';

class Table extends Component {
  state = {
    allStations: [],
    currentStations: [],
    currentPage: null,
    totalPages: null,
    isSearch: false,
    bookmarks: []
  };

  componentDidMount() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    this.setState({ bookmarks });
    this.setState({ allStations: this.props.data });
  }

  onPageChanged = data => {
    const { allStations } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentStations = allStations.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentStations, totalPages });
  };

  handleSearchChange = e => {
    if (e.target.value !== '') {
      const { allStations } = this.state;
      const currentStations = allStations.filter(station => {
        const keyword = e.target.value.toLowerCase();
        const stationName = station.name.toLowerCase();
        return stationName.includes(keyword);
      });
      this.setState({ currentStations, isSearch: true });
    } else {
      this.setState({ isSearch: false });
    }
  };

  saveStation = (e, stationId) => {
    e.preventDefault();
    const newBookmarks = [...this.state.bookmarks, stationId];
    this.setState({bookmarks: newBookmarks});
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  }

  removeStation = (e, stationId) => {
    e.preventDefault();
    const newBookmarks = this.state.bookmarks.filter(id => id !== stationId);
    this.setState({bookmarks: newBookmarks});
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
  }

  isSaved = stationId => this.state.bookmarks.includes(stationId);

  render() {
    const {
      allStations,
      currentStations,
      isSearch
    } = this.state;

    const totalStations = allStations.length;

    if (totalStations === 0) return null;

    return (
      <React.Fragment>
        <div className="flexContainer">
          <div>
            <Search onChange={this.handleSearchChange} />
          </div>
          <div>
            {!isSearch &&
                <Pagination
                  totalRecords={totalStations}
                  pageLimit={10}
                  pageNeighbours={1}
                  onPageChanged={this.onPageChanged} />
            }
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Station ID</th>
              <th>Name</th>
              <th>Bikes Available</th>
              <th>Space Available</th>
              <th>Bookmarked</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentStations.map(station => (
              <tr key={station.stationId}>
                <td>{station.stationId}</td>
                <td>{station.name}</td>
                <td>{station.bikesAvailable}</td>
                <td>{station.spacesAvailable}</td>
                <td>
                  {this.isSaved(station.stationId)
                    ? <div className="check"></div>
                    : null
                  }
                </td>
                <td>
                  {this.isSaved(station.stationId)
                    ? <button onClick={e => this.removeStation(e, station.stationId)}>Remove</button>
                    : <button onClick={e => this.saveStation(e, station.stationId)}>Save</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired
};

export default Table;
