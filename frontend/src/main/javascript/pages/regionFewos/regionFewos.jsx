import React from 'react';

import api from '../../services/api';

import { Table, Column, Cell } from 'fixed-data-table';

import { Link } from 'react-router-dom';

import styles from './regionFewos.css';
import globalStyles from '../../general-styles/global.css';

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
                <input className={styles.input} onChange={(event) => this.props.onFilterChange(this.props.field, event)} />
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

export default class regionFewos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fewos: [],
            filteredDataList: [],
            picture: '',
            description: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        api.get('/residential-blocks/search/findByName', {
            params: {
                name: this.props.match.params.id
            }
        }).then(({ data }) => {
            this.setState({
                picture: 'data:image/png;base64,' + data.image1,
                description: data.details
            });

            return api.get('/apartments/search/findByResidentialBlockId', {
                params: {
                    residentialBlockId: data.residentialBlockId
                }
            });
        }).then(({ data }) => {
            let apartments = data._embedded.apartments.map((apartment) => {
                let infantsAllowed = apartment.infantsAllowed ? "Ja" : "Nein";
                let isAvailable = apartment.isAvailable ? "Ja" : "Nein";

                return {
                    ...apartment,
                    infantsAllowed,
                    isAvailable
                }
            });

            this.setState({
                fewos: apartments,
                filteredDataList: apartments
            });
        }).catch(() => {
            // console.error(arguments)
        });
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

        let filtered = this.state.fewos.filter((fewo) => (
            fewo[field].toString().toLowerCase().indexOf(keyword) !== -1
        ));

        this.setState({
            filteredDataList: filtered
        });
    }

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <div className={styles.leftSide}>
                    <div> <img className={styles.image} src={this.state.picture}/> </div>
                    <br/>
                <h1>Region: <br/>{this.props.match.params.id}</h1> {/*id herkunft*/}
                </div>

                <div className={styles.rightSide}>
                <div>
                    {this.state.description}
                </div>
                <br/>
                <div>
                    <Table rowsCount={this.state.filteredDataList.length} height={212}
                           width={750}
                           rowHeight={30} headerHeight={60}>
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="name" label="Name (Ferienwohnung)" />}
                            cell = {<LinkCell data={this.state.filteredDataList} field="name" />}
                            width={200} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="numberOfRooms" label="Zimmer" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="numberOfRooms" />}
                            width={75} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="numberOfPersons" label="Personenanzahl" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="numberOfPersons" />}
                            width={125} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="size" label="Größe (in cm²)" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="size" />}
                            width={125} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="infantsAllowed" label="Kinder geeignet" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="infantsAllowed" />}
                            width={125} />
                        <Column
                            header={<SortableHeaderCell onFilterChange={this.onFilterChange.bind(this)} field="isAvailable" label="Derzeit frei" />}
                            cell = {<TextCell data={this.state.filteredDataList} field="isAvailable" />}
                            width={100} />
                    </Table>
                </div>
                </div>
            </div>
        );
    }
}