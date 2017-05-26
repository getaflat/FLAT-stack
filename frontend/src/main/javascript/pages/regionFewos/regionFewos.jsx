import React from 'react';
import styles from './regionFewos.css';
import globalStyles from '../../general-styles/global.css';
import api from '../../services/api';

import { Table, Column, Cell } from 'fixed-data-table';

import { Link } from 'react-router-dom';


const propTypes = {};
const defaultProps = {};

class TextCell extends React.Component {
    render() {
        const {rowIndex, field, data, props} = this.props;
        return (
            <Cell {...props}>
                {data[rowIndex][field]}
            </Cell>
        );
    }
}

class LinkCell extends React.Component {
    render() {
        const {rowIndex, field, data, props} = this.props;
        let name = data[rowIndex][field];
        return (
            <Cell {...props}>
                <Link to={`/fewo/${name}`}>{name}</Link>
            </Cell>
        );
    }
}

class SortableHeaderCell extends React.Component {
    render() {
        return (
            <div>
                <span>{this.props.label}</span>
                <input onChange={(event) => this.props.onFilterChange(this.props.field, event)} />
            </div>
        );
    }
}

class TrueFalseCell extends React.Component {
    render() {
        const {rowIndex, field, data, props} = this.props;
        let value = data[rowIndex][field];
        let label = value ? this.props.isTrue : this.props.isFalse;
        return (
            <Cell {...props}>
                {label}
            </Cell>
        );
    }
}

class regionFewos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fewos: [],
            filteredDataList: []

        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        api.get('/apartments').then(({ data }) => {
            let apartments = data._embedded.apartments.map((apartment) => {
                let infantsAllowed = apartment.infantsAllowed ? "Ja" : "Nein";
                let isAvailable = apartment.isAvailable ? "Ja" : "Nein";

                return {
                    ...apartment,
                    infantsAllowed,
                    isAvailable
                }
            });
            this.setState((prev, props) => {
                return { fewos: apartments, filteredDataList: apartments }
            });
        }).catch(() => {
            console.error(arguments)
        })
    }

    handleClick(event) {
        this.props.history.push(`/fewo/${event.target.value}`);
    }

    onFilterChange(field, event) {
        let { value } = event.target;

        if (!value) {
            this.setState({
                filteredDataList: this.state.fewos
            })
        }

        let keyword = value.toString().toLowerCase();
        // let size = this.state.fewos.length;

        let filtered = this.state.fewos.filter((fewo) => (
            fewo[field].toString().toLowerCase().indexOf(keyword) !== -1
        ));

        this.setState({
            filteredDataList: filtered
        });
    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <h1>Region: {this.props.match.params.id}</h1>
                <div className={styles.tgwrap}>
                    <Table rowsCount={this.state.filteredDataList.length} height={1000}
                           width={1200}
                           rowHeight={30} headerHeight={60}>
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="name" label="Name (Ferienwohnung)" />}
                            cell = {<LinkCell data={this.state.filteredDataList} field="name" />}
                            width={200} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="numberOfRooms" label="Zimmer" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="numberOfRooms" />}
                            width={200} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="numberOfPersons" label="Personenanzahl" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="numberOfPersons" />}
                            width={200} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="size" label="Größe (in cm²)" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="size" />}
                            width={200} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="infantsAllowed" label="Kinder geeignet" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="infantsAllowed" />}
                            width={200} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="isAvailable" label="Derzeit frei" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="isAvailable" />}
                            width={200} />
                    </Table>
                </div>
            </div>
        );
    }
}

regionFewos.propTypes = propTypes;
regionFewos.defaultProps = defaultProps;

export default regionFewos;