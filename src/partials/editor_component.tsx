import React, { Component } from 'react';

import coreModule from 'grafana/app/core/core_module';

/**
 * Angular wrapper around the FLux query field
 */
class Editor extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      query: props.query || '',
      selectedCollection: null,
      selectedQuery: null,
    };
    this.collectionChange = this.collectionChange.bind(this);
    this.queryChange = this.queryChange.bind(this);
  }

  handleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  handleChangeQuery = value => {
    const { index, change } = this.props;
    const { query } = this.state;
    const edited = query !== value;
    this.setState({ edited, query: value });
    if (change) {
      change(value, index);
    }
  };

  handlePressEnter = () => {
    const { execute } = this.props;
    if (execute) {
      execute();
    }
  };

  collectionChange(event: any) {
    const { change, execute } = this.props;
    const { selectedQuery } = this.state;
    const selectedCollection = event.target.value;

    this.setState({ selectedCollection });
    console.log(`Collection selected:`, selectedCollection);
    if (change) {
      if (selectedCollection && selectedCollection !== "-1") {
        if (selectedQuery && selectedQuery !== "-1") {
          console.log("call change from collection change");
          change({ query: selectedQuery, collection: selectedCollection });
          execute();
        }
      }
    }
  }

  queryChange(event: any) {
    const { change, execute } = this.props;
    const { selectedCollection } = this.state;
    const selectedQuery = event.target.value;
    this.setState({ selectedQuery });
    console.log(`Query selected:`, selectedQuery);
    if (change) {

      if (selectedQuery && selectedQuery !== "-1") {
        if (selectedCollection && selectedCollection !== "-1") {
          console.log("call change from query change");
          change({ query: selectedQuery, collection: selectedCollection });
          execute();
        }
      }
    }
  }

  createBookmarksOrFacet(): JSX.Element | null {
    const { bookmarks, facets } = this.props;
    if (bookmarks) {
      const selectBookmarkOption: JSX.Element = <option value="-1">Select bookmark</option>
      let bookmartItems = [selectBookmarkOption];
      bookmarks.map((bookmark) => {
        bookmartItems.push(<option value={bookmark.id}>{bookmark.label}</option>);
      });
      return (
        <div className="gf-form">
          <label className="gf-form-label query-keyword">Bookmarks</label>
          <div className="gf-form-select-wrapper">
            <select className="gf-form-input gf-size-auto" onChange={this.collectionChange}>
              {bookmartItems}
            </select>
          </div>
        </div>
      )
    } else if (facets) {
      const selectFacetOption: JSX.Element = <option value="-1">Select facet</option>
      let facetItems = [selectFacetOption];
      facets.map((facet) => {
        facetItems.push(<option value={facet.id}>{facet.label}</option>);
      });
      return (
        <div className="gf-form">
          <label className="gf-form-label query-keyword">Facets</label>
          <div className="gf-form-select-wrapper">
            <select className="gf-form-input gf-size-auto" onChange={this.collectionChange}>
              {facetItems}
            </select>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    const { collections, queries } = this.props;
    const selectCollectionOption: JSX.Element = <option value="-1">Select collection</option>
    const selectQueryOption: JSX.Element = <option value="-1">Select query</option>
    let collectionItems = [selectCollectionOption];
    let queryItems = [selectQueryOption];

    if (queries && queries.length > 0) {
      queries.map((query) => {
        queryItems.push(<option value={query}>{query}</option>);
      }

      )
    }

    if (collections && collections.length > 0) {
      collections.map((collection) => {
        console.log("collectoin", collection);
        const option: JSX.Element = <option value={collection.id}>{collection.label}</option>;
        console.log('option', option);
        collectionItems.push(option);
      }

      );
    }
    console.log('collections', collections)
    console.log('collectionItems', collectionItems)

    console.log("queries", queries)
    console.log("queryItems", queryItems)
    return (
      <div>
        <div className="gf-form-inline" style={{ height: 'initial' }}>
          <div className="gf-form">
            <label className="gf-form-label query-keyword">Collections</label>
            <div className="gf-form-select-wrapper">
              <select className="gf-form-input gf-size-auto" onChange={this.collectionChange}>
                {collectionItems}
              </select>
            </div>
          </div>
          <div className="gf-form">
            <label className="gf-form-label query-keyword">Queries</label>
            <div className="gf-form-select-wrapper">
              <select className="gf-form-input gf-size-auto" onChange={this.queryChange}>
                {queryItems}
              </select>
            </div>
          </div>
        </div>
        <div className="gf-form-inline" style={{ height: 'initial' }}>
          {this.createBookmarksOrFacet()}
        </div>
      </div>

    );
  }
}

coreModule.directive('fluxEditor', [
  'reactDirective',
  reactDirective => {
    return reactDirective(Editor,
      ['change', 'database', 'execute', 'query', 'request', 'collections', 'queries', 'bookmarks', 'facets']);
  },
]);
