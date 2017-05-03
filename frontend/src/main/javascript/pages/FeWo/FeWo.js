import React from 'react';

const propTypes = {};

const defaultProps = {};

class FeWo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <wrapper>
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
           </wrapper>
        );
    }
}

FeWo.propTypes = propTypes;
FeWo.defaultProps = defaultProps;

export default FeWo;
