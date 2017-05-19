import React from 'react';
import styles from './regionFewos.css';
import globalStyles from '../../general-styles/global.css';


const propTypes = {};
const defaultProps = {};

class regionFewos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fewos: []

        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.history.push(`/fewo/${event.target.value}`);
    }

    render() {
        return (
            <div className={globalStyles.wrapper}>
                <h1>Region: {this.props.location.pathname}</h1>
                <button value="HausNebelblick" onClick={this.handleClick} className={globalStyles.button + ' ' + styles.button}>buchen</button>
                <div className={styles.tgwrap}>
                    <table className={styles.tg}>
                        <tbody>
                        <tr>
                            <th className={styles.tgyw4l}>Name (Ferienwohnung)</th>
                            <th className={styles.tgyw4l}>Zimmer</th>
                            <th className={styles.tgyw4l}>Personenanzahl</th>
                            <th className={styles.tgyw4l}>Größe (in cm2)</th>
                            <th className={styles.tgyw4l}>Kinder geeignet</th>
                            <th className={styles.tgyw4l}>Derzeit frei</th>
                            <th className={styles.tgyw4l}>Buchen?</th>
                        </tr>
                        {this.state.fewos.map((fewo, index) =>
                            <tr key={index}>
                                <td value={fewo.apartmentId}>{fewo.name}</td>
                                <td>{fewo.numberOfRooms}</td>
                                <td>{fewo.numberOfPersons}</td>
                                <td>{fewo.size}</td>
                                <td><input checked={fewo.infantsAllowed} type="checkbox"/></td>
                                <td><input checked={fewo.isAvailable} type="checkbox"/></td>
                                <td><input onClick={this.handleClick} type="button"/></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

regionFewos.propTypes = propTypes;
regionFewos.defaultProps = defaultProps;

export default regionFewos;