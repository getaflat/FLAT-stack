import React from 'react';
import styles from './gtc.css';
import globalStyles from '../../general-styles/global.css';
import Modal from '../../components/Modal/modal';


const propTypes = {};

const defaultProps = {};

class GTC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({isModalOpen: true});
    }

    handleCloseModal() {
        this.setState({
            isModalOpen: false
        })
    }

    render() {
        return (
            <div className={globalStyles.wrapper + ' ' + styles.wrapper}>
                <h2>Datenschutz</h2>
                <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                <p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.</p>
                <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p><br />
                <h2>Cookies</h2>
                <p>Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.</p>
                <p>Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.</p>
                <p>Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.</p><br />
                <h2>SSL-Verschlüsselung</h2>
                <p>Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
                <p>Wenn die SSL Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p><br />
                <p><em>Quellverweis: <a href="https://www.e-recht24.de">eRecht24</a></em></p>
                <h1>Allgemeine Gesch&auml;ftsbedingungen</h1><br /><h2>Vertragspartner</h2>Auf Grundlage dieser Allgemeinen Gesch&auml;ftsbedingungen (AGB) kommt zwischen dem Kunden und <br />FLAT<br />Vertreten durch Thomas, von Aquin<br />Adresse: Fantasystra&szlig;e 666  12345 Nixtown<br />
                , nachfolgend Anbieter genannt, der Vertrag zustande. <h2>Vertragsgegenstand</h2>Durch diesen Vertrag wird der Verkauf von
                Dienstleistungen
                aus dem Bereich/den Bereichen Ferienwohnungssharing
                &uuml;ber den Online-Shop des Anbieters geregelt. Wegen der Details des jeweiligen Angebotes wird auf die Produktbeschreibung der Angebotsseite verwiesen. <h2>Vertragsschluss</h2><br />                Der Vertrag kommt im elektronischen Gesch&auml;ftsverkehr &uuml;ber das Shop-System oder &uuml;ber andere Fernkommunikationsmittel wie Telefon und E-Mail zustande. Dabei stellen die dargestellten Angebote eine unverbindliche Aufforderung zur Abgabe eines Angebots durch die Kundenbestellung dar, das der Anbieter dann annehmen kann.<br /><br />                <p>Der Bestellvorgang zum Vertragsschluss umfasst im Shop-System folgende Schritte:</p><ul><li>nichts</li></ul><br /><br />                <p>Bestellungen k&ouml;nnen neben dem Shop-System auch &uuml;ber Fernkommunikationsmittel (Telefon/E-Mail) aufgegeben werden, wodurch der Bestellvorgang zum Vertragsschluss folgende Schritte umfasst: </p><ul><li>nichts</li></ul><br />
                Mit der Zusendung einer Auftragsbest&auml;tigung kommt der Vertrag zustande. Die automatisch erstellte und versandte Bestellbest&auml;tigung stellt keine entsprechende rechtsverbindliche Erkl&auml;rung dar. Der Vertrag kommt auch durch die Zusendung der Ware oder Erbringung der Dienstleistung zustande. <h2>Vertragsdauer</h2>Der Vertrag wird auf unbestimmte Zeit geschlossen.  <h2>Preise, Versandkosten, R&uuml;cksendekosten</h2>Alle Preise sind Endpreise und enthalten die gesetzliche Umsatzsteuer.
                Neben den Endpreisen fallen je nach Versandart weitere Kosten an, die vor Versendung der Bestellung angezeigt werden.
                Besteht ein Widerrufsrecht und wird von diesem Gebrauch gemacht, tr&auml;gt der Kunde die Kosten der R&uuml;cksendung. <h2>Zahlungsbedingungen</h2>Der Kunde hat ausschlie&szlig;lich folgende M&ouml;glichkeiten zur Zahlung:
                Lastschrifteinzug
                ,
                Zahlungsdienstleister (PayPal)
                . Weitere Zahlungsarten werden nicht angeboten und werden zur&uuml;ckgewiesen.<br />
                Der Rechnungsbetrag wird vom Anbieter mittels Lastschriftverfahren auf Grundlage der Einzugserm&auml;chtigung durch den Kunden von dessen angegebenem Konto eingezogen.
                Bei Verwendung eines Treuhandservice/ Zahlungsdienstleisters erm&ouml;glicht es dieser dem Anbieter und Kunden, die Zahlung untereinander abzuwickeln. Dabei leitet der Treuhandservice/ Zahlungsdienstleister die Zahlung des Kunden an den Anbieter weiter. Weitere Informationen erhalten Sie auf der Internetseite des jeweiligen Treuhandservices/ Zahlungsdienstleisters.
                <br />                Der Kunde ist verpflichtet innerhalb von 14 Tagen nach Erhalt der Rechnung den ausgewiesenen Betrag auf das auf der Rechnung angegebene Konto einzuzahlen oder zu &uuml;berweisen.<br />
                <br />                Die Zahlung ist ab Rechnungsdatum ohne Abzug f&auml;llig. Der Kunde kommt erst nach Mahnung in Verzug.<br />               <h2>Lieferbedingungen</h2><br />                Die Ware wird umgehend nach best&auml;tigtem Zahlungseingang versandt.<br />
                Der Versand erfolgt durchschnittlich sp&auml;testens nach 1 Tagen.
                Der Unternehmer verpflichtet sich zur Lieferung am 4. Tag nach
                best&auml;tigtem Zahlungseingang.
                <br />                Die Regellieferzeit betr&auml;gt 2 Tage, wenn in der Artikelbeschreibung nichts anderes angegeben ist.<br />
                Der Anbieter versendet die Bestellung aus eigenem Lager, sobald die gesamte Bestellung dort vorr&auml;tig ist.  <h2>Widerrufsrecht und Kundendienst</h2>Auf die Kunden, die Unternehmer sind, sind die Vorschriften f&uuml;r Fernabsatzvertr&auml;ge nicht anwendbar. Daher steht diesen Kunden kein entsprechendes Widerrufsrecht wegen Fernabsatzvertrag zu. Der Anbieter r&auml;umt ein solches auch nicht ein. <h2>Haftungsausschluss</h2>Schadensersatzanspr&uuml;che des Kunden sind ausgeschlossen, soweit sich aus den nachfolgenden Gr&uuml;nden nicht etwas anderes ergibt. Dies gilt auch f&uuml;r den Vertreter und Erf&uuml;llungsgehilfen des Anbieters, falls der Kunde gegen diese Anspr&uuml;che auf Schadensersatz erhebt. Ausgenommen sind Schadensersatzanspr&uuml;che des Kunden wegen Verletzung des Lebens, des K&ouml;rpers, der Gesundheit oder wesentlicher Vertragspflichten, welche zur Erreichung des Vertragszieles notwendigerweise erf&uuml;llt werden m&uuml;ssen. Ebenso gilt dies nicht f&uuml;r Schadensersatzanspr&uuml;che nach grob fahrl&auml;ssiger oder vors&auml;tzlicher Pflichtverletzung des Anbieters oder seines gesetzlichen Vertreters oder Erf&uuml;llungsgehilfen. <h2>Abtretungs- und Verpf&auml;ndungsverbot</h2>Anspr&uuml;che oder Rechte des Kunden gegen den Anbieter d&uuml;rfen ohne dessen Zustimmung nicht abgetreten oder verpf&auml;ndet werden, es sei denn der Kunde hat ein berechtigtes Interesse an der Abtretung oder Verpf&auml;ndung nachgewiesen. <h2>Sprache, Gerichtsstand und anzuwendendes Recht</h2>Der Vertrag wird in Deutsch abgefasst. Die weitere Durchf&uuml;hrung der Vertragsbeziehung erfolgt in Deutsch.
                Es findet ausschlie&szlig;lich das Recht der Bundesrepublik Deutschland Anwendung. F&uuml;r Verbraucher gilt dies nur insoweit, als dadurch keine gesetzlichen Bestimmungen des Staates eingeschr&auml;nkt werden, in dem der Kunde seinen Wohnsitz oder gew&ouml;hnlichen Aufenthalt hat.  <div><h2>Umsetzung der ODR-Richtlinie</h2><b>Online-Streitbeilegung gem&auml;&szlig; Art. 14 Abs. 1 ODR-VO</b> <br />Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter <a href="http://ec.europa.eu/consumers/odr/">http://ec.europa.eu/consumers/odr/</a> finden.
                <div>Hinweis nach § 36 Abs. 1 Nr. 2 VSBG: Wir weisen Sie darauf hin, dass wir f&uuml;r eine Teilnahme an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle nicht zur Verf&uuml;gung stehen.“</div> </div>

            </div>
        );
    }
}

GTC.propTypes = propTypes;
GTC.defaultProps = defaultProps;

export default GTC;