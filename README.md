# FLAT - Applikation

## Installation

Zur Installation des Projektes wird das folgenede Git-Repository mit einem entsprechenden Client heruntergeladen.
Je nach System ist ein Git-Client über das Terminal zu erreichen. Andernfalls kann auch ein Client mit graphischer Benutzeroberfläche installiert werden.

Zum Beispiel [GitKraken](https://www.gitkraken.com/download). Ein einfacher und übersichtlicher Client der plattformunabhängig verwendet werden kann.

```
git clone https://github.com/getaflat/FLAT-stack.git
```

Das neu erstellte Verzeichnis `FLAT-stack` beinhaltet den vollständigen Quellcode der Anwendung.
Da sich das Projekt momentan noch stark in der Entwicklung befindet und das Buildsystem mehrfach neu aufgebaut wurde,
sollte die Anwendung aus der `rebuild` Branch gestartet und weiterentwickelt werden.

Mit einem graphischen Git-Client kann man recht einfach zwischen der `master` und `rebuild` Branch wechseln.
Per Terminal wird folgender Befehl im Hauptverzeichnis des Projektes benötigt:

```
git checkout rebuild
```

Hiermit wäre die eigentliche Installation des Projektes abgeschlossen. Alle weiteren Abhängigkeiten etc. werden beim ersten Start des Systems automatisch generiert und installiert.

___

## Abhängigkeiten

Bevor die Applikation zum ersten Mal gestartet werden kann. Muss noch ein [MySQL Server](https://dev.mysql.com/downloads/mysql/) auf dem lokalen System installiert werden.
Während der Installation sollte sowohl die Standard-IP (`localhost` bzw. `127.0.0.1`) als auch der Standard-Port (`3306`) nicht geändert werden.

Des Weiteren benötigt die Anwendung einen eigenen Benutzer der nach der Installation angelegt werden kann.

* Benutzername: `development`
* Passwort: `Daniel Fischer`

Über diesen Benutzer kann die Applikation auf die lokale Datenbank des Systems zugreifen.

Zum Schluss muss in der MySQL Datenbank noch ein leeres Schema `flat_app` erstellt werden.
Entweder über ein CREATE-Statement in der MySQL-Konsole oder Workbench.

```
CREATE DATABASE `flat_app` /*!40100 DEFAULT CHARACTER SET utf8 */;
```

Alternativ kann auch in der Workbench ein Schema über die entsprechende Schaltfläche generiert werden.

___

## Inbetriebnahme

Das System kann bisher nur als Entwicklungsserver gestartet werden. Das Live-System ist momentan noch in der Entwicklung.

### Entwicklungsserver

#### Frontend

Das Frontend benötigt einen eigenen Server der es erlaubt während der Entwicklung die Seite neu zu laden.
Damit Änderungen ohne einen Neustart sichtbar werden.

In [IntelliJ 2017.1](https://www.jetbrains.com/idea/download/) können [Gradle](https://gradle.org/) Tasks über das bereits integrierte Gradle-Plugin gestartet werden.
Der entsprechende Task (`development`) befindet sich im `frontend` Projekt unter den `other` Tasks. Ein Doppelklick auf den Task sollte diesen starten.

Im Terminal kann dieser Task mit Hilfe des [Gradle-Wrappers](https://docs.gradle.org/current/userguide/gradle_wrapper.html) starten. Dieser wurde bereits konfiguriert und mit dem Projekte mitgeliefert.
Im Hauptverzeichnis des Projekts wird folgender Befehl im Terminal eingegeben:

```
gradlew frontend:development
```

Dies sollte einen lokalen [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) starten. Erreichbar ist dieser unter `http://localhost:9090/`.
Allerdings liefert der Frontend-Server nur JavaScript-Dateien die bei Änderungen erneut gebündelt werden.
Dieser Server funktioniert als Proxy, der die Anfragen an das Backend weiterleitet, aber zum Beispiel JavaScript-Dateien selbst liefert.

#### Backend

Das Backend kann ebenfalls über einen Gradle-Task gestartet werden. Der entsprechende Task (`bootRun`) befindet sich im `backend` Projekt unter den `application` Tasks.

Im Terminal kann dieser Task folgendermaßen ausgeführt werden:

```
gradlew backend:bootRun
```

Der Server sollte unter `http://localhost:8080/` erreichbar sein. Allerdings wird nur eine leere Seite dargestellt.
Damit das Frontend ebenfalls geladen wird, darf nicht direkt auf das Backend zugegriffen werden sondern über den Frontend-Proxy.
Der Aufruf von `http://localhost:9090/` im Browser sollte nun die Startseite der Applikation anzeigen.

### Produktionsserver

WIP