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

class regionFewos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fewos: []

        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        api.get('/apartments').then(({ data }) => {
            let apartments = data._embedded.apartments;
            this.setState((prev, props) => {
                return { fewos: apartments }
            });
        }).catch(() => {
            console.error(arguments)
        })
    }

    handleClick(event) {
        this.props.history.push(`/fewo/${event.target.value}`);
    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <h1>Region: {this.props.match.params.id}</h1>
                <Link className={styles.link} to={"/fewo/" + this.props.match.params.id}>Testhaus</Link>
                <div className={styles.tgwrap}>
                    <Table rowsCount={this.state.fewos.length} height={1000}
                           width={1200}
                           rowHeight={30} headerHeight={30}>
                        <Column
                            header={<Cell>Name (Ferienwohnung)</Cell>}
                            cell = {<TextCell data={this.state.fewos} field="name" />}
                            width={200} />
                        <Column
                            header={<Cell>Zimmer</Cell>}
                            cell = {<TextCell data={this.state.fewos} field="numberOfRooms" />}
                            width={200} />
                        <Column
                            header={<Cell>Personenanzahl</Cell>}
                            cell = {<TextCell data={this.state.fewos} field="numberOfPersons" />}
                            width={200} />
                        <Column
                            header={<Cell>Größe (in cm²)</Cell>}
                            cell = {<TextCell data={this.state.fewos} field="size" />}
                            width={200} />
                        <Column
                            header={<Cell>Kinder geeignet</Cell>}
                            cell = {<TextCell data={this.state.fewos} field="infantsAllowed" />}
                            width={200} />
                        <Column
                            header={<Cell>Derzeit frei</Cell>}
                            cell = {<TextCell data={this.state.fewos} field="isAvailable" />}
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