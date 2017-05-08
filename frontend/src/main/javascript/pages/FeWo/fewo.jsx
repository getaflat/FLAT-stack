import React from 'react';
import styles from './fewo.css';

const propTypes = {};

const defaultProps = {};

class FeWo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <div className={styles.wrapper}>
               <h1>FeWo Default Seite</h1>
               <div id="Bilder">
                   <div id="großesBild">
                       Großes FeWo Bild
                   </div>
                   <div id="kleinesBilder">
                       kleine FeWo Bilder
                   </div>
                   <div id="FeWoDescr">
                       <h1>Beschreibung der FeWo</h1>
                       <a>blablabla</a>
                   </div>
               </div>
           </div>
        );
    }
}

FeWo.propTypes = propTypes;
FeWo.defaultProps = defaultProps;

export default FeWo;
