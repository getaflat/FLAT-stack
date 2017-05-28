package edu.hsog.flat.backend;

import edu.hsog.flat.backend.model.*;
import edu.hsog.flat.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Date;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final ApartmentRepository aRepository;
    private final BookingRepository bRepository;
	private final CustomerRepository cRepository;
	private final FactorRepository fRepository;
	private final ImageRepository iRepository;
	private final RatingRepository raRepository;
	private final ResidentialBlockRepository rbRepository;
	private final SeasonRepository sRepository;

	@Autowired
	public DatabaseLoader(ApartmentRepository aRepository, BookingRepository bRepository, CustomerRepository cRepository, FactorRepository fRepository, ImageRepository iRepository, RatingRepository raRepository, ResidentialBlockRepository rbRepository, SeasonRepository sRepository) {
        this.aRepository = aRepository;
        this.bRepository = bRepository;
	    this.cRepository = cRepository;
	    this.fRepository = fRepository;
	    this.iRepository = iRepository;
	    this.raRepository = raRepository;
	    this.rbRepository = rbRepository;
	    this.sRepository = sRepository;

	    this.aRepository.deleteAll();
        this.bRepository.deleteAll();
        this.cRepository.deleteAll();
        this.fRepository.deleteAll();
        this.iRepository.deleteAll();
        this.raRepository.deleteAll();
        this.rbRepository.deleteAll();
        this.sRepository.deleteAll();
	}

	@Override
	public void run(String... strings) throws Exception {

	    ResidentialBlock rb1 = new ResidentialBlock();
	    rb1.setResidentialBlockId(1L);
	    rb1.setName("Komplex Mallorca");
	    rb1.setDetails("Der Kontrast auf schroffer Felsküste und herrlichen Sandstränden ist nur eines der Dinge, die den Reiz dieser Mittelmeer-Insel ausmachen. Die Hauptstadt Palma de Mallorca mit ihrem weit bekannten Nachtleben liegt circa eine Stunde mit dem Auto, das im Ort gemietet werden kann, entfernt. Aber auch die öffentlichen Verkehrsmittel sind gut ausgebaut. \n" +
                "In unserer Anlage, bestehend aus 5 Wohnungen und Häuschen, finden sie alles, was einen entspannten Urlaub ausmacht. Ein kleiner Supermarkt ist vor Ort, ebenso wie im Dorf diverse weitere Geschäft und ein Arzt zu finden sind. Der große Gemeinschaftspool steht nur unseren Gästen zur Verfügung, aber auch der Strand ist nur wenige Gehminuten entfernt. Neben Baden stehen auch Wandern, Reiten und Tennis spielen (beides im Ort) zur Freizeitgestaltung zur Auswahl.\n");
        rb1.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mediterranean_sea/residential_block1/Costa_Brava.JPG"));
        rb1.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mediterranean_sea/residential_block1/dorf.jpeg"));
        this.rbRepository.save(rb1);

        ResidentialBlock rb2 = new ResidentialBlock();
        rb2.setResidentialBlockId(2L);
        rb2.setName("Komplex Italien");
        rb2.setDetails("Diese kinderfreundliche Anlage im Westen von Italien besticht durch ihre kilometerlangen Sandstrände. Natürlich gibt es die landestypische Küche mit Pizza und Pasta an vielen Stellen in der Nähe dieser urbanen Anlage zu kaufen. Das Hinterland ist mit seinen Bergen und Schluchten ein idealer Kontrast zur Küste. Unsere 5 Wohneinheiten bieten für jeden Geschmack etwas. Einkaufsmöglichkeiten sind gut zu Fuß zu Erreichen, am Dienstag und Samstag finden auf dem zentralen Marktplatz schöne Märkte mit einem breiten Angebot von Obst und Gemüse, sowie Fleischwaren direkt vom Erzeuger bis hin zu Kleidung und Spielwaren, statt.\n");
        rb2.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mediterranean_sea/residential_block2/les_gorges_du_tarn.jpg"));
        rb2.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mediterranean_sea/residential_block2/Strand_Brandung.jpg"));
        this.rbRepository.save(rb2);

        ResidentialBlock rb3 = new ResidentialBlock();
        rb3.setResidentialBlockId(3L);
        rb3.setName("Komplex Berge");
        rb3.setDetails("Die beiden liebevoll eingerichteten, traditionellen Häuser beherbergen insgesamt 5 Wohnungen. Im Sommer locken die Berge zum Wandern und auch der nahe gelegene Badesee sorgt für Erfrischung. Im Winter bietet sich das Skigebiet mit 3 Liften und Pisten für Anfänger bis Profis an. auch Ski- und Snowboardkurse werden veranstaltet. Einkaufsmöglichkeiten befinden sich direkt im Dorf, die nächste Stadt ist ca 30 Minuten mit dem Auto entfernt.\n");
        rb3.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mountain/residential_block/bergsee.jpg"));
        rb3.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mountain/residential_block/FerienwohnungBegeAussenSchnee.jpeg"));
        this.rbRepository.save(rb3);

        ResidentialBlock rb4 = new ResidentialBlock();
        rb4.setResidentialBlockId(4L);
        rb4.setName("Komplex Nordsee");
        rb4.setDetails("Urban gelegen, unweit des Sandstrandes liegt dieser Komplex aus 5 Ferienwohnungen. Die überwiegend gehobene Ausstattung der Wohnungen ist ideal zum Entspannen. Genießen sie hier die schönste Zeit des Jahres mit Blick auf den Hafen und die Nordsee. Die Küstenpromenade lädt zum Bummeln ein, und bestimmt finden sie in der nähren Umgebung auch ein gastronomisches Angebot nach ihrem Geschmack. Tagsüber lädt das Meer zum Baden ein oder sie relaxen in einem der vielen zur Vermietung stehenden Strandkörbe. Auch Abends kommen sie hier auf ihre Kosten, denn das Stadtzentrum mit seinen Bars und Clubs ist nur wenige Gehminuten entfernt.\n");
        rb4.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/north_baltic_sea/residential_block1/FeWoSeeAussen.jpg"));
        rb4.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/north_baltic_sea/residential_block1/FeWoSeeHafen.jpg"));
        this.rbRepository.save(rb4);

        ResidentialBlock rb5 = new ResidentialBlock();
        rb5.setResidentialBlockId(5L);
        rb5.setName("Komplex Ostsee");
        rb5.setDetails("Unsere kleine Feriensiedlung bestehend aus 5 Häusern, die direkt am Wasser gebaut wurden, bietet Familien alles was sie für einen entspannten Urlaub brauchen. Ein Kinderspielplatz gehört ebenfalls zum Gelände genauso wie ein kleiner Privatstrand nur für unsere Gäste. In der Umgebung laden die typischen Dämme, die hier bis direkt an die Küstenlinie reichen, zum Wandern und Spazieren gehen ein. vielleicht begegnet ihnen unterwegs ja sogar eine Schafherde! Ein kleiner Supermarkt mit Bäckerei befindet sich nur circa 10 Gehminuten entfernt (Parkplätze vorhanden) Bis zur nächst größeren Stadt sind es circa 20 Minuten mit dem Auto.");
        rb5.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/north_baltic_sea/residential_block2/FeWoSeeStrand.jpg"));
        rb5.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/north_baltic_sea/residential_block2/FeWoSeeAussen3.jpeg"));
        this.rbRepository.save(rb5);


	    Apartment a1 = new Apartment();
	    a1.setApartmentId(1L);
        a1.setResidentialBlockId(rb2.getResidentialBlockId());
	    a1.setIsAvailable(true);
	    a1.setName("FeWo-Italien-1");
	    a1.setDescription("Die beiden liebevoll eingerichteten, traditionellen Häuser beherbergen insgesamt 5 Wohnungen. Im Sommer locken die Berge zum Wandern und auch der nahe gelegene Badesee sorgt für Erfrischung. Im Winter bietet sich das Skigebiet mit 3 Liften und Pisten für Anfänger bis Profis an. auch Ski- und Snowboardkurse werden veranstaltet. Einkaufsmöglichkeiten befinden sich direkt im Dorf, die nächste Stadt ist ca 30 Minuten mit dem Auto entfernt.\n");
	    a1.setNumberOfRooms(4);
	    a1.setSize(153.5);
	    a1.setNumberOfPersons(6);
	    a1.setBasePrice(500);
	    a1.setHasBalcony(true);
	    a1.setAnimalsAllowed(false);
	    a1.setInfantsAllowed(false);
	    this.aRepository.save(a1);

        Apartment a2 = new Apartment();
        a2.setApartmentId(2L);
        a2.setResidentialBlockId(rb1.getResidentialBlockId());
        a2.setIsAvailable(true);
        a2.setName("FeWo-Mallorca-2");
        a2.setDescription("Diese kleine rustikale Häuschen ist für 3 Personen ausgelegt. Es gibt 2 Schlafzimmer, eines mit Doppelbett und ein Einzelbettzimmer. Der Freisitz direkt vor dem Wohnbereich ist ein idealer Aufenthaltsort um zu entspannen und die spanische Sonne zu genießen.\n" +
                "Die Küche ist voll ausgestattet mit 4 Platten Herd, Spülmaschine, Mikrowelle, Toaster, Kaffeemaschine, Wasserkocher und Waschmaschine.\n");
        a2.setNumberOfRooms(3);
        a2.setSize(87.5);
        a2.setNumberOfPersons(3);
        a2.setBasePrice(300);
        a2.setHasBalcony(true);
        a2.setAnimalsAllowed(true);
        a2.setInfantsAllowed(true);
        this.aRepository.save(a2);

        Apartment a3 = new Apartment();
        a3.setApartmentId(3L);
        a3.setResidentialBlockId(rb1.getResidentialBlockId());
        a3.setIsAvailable(true);
        a3.setName("FeWo-Mallorca-3");
        a3.setDescription("Diese nobel eingerichtete Häuschen bietet neben seiner großen landestypischen Wohnküche 2 Schlafzimmer (einmal Doppelbett, einmal 2 Einzelbetten). Der halboffenen Kamin im Wohnzimmer lässt auch etwas kühlere Abende gemütlich werden. Der Balkon ist mit Sitzmöglichkeiten ausgestattet.\n" +
                "Die Küche ist voll ausgestattet mit 4 Platten Herd, Spülmaschine, Mikrowelle, Toaster, Kaffeemaschine, Wasserkocher und Waschmaschine.\n");
        a3.setNumberOfRooms(3);
        a3.setSize(92.3);
        a3.setNumberOfPersons(4);
        a3.setBasePrice(360);
        a3.setHasBalcony(true);
        a3.setAnimalsAllowed(true);
        a3.setInfantsAllowed(true);
        this.aRepository.save(a3);

        Apartment a4 = new Apartment();
        a4.setApartmentId(4L);
        a4.setResidentialBlockId(rb1.getResidentialBlockId());
        a4.setIsAvailable(false);
        a4.setName("FeWo-Mallorca-4");
        a4.setDescription("Außergewöhnliches Haus mit 2 Etagen, dass durch einen Bootsrumpf im Wohnbereich sofort maritime Gefühle aufkommen lässt. Ein Doppelbett ist in der offenen 2. Etage und ein Zimmer mit einem Einzelbett im Erdgeschoss. Von der Terrasse aus haben sie einen fabelhaften Blick auf das Mittelmeer.\n" +
                "Die Küche ist voll ausgestattet mit 4 Platten Herd, Spülmaschine, Mikrowelle, Toaster, Kaffeemaschine, Wasserkocher und Waschmaschine.\n");
        a4.setNumberOfRooms(4);
        a4.setSize(140.2);
        a4.setNumberOfPersons(3);
        a4.setBasePrice(560);
        a4.setHasBalcony(true);
        a4.setAnimalsAllowed(true);
        a4.setInfantsAllowed(false);
        this.aRepository.save(a4);

        Apartment a5 = new Apartment();
        a5.setApartmentId(5L);
        a5.setResidentialBlockId(rb2.getResidentialBlockId());
        a5.setIsAvailable(false);
        a5.setName("FeWo-Italien-5");
        a5.setDescription("Die große, moderne Küche lässt genug Platz um für eine große Familie oder für Freunde zu kochen.  Im rustikalen Ess- und Wohnbereich sorgen Natursteinelemente in den Wänden für einen mediterranen Flair. Es gibt 3 Schlafzimmer (Einmal Doppelbett, zweimal zwei Einzelbetten).\n" +
                "Die Küche ist voll ausgestattet mit 4 Platten Herd, Spülmaschine, Mikrowelle, Toaster, Kaffeemaschine, Wasserkocher und Waschmaschine.\n");
        a5.setNumberOfRooms(5);
        a5.setSize(134.6);
        a5.setNumberOfPersons(6);
        a5.setBasePrice(760);
        a5.setHasBalcony(false);
        a5.setAnimalsAllowed(false);
        a5.setInfantsAllowed(false);
        this.aRepository.save(a5);

        Apartment a6 = new Apartment();
        a6.setApartmentId(6L);
        a6.setResidentialBlockId(rb2.getResidentialBlockId());
        a6.setIsAvailable(true);
        a6.setName("FeWo-Italien-6");
        a6.setDescription("In dieser offen gestalteten Wohnung über 2 Etagen finden 4 Personen in 2 Schlafräumen Platz (Einmal Doppelbett in offenere Galerie, einmal zwei Einzelbetten). Der kleine Balkon bietet einen schönen Blick über die Stadt und hinaus aufs Meer.\n" +
                "Die Küche ist voll ausgestattet mit 4 Platten Herd, Spülmaschine, Mikrowelle, Toaster, Kaffeemaschine, Wasserkocher und Waschmaschine.\n");
        a6.setNumberOfRooms(3);
        a6.setSize(101.6);
        a6.setNumberOfPersons(4);
        a6.setBasePrice(380);
        a6.setHasBalcony(true);
        a6.setAnimalsAllowed(false);
        a6.setInfantsAllowed(false);
        this.aRepository.save(a6);

        Apartment a7 = new Apartment();
        a7.setApartmentId(7L);
        a7.setResidentialBlockId(rb1.getResidentialBlockId());
        a7.setIsAvailable(false);
        a7.setName("FeWo-Mallorca-7");
        a7.setDescription("Diese große Wohnung  ist im Erdgeschoss eines Hauses mit 2 Wohneinheiten. Sein rustikales Wohnzimmer wird von der modernen Küche mit Essecke optimal ergänzt. 6 Personen finden in den 3 Schlafzimmern problemlos Platz (einmal Doppelbett und zweimal 2 Einzelbetten).\n" +
                "Die Küche ist voll ausgestattet mit 4 Platten Herd, Spülmaschine, Mikrowelle, Toaster, Kaffeemaschine, Wasserkocher und Waschmaschine.\n");
        a7.setNumberOfRooms(5);
        a7.setSize(162.6);
        a7.setNumberOfPersons(6);
        a7.setBasePrice(700);
        a7.setHasBalcony(false);
        a7.setAnimalsAllowed(true);
        a7.setInfantsAllowed(true);
        this.aRepository.save(a7);

        Apartment a8 = new Apartment();
        a8.setApartmentId(8L);
        a8.setResidentialBlockId(rb2.getResidentialBlockId());
        a8.setIsAvailable(true);
        a8.setName("FeWo-Italien-8");
        a8.setDescription("Von der sonnen-geschützten Lounge-Ecke auf dem Balkon dieser Wohnung bietet sich ein toller Blick hinaus auf Mittelmeer. Es gibt 2 Schlafzimmer (einmal Doppelbett, einmal drei Einzelbetten).\n" +
                "Die Küche ist voll ausgestattet mit 4 Platten Herd, Spülmaschine, Mikrowelle, Toaster, Kaffeemaschine, Wasserkocher und Waschmaschine.\n");
        a8.setNumberOfRooms(4);
        a8.setSize(140.0);
        a8.setNumberOfPersons(5);
        a8.setBasePrice(560);
        a8.setHasBalcony(true);
        a8.setAnimalsAllowed(true);
        a8.setInfantsAllowed(true);
        this.aRepository.save(a8);

        Apartment a9 = new Apartment();
        a9.setApartmentId(9L);
        a9.setResidentialBlockId(rb1.getResidentialBlockId());
        a9.setIsAvailable(true);
        a9.setName("FeWo-Mallorca-9");
        a9.setDescription("Spanische Sonne, ein guter heimischer Wein und dazu frisch gegrilltes, das biete ihnen diese Wohnung im Obergeschoss eines Hauses mit nur 2 Wohneinheiten. Der offenen Wohnbereich und die gemütliche Küche bieten auch an kühleren Abenden Platz für 5 Personen (3 Schlafzimmer, einmal Doppelbett, einmal 2 Einzelbetten und einmal ein Einzelbett). Der große Balkon mit gemauertem Grill lässt sie ihren Urlaub rundum genießen.\n" +
                "Die Küche ist voll ausgestattet mit 4 Platten Herd, Spülmaschine, Mikrowelle, Toaster, Kaffeemaschine, Wasserkocher und Waschmaschine. \n");
        a9.setNumberOfRooms(5);
        a9.setSize(137.5);
        a9.setNumberOfPersons(5);
        a9.setBasePrice(622);
        a9.setHasBalcony(true);
        a9.setAnimalsAllowed(false);
        a9.setInfantsAllowed(false);
        this.aRepository.save(a9);

        Apartment a10 = new Apartment();
        a10.setApartmentId(10L);
        a10.setResidentialBlockId(rb2.getResidentialBlockId());
        a10.setIsAvailable(true);
        a10.setName("FeWo-Italien-10");
        a10.setDescription("Diese ländlich eingerichtete 3 Zimmer Wohnung ist der ideale Ausgangspunkt für Badeausflüge, Wanderungen im Hinterland oder Shoppingtouren. In den beiden Schlafzimmern (einmal Doppelbett und einmal zwei Einzelbetten) finden 4 Personen Platz. Die offenen Küche verströmt einen besonderen mediterranen Charme.\n" +
                "Die Küche ist voll ausgestattet mit 4 Platten Herd, Spülmaschine, Mikrowelle, Toaster, Kaffeemaschine, Wasserkocher und Waschmaschine.\n");
        a10.setNumberOfRooms(4);
        a10.setSize(128.8);
        a10.setNumberOfPersons(4);
        a10.setBasePrice(620);
        a10.setHasBalcony(false);
        a10.setAnimalsAllowed(false);
        a10.setInfantsAllowed(false);
        this.aRepository.save(a10);

        Apartment a11 = new Apartment();
        a11.setApartmentId(11L);
        a11.setResidentialBlockId(rb3.getResidentialBlockId());
        a11.setIsAvailable(true);
        a11.setName("FeWo-Berge-1");
        a11.setDescription("Gemütlich eingerichtete 4 Zimmer Wohnung für 6 Personen (4 Personen im Doppel-Etageren-Bett und ein Schlafzimmer mit Doppelbett). Die große Wohnküche lädt zum geselligen Beisammensein ein. \n" +
                "Voll ausgestattet Küche mit 4 Platten Herd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher sowie Waschmaschine und Trockner. Sat-TV und DVD-Player vorhanden.\n");
        a11.setNumberOfRooms(4);
        a11.setSize(101.4);
        a11.setNumberOfPersons(6);
        a11.setBasePrice(530);
        a11.setHasBalcony(false);
        a11.setAnimalsAllowed(true);
        a11.setInfantsAllowed(true);
        this.aRepository.save(a11);

        Apartment a12 = new Apartment();
        a12.setApartmentId(12L);
        a12.setResidentialBlockId(rb3.getResidentialBlockId());
        a12.setIsAvailable(true);
        a12.setName("FeWo-Berge-2");
        a12.setDescription("Diese 3 Zimmer Wohnung mit gehobener Ausstattung ist für 4 Personen ausgelegt. Die nostalgisch gestaltete Küche verlockt zum Kochen und Genießen. Sie ist in den offenen Wohn- und Essbereich integriert. Das romantische Badezimmer gleicht einer kleinen Wellness-Oase. Vom Balkon mit Sitzgelegenheit biete sich ein phantastischer Ausblick auf die umliegende Bergwelt. Es sind 2 Schlafzimmer mit je einem Doppelbett vorhanden. \n" +
                "Voll ausgestattet Küche mit 4 Platten Herd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher sowie Waschmaschine und Trockner. Sat-TV und DVD-Player vorhanden.\n");
        a12.setNumberOfRooms(3);
        a12.setSize(77.4);
        a12.setNumberOfPersons(4);
        a12.setBasePrice(370);
        a12.setHasBalcony(true);
        a12.setAnimalsAllowed(false);
        a12.setInfantsAllowed(false);
        this.aRepository.save(a12);

        Apartment a13 = new Apartment();
        a13.setApartmentId(13L);
        a13.setResidentialBlockId(rb3.getResidentialBlockId());
        a13.setIsAvailable(true);
        a13.setName("FeWo-Berge-3");
        a13.setDescription("Rustikale 3 Zimmer Wohnung im ländlichen Stil mit 2 Schlafzimmern (einmal Doppelbett und einmal 2 Einzelbetten). Die Wohnküche und das Wohnzimmer sind in hellem Holz möbliert. Der Balkon bietet eine tolle Aussicht.\n" +
                "Voll ausgestattet Küche mit 4 Platten Herd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher sowie Waschmaschine und Trockner. Sat-TV und DVD-Player vorhanden.\n");
        a13.setNumberOfRooms(3);
        a13.setSize(121.3);
        a13.setNumberOfPersons(6);
        a13.setBasePrice(560);
        a13.setHasBalcony(true);
        a13.setAnimalsAllowed(false);
        a13.setInfantsAllowed(false);
        this.aRepository.save(a13);

        Apartment a14 = new Apartment();
        a14.setApartmentId(14L);
        a14.setResidentialBlockId(rb3.getResidentialBlockId());
        a14.setIsAvailable(false);
        a14.setName("FeWo-Berge-4");
        a14.setDescription("Diese Wohnung erstreckt sich über 2 Etagen. In der oberen Etage befinden sich 3 Schlafzimmer( zweimal Doppelbett und einmal 2 Einzelbetten). Im unteren Bereich ist die offene Wohnlandschaft mit Küche und Zugang zum großen möblierten Balkon. \n" +
                "Voll ausgestattet Küche mit 4 Platten Herd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher sowie Waschmaschine und Trockner. Sat-TV und DVD-Player vorhanden.\n");
        a14.setNumberOfRooms(4);
        a14.setSize(131.4);
        a14.setNumberOfPersons(6);
        a14.setBasePrice(610);
        a14.setHasBalcony(true);
        a14.setAnimalsAllowed(true);
        a14.setInfantsAllowed(true);
        this.aRepository.save(a14);

        Apartment a15 = new Apartment();
        a15.setApartmentId(15L);
        a15.setResidentialBlockId(rb3.getResidentialBlockId());
        a15.setIsAvailable(false);
        a15.setName("FeWo-Berge-5");
        a15.setDescription("Modern und trotzdem gemütlich, so präsentiert sich diese 4 Zimmer Wohnung für 5 Personen. Vor dem Kamin im Wohnbereich kann man wunderbar einen anstrengenden und spannenden Tag in den Bergen ausklingen lassen. Es gibt 2 Schlafzimmer (einmal Doppelbett und einmal Etagerenbett und ein Einzelbett).\n" +
                "Voll ausgestattet Küche mit 4 Platten Herd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher sowie Waschmaschine und Trockner. Sat-TV und DVD-Player vorhanden.\n");
        a15.setNumberOfRooms(4);
        a15.setSize(141.4);
        a15.setNumberOfPersons(5);
        a15.setBasePrice(670);
        a15.setHasBalcony(false);
        a15.setAnimalsAllowed(false);
        a15.setInfantsAllowed(false);
        this.aRepository.save(a15);

       /* Apartment a21 = new Apartment();
        a21.setApartmentId(21L);
        a21.setResidentialBlockId(rb4.getResidentialBlockId());
        a21.setIsAvailable(true);
        a21.setName(); */





        Rating ra1 = new Rating();
        ra1.setScore(3.5);
        ra1.setComment("Test String");
        this.raRepository.save(ra1);

        Rating ra2 = new Rating();
        ra2.setScore(4.5);
        ra2.setComment("Test String");
        this.raRepository.save(ra2);

        Rating ra3 = new Rating();
        ra3.setScore(4.1);
        ra3.setComment("Test String");
        this.raRepository.save(ra3);

        Rating ra4 = new Rating();
        ra4.setScore(2.4);
        ra4.setComment("Test String");
        this.raRepository.save(ra4);

        Factor f1 = new Factor();
        f1.setFactorId(1L);
        f1.setFactor(2.5);
        this.fRepository.save(f1);

        Factor f2 = new Factor();
        f2.setFactorId(2L);
        f2.setFactor(1.2);
        this.fRepository.save(f2);

        Factor f3 = new Factor();
        f3.setFactorId(3L);
        f3.setFactor(1.8);
        this.fRepository.save(f3);

        Factor f4 = new Factor();
        f4.setFactorId(4L);
        f4.setFactor(0.6);
        this.fRepository.save(f4);

        Factor f5 = new Factor();
        f5.setFactorId(5L);
        f5.setFactor(3.1);
        this.fRepository.save(f5);

        Season s1 = new Season();

        for (int i = 1; i <= 53; i++) {
            s1.setCalenderWeek(i+0L);
            s1.setFactorId((int)(Math.random()*5L)+1L);
            this.sRepository.save(s1);
        }

		Customer c = new Customer();
		c.setContractNumber(123456789001L);
		 this.cRepository.save(c);
		c.setContractNumber(123456789002L);
		 this.cRepository.save(c);
		c.setContractNumber(123456789003L);
		this.cRepository.save(c);
		c.setContractNumber(123456789004L);
		this.cRepository.save(c);
		c.setContractNumber(123456789005L);
		this.cRepository.save(c);
		c.setContractNumber(123456789006L);
		this.cRepository.save(c);
		c.setContractNumber(123456789008L);
		this.cRepository.save(c);
		c.setContractNumber(123456789009L);
		this.cRepository.save(c);
		c.setContractNumber(123456789010L);
		this.cRepository.save(c);

		c.setContractNumber(123456789011L);
		c.setLastName("Testico1");
		c.setFirstName("Test1");
		c.setEmail("Test1.Testico1@go.de");
		c.setUsername("testi1");
		c.setDateOfBirth(new Date(91, 0, 1));
		c.setPassword("test1");
		c.setTotalScore(400);
		this.cRepository.save(c);

        c.setContractNumber(123456789012L);
        c.setLastName("Testico2");
        c.setFirstName("Test2");
        c.setEmail("Test2.Testico2@go.de");
        c.setUsername("testi2");
        c.setDateOfBirth(new Date(92, 1, 2));
        c.setPassword("test2");
        c.setTotalScore(500);
        this.cRepository.save(c);

        c.setContractNumber(123456789013L);
        c.setLastName("Testico3");
        c.setFirstName("Test3");
        c.setEmail("Test3.Testico3@go.de");
        c.setUsername("testi3");
        c.setDateOfBirth(new Date(93, 2, 3));
        c.setPassword("test3");
        c.setTotalScore(600);
        this.cRepository.save(c);

        c.setContractNumber(123456789014L);
        c.setLastName("Testico4");
        c.setFirstName("Test4");
        c.setEmail("Test4.Testico4@go.de");
        c.setUsername("testi4");
        c.setDateOfBirth(new Date(94, 3, 4));
        c.setPassword("test4");
        c.setTotalScore(700);
        this.cRepository.save(c);

        c.setContractNumber(123456789015L);
        c.setLastName("Testico5");
        c.setFirstName("Test5");
        c.setEmail("Test5.Testico5@go.de");
        c.setUsername("testi5");
        c.setDateOfBirth(new Date(95, 4, 5));
        c.setPassword("test5");
        c.setTotalScore(800);
        this.cRepository.save(c);

        c.setContractNumber(123456789016L);
        c.setLastName("Testico6");
        c.setFirstName("Test6");
        c.setEmail("Test6.Testico6@go.de");
        c.setUsername("testi6");
        c.setDateOfBirth(new Date(96, 5, 6));
        c.setPassword("test6");
        c.setTotalScore(300);
        this.cRepository.save(c);

        c.setContractNumber(123456789017L);
        c.setLastName("Testico7");
        c.setFirstName("Test7");
        c.setEmail("Test7.Testico7@go.de");
        c.setUsername("testi7");
        c.setDateOfBirth(new Date(97, 6, 7));
        c.setPassword("test7");
        c.setTotalScore(200);
        this.cRepository.save(c);

        c.setContractNumber(123456789018L);
        c.setLastName("Testico8");
        c.setFirstName("Test8");
        c.setEmail("Test8.Testico8@go.de");
        c.setUsername("testi8");
        c.setDateOfBirth(new Date(98, 7, 8));
        c.setPassword("test8");
        c.setTotalScore(800);
        this.cRepository.save(c);

        c.setContractNumber(123456789019L);
        c.setLastName("Testico9");
        c.setFirstName("Test9");
        c.setEmail("Test9.Testico9@go.de");
        c.setUsername("testi9");
        c.setDateOfBirth(new Date(99, 8, 9));
        c.setPassword("test9");
        c.setTotalScore(1000);
        this.cRepository.save(c);
        



    }

    private byte[] readImage(String path) throws IOException {
        File file = new File(path);
        byte[] picInBytes = new byte[(int) file.length()];
        FileInputStream fileInputStream = new FileInputStream(file);
        fileInputStream.read(picInBytes);
        fileInputStream.close();
        return  picInBytes;
    }
}