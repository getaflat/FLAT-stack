package edu.hsog.flat.backend;

import edu.hsog.flat.backend.model.*;
import edu.hsog.flat.backend.repository.*;
import edu.hsog.flat.backend.security.BCryptPasswordEncoder;
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
	private final BCryptPasswordEncoder passwordEncoder;

	@Autowired
	public DatabaseLoader(ApartmentRepository aRepository, BookingRepository bRepository, CustomerRepository cRepository, FactorRepository fRepository, ImageRepository iRepository, RatingRepository raRepository, ResidentialBlockRepository rbRepository, SeasonRepository sRepository, BCryptPasswordEncoder passwordEncoder) {
        this.aRepository = aRepository;
        this.bRepository = bRepository;
	    this.cRepository = cRepository;
	    this.fRepository = fRepository;
	    this.iRepository = iRepository;
	    this.raRepository = raRepository;
	    this.rbRepository = rbRepository;
	    this.sRepository = sRepository;
	    this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void run(String... strings) throws Exception {
        this.aRepository.deleteAll();
        this.bRepository.deleteAll();
        this.cRepository.deleteAll();
        this.fRepository.deleteAll();
        this.iRepository.deleteAll();
        this.raRepository.deleteAll();
        this.rbRepository.deleteAll();
        this.sRepository.deleteAll();

	    ResidentialBlock rb1 = new ResidentialBlock();
	    rb1.setResidentialBlockId(1L);
	    rb1.setName("Komplex Mallorca");
	    rb1.setDetails("Der Kontrast auf schroffer Felsküste und herrlichen Sandstränden ist nur eines der Dinge, die den Reiz dieser Mittelmeer-Insel ausmachen. Die Hauptstadt Palma de Mallorca mit ihrem weit bekannten Nachtleben liegt circa eine Stunde mit dem Auto, das im Ort gemietet werden kann, entfernt. Aber auch die öffentlichen Verkehrsmittel sind gut ausgebaut. \n" +
                "In unserer Anlage, bestehend aus 5 Wohnungen und Häuschen, finden sie alles, was einen entspannten Urlaub ausmacht. Ein kleiner Supermarkt ist vor Ort, ebenso wie im Dorf diverse weitere Geschäft und ein Arzt zu finden sind. Der große Gemeinschaftspool steht nur unseren Gästen zur Verfügung, aber auch der Strand ist nur wenige Gehminuten entfernt. Neben Baden stehen auch Wandern, Reiten und Tennis spielen (beides im Ort) zur Freizeitgestaltung zur Auswahl.\n");
        rb1.setImage1(this.readImage("./src/img/residential_blocks/mediterranean_sea/residential_block1/Costa_Brava.JPG"));
        rb1.setImage2(this.readImage("./src/img/residential_blocks/mediterranean_sea/residential_block1/dorf.jpeg"));
        this.rbRepository.save(rb1);

        ResidentialBlock rb2 = new ResidentialBlock();
        rb2.setResidentialBlockId(2L);
        rb2.setName("Komplex Italien");
        rb2.setDetails("Diese kinderfreundliche Anlage im Westen von Italien besticht durch ihre kilometerlangen Sandstrände. Natürlich gibt es die landestypische Küche mit Pizza und Pasta an vielen Stellen in der Nähe dieser urbanen Anlage zu kaufen. Das Hinterland ist mit seinen Bergen und Schluchten ein idealer Kontrast zur Küste. Unsere 5 Wohneinheiten bieten für jeden Geschmack etwas. Einkaufsmöglichkeiten sind gut zu Fuß zu Erreichen, am Dienstag und Samstag finden auf dem zentralen Marktplatz schöne Märkte mit einem breiten Angebot von Obst und Gemüse, sowie Fleischwaren direkt vom Erzeuger bis hin zu Kleidung und Spielwaren, statt.\n");
        rb2.setImage1(this.readImage("./src/img/residential_blocks/mediterranean_sea/residential_block2/les_gorges_du_tarn.jpg"));
        rb2.setImage2(this.readImage("./src/img/residential_blocks/mediterranean_sea/residential_block2/Strand_Brandung.jpg"));
        this.rbRepository.save(rb2);

        ResidentialBlock rb3 = new ResidentialBlock();
        rb3.setResidentialBlockId(3L);
        rb3.setName("Komplex Berge");
        rb3.setDetails("Die beiden liebevoll eingerichteten, traditionellen Häuser beherbergen insgesamt 5 Wohnungen. Im Sommer locken die Berge zum Wandern und auch der nahe gelegene Badesee sorgt für Erfrischung. Im Winter bietet sich das Skigebiet mit 3 Liften und Pisten für Anfänger bis Profis an. auch Ski- und Snowboardkurse werden veranstaltet. Einkaufsmöglichkeiten befinden sich direkt im Dorf, die nächste Stadt ist ca 30 Minuten mit dem Auto entfernt.\n");
        rb3.setImage1(this.readImage("./src/img/residential_blocks/mountain/residential_block/bergsee.jpg"));
        rb3.setImage2(this.readImage("./src/img/residential_blocks/mountain/residential_block/FerienwohnungBegeAussenSchnee.jpeg"));
        this.rbRepository.save(rb3);

        ResidentialBlock rb4 = new ResidentialBlock();
        rb4.setResidentialBlockId(4L);
        rb4.setName("Komplex Nordsee");
        rb4.setDetails("Urban gelegen, unweit des Sandstrandes liegt dieser Komplex aus 5 Ferienwohnungen. Die überwiegend gehobene Ausstattung der Wohnungen ist ideal zum Entspannen. Genießen sie hier die schönste Zeit des Jahres mit Blick auf den Hafen und die Nordsee. Die Küstenpromenade lädt zum Bummeln ein, und bestimmt finden sie in der nähren Umgebung auch ein gastronomisches Angebot nach ihrem Geschmack. Tagsüber lädt das Meer zum Baden ein oder sie relaxen in einem der vielen zur Vermietung stehenden Strandkörbe. Auch Abends kommen sie hier auf ihre Kosten, denn das Stadtzentrum mit seinen Bars und Clubs ist nur wenige Gehminuten entfernt.\n");
        rb4.setImage1(this.readImage("./src/img/residential_blocks/north_baltic_sea/residential_block1/FeWoSeeAussen.jpg"));
        rb4.setImage2(this.readImage("./src/img/residential_blocks/north_baltic_sea/residential_block1/FeWoSeeHafen.jpg"));
        this.rbRepository.save(rb4);

        ResidentialBlock rb5 = new ResidentialBlock();
        rb5.setResidentialBlockId(5L);
        rb5.setName("Komplex Ostsee");
        rb5.setDetails("Unsere kleine Feriensiedlung bestehend aus 5 Häusern, die direkt am Wasser gebaut wurden, bietet Familien alles was sie für einen entspannten Urlaub brauchen. Ein Kinderspielplatz gehört ebenfalls zum Gelände genauso wie ein kleiner Privatstrand nur für unsere Gäste. In der Umgebung laden die typischen Dämme, die hier bis direkt an die Küstenlinie reichen, zum Wandern und Spazieren gehen ein. vielleicht begegnet ihnen unterwegs ja sogar eine Schafherde! Ein kleiner Supermarkt mit Bäckerei befindet sich nur circa 10 Gehminuten entfernt (Parkplätze vorhanden) Bis zur nächst größeren Stadt sind es circa 20 Minuten mit dem Auto.");
        rb5.setImage1(this.readImage("./src/img/residential_blocks/north_baltic_sea/residential_block2/FeWoSeeStrand.jpg"));
        rb5.setImage2(this.readImage("./src/img/residential_blocks/north_baltic_sea/residential_block2/FeWoSeeAussen3.jpeg"));
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
        a2.setName("FeWo-Mallorca-1");
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
        a3.setName("FeWo-Mallorca-2");
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
        a4.setName("FeWo-Mallorca-3");
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
        a5.setName("FeWo-Italien-2");
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
        a6.setName("FeWo-Italien-3");
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
        a7.setName("FeWo-Mallorca-4");
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
        a8.setName("FeWo-Italien-4");
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
        a9.setName("FeWo-Mallorca-5");
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
        a10.setName("FeWo-Italien-5");
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

        Apartment a21 = new Apartment();
        a21.setApartmentId(21L);
        a21.setResidentialBlockId(rb4.getResidentialBlockId());
        a21.setIsAvailable(true);
        a21.setName("FeWo-Nordsee-1");
        a21.setDescription("Diese Wohnung besticht durch ihr luxuriöses Bad sowie den großzügig gestalteten Wohnbereich. Sie ist für 8 Personen geeignet. Es gibt 3 Schlafzimmer (2 Doppelbetten mit Sat-TV, 1 x 2 Einzelbetten) und eine gemütliche Schlafcouch im Essbereich, der ebenfalls mit einem Sat-TV sowie einem DVD-Player ausgestattet ist.. Der Balkon bietet einen tollen Blick auf die Nordsee. Kochutensilien und Geschirr sind ausreichend vorhanden, ebenso wie 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeevollautomat, Toaster, Wasserkocher und elektrische Saftpresse.  Auch eine Waschmaschine und ein Wäschetrockner stehen zur Verfügung.");
        a21.setNumberOfRooms(4);
        a21.setSize(125.7);
        a21.setNumberOfPersons(8);
        a21.setBasePrice(640);
        a21.setHasBalcony(true);
        a21.setAnimalsAllowed(true);
        a21.setInfantsAllowed(true);
        this.aRepository.save(a21);

        Apartment a22 = new Apartment();
        a22.setApartmentId(22L);
        a22.setResidentialBlockId(rb5.getResidentialBlockId());
        a22.setIsAvailable(true);
        a22.setName("FeWo-Ostsee-1");
        a22.setDescription("Helles und freundlich eingerichtetes kleines Häuschen für 5 Personen (2 Erwachsene und 3 Kinder).\n" +
                "Es verfügt über 2 Schlafzimmer ( ein Doppelbett, einmal ein Etagenbett und ein Einzelbett).\n" +
                "Der kleine Balkon geht direkt übers Wasser, hinten gibt es ein kleines Stück Rasenfläche zur persönlichen Nutzung, Gartenmöbel vorhanden, Grillen erlaubt.\n" +
                "Die Küche ist mit ausreichend Koch- und Essgeschirr ausgestattet. Des weiteren stehen ein 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher und elektrische Saftpresse, sowie eine Waschmaschine zur Verfügung.");
        a22.setNumberOfRooms(3);
        a22.setSize(105.7);
        a22.setNumberOfPersons(5);
        a22.setBasePrice(440);
        a22.setHasBalcony(true);
        a22.setAnimalsAllowed(false);
        a22.setInfantsAllowed(false);
        this.aRepository.save(a22);

        Apartment a23 = new Apartment();
        a23.setApartmentId(23L);
        a23.setResidentialBlockId(rb4.getResidentialBlockId());
        a23.setIsAvailable(true);
        a23.setName("FeWo-Nordsee-2");
        a23.setDescription("Die gehobene Ausstattung dieser 5 Zimmer Wohnung lädt zum Verweilen und Entspannen ein.Im  Erdgeschoss gelegen bietet Sie dennoch ausreichend Privatsphäre. Die Küche mit ihrem nordischen Bauerncharme wird sie bestimmt verzaubern und zu spannenden neuen Gerichten inspirieren. Danach lädt das elegante Wohnzimmer zum gemütlichen Beisammensein ein. Geeignet ist die Wohnung für 6 Personen (2 Doppelbetten mit Sat-TV, 1 x 2 Einzelbetten).\n" +
                "Kochutensilien und Geschirr sind ausreichend vorhanden, ebenso wie 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeevollautomat, Toaster, Wasserkocher und elektrische Saftpresse.  Auch eine Waschmaschine und ein Wäschetrockner stehen zur Verfügung.  \n");
        a23.setNumberOfRooms(5);
        a23.setSize(182.3);
        a23.setNumberOfPersons(6);
        a23.setBasePrice(840);
        a23.setHasBalcony(false);
        a23.setAnimalsAllowed(false);
        a23.setInfantsAllowed(true);
        this.aRepository.save(a23);

        Apartment a24 = new Apartment();
        a24.setApartmentId(24L);
        a24.setResidentialBlockId(rb5.getResidentialBlockId());
        a24.setIsAvailable(false);
        a24.setName("FeWo-Ostsee-2");
        a24.setDescription("Dieses gemütliche kleine Haus bietet mit seinen 2 Schlafzimmern ( einmal Doppelbett und einmal 2 Einzelbetten) 2-4 Personen Platz. Im offenen Wohnbereich befindet sich neben dem Essplatz, dem Küchenbereich auch ein Sofa mit TV. \n" +
                "Der kleine Balkon geht direkt übers Wasser, hinten gibt es ein kleines Stück Rasenfläche zur persönlichen Nutzung, Gartenmöbel vorhanden, Grillen erlaubt.\n" +
                "Die Küche ist mit ausreichend Koch- und Essgeschirr ausgestattet. Des weiteren stehen ein 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher und elektrische Saftpresse, sowie eine Waschmaschine zur Verfügung.");
        a24.setNumberOfRooms(4);
        a24.setSize(92.6);
        a24.setNumberOfPersons(4);
        a24.setBasePrice(510);
        a24.setHasBalcony(true);
        a24.setAnimalsAllowed(true);
        a24.setInfantsAllowed(true);
        this.aRepository.save(a24);

        Apartment a25 = new Apartment();
        a25.setApartmentId(25L);
        a25.setResidentialBlockId(rb4.getResidentialBlockId());
        a25.setIsAvailable(false);
        a25.setName("FeWo-Nordsee-3");
        a25.setDescription("Sehr helle und freundliche 4 Zimmer Wohnung mit direktem Zugang zur Dachterrasse, von der sie einen herrlichen Blick über die Umgebung, den Strand und die Nordsee haben. Auch zum Relaxen ist sie geeignet, dank entsprechender Möblierung. In dieser Wohnung finden bis zu 4 Personen und 2 Kinder bis 12 Jahren Platz. \n" +
                "Kochutensilien und Geschirr sind ausreichend vorhanden, ebenso wie 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeevollautomat, Toaster, Wasserkocher und elektrische Saftpresse.  Auch eine Waschmaschine und ein Wäschetrockner stehen zur Verfügung.");
        a25.setNumberOfRooms(4);
        a25.setSize(135.7);
        a25.setNumberOfPersons(6);
        a25.setBasePrice(640);
        a25.setHasBalcony(true);
        a25.setAnimalsAllowed(false);
        a25.setInfantsAllowed(true);
        this.aRepository.save(a25);

        Apartment a26 = new Apartment();
        a26.setApartmentId(26L);
        a26.setResidentialBlockId(rb4.getResidentialBlockId());
        a26.setIsAvailable(false);
        a26.setName("FeWo-Nordsee-4");
        a26.setDescription("In dieser 3 Zimmer Wohnung finden 4 Personen Platz. Die offene Wohnlandschaft vereint Wohn-, Ess- und Kochbereich, was ein gemütliches Beisammensein verspricht. Das extravagante Badezimmer kommt einer kleinen Wellness-Oase gleich. Vom Balkon aus haben sie einen schönen Blick auf den Strand und die Strandpromenade.\n" +
                "Kochutensilien und Geschirr sind ausreichend vorhanden, ebenso wie 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeevollautomat, Toaster, Wasserkocher und elektrische Saftpresse.  Auch eine Waschmaschine und ein Wäschetrockner stehen zur Verfügung.");
        a26.setNumberOfRooms(3);
        a26.setSize(89.7);
        a26.setNumberOfPersons(4);
        a26.setBasePrice(530);
        a26.setHasBalcony(true);
        a26.setAnimalsAllowed(false);
        a26.setInfantsAllowed(false);
        this.aRepository.save(a26);

        Apartment a27 = new Apartment();
        a27.setApartmentId(27L);
        a27.setResidentialBlockId(rb5.getResidentialBlockId());
        a27.setIsAvailable(false);
        a27.setName("FeWo-Ostsee-3");
        a27.setDescription("4 Personen können in diesem Häuschen einen gemütlichen Urlaub verbringen. Das moderne Badezimmer und der helle Wohnbereich bietet das richtige Umfeld um zu entspannen und zur Ruhe zu kommen. Die 2 Schlafzimmern (einmal Doppelbett und einmal 2 Einzelbetten) sind zweckmäßig eingerichtet. \n" +
                "Der kleine Balkon geht direkt übers Wasser, hinten gibt es ein kleines Stück Rasenfläche zur persönlichen Nutzung, Gartenmöbel vorhanden, Grillen erlaubt.\n" +
                "Die Küche ist mit ausreichend Koch- und Essgeschirr ausgestattet. Des weiteren stehen ein 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher und elektrische Saftpresse, sowie eine Waschmaschine zur Verfügung. ");
        a27.setNumberOfRooms(4);
        a27.setSize(151.1);
        a27.setNumberOfPersons(4);
        a27.setBasePrice(710);
        a27.setHasBalcony(true);
        a27.setAnimalsAllowed(false);
        a27.setInfantsAllowed(true);
        this.aRepository.save(a21);

        Apartment a28 = new Apartment();
        a28.setApartmentId(28L);
        a28.setResidentialBlockId(rb5.getResidentialBlockId());
        a28.setIsAvailable(true);
        a28.setName("FeWo-Ostsee-4");
        a28.setDescription("Mit Platz für bis zu 6 Personen ist dieses Haus eines der geräumigeren in der Anlage. Es befindet sich am Ende der Häuserreihe. Zur Verfügung stehen 3 Schlafzimmer (zweimal Doppelbett und einmal 2 Einzelbetten) sowie ein gemütlicher Wohnbereich mit angrenzendem Essbereich. \n" +
                "Der kleine Balkon geht direkt übers Wasser, hinten gibt es ein kleines Stück Rasenfläche zur persönlichen Nutzung, Gartenmöbel vorhanden, Grillen erlaubt.\n" +
                "Die Küche ist mit ausreichend Koch- und Essgeschirr ausgestattet. Des weiteren stehen ein 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher und elektrische Saftpresse, sowie eine Waschmaschine zur Verfügung.");
        a28.setNumberOfRooms(6);
        a28.setSize(174.3);
        a28.setNumberOfPersons(6);
        a28.setBasePrice(720);
        a28.setHasBalcony(true);
        a28.setAnimalsAllowed(true);
        a28.setInfantsAllowed(true);
        this.aRepository.save(a28);

        Apartment a29 = new Apartment();
        a29.setApartmentId(29L);
        a29.setResidentialBlockId(rb5.getResidentialBlockId());
        a29.setIsAvailable(true);
        a29.setName("FeWo-Ostsee-5");
        a29.setDescription("Das größte Haus in der Anlage bietet Platz für bis zu 6 Personen, die sich in 3 Schlafzimmern (zweimal Doppelbett und einmal 2 Einzelbetten) in der oberen der 2 Etagen  wohlfühlen können. Im Erdgeschoss bietet der Wohn- und Essbereich genügend Raum zur Geselligkeit.\n" +
                "Der kleine Balkon geht direkt übers Wasser, hinten gibt es ein kleines Stück Rasenfläche zur persönlichen Nutzung, Gartenmöbel vorhanden, Grillen erlaubt.\n" +
                "Die Küche ist mit ausreichend Koch- und Essgeschirr ausgestattet. Des weiteren stehen ein 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeemaschine, Toaster, Wasserkocher und elektrische Saftpresse, sowie eine Waschmaschine zur Verfügung. \n");
        a29.setNumberOfRooms(5);
        a29.setSize(192.1);
        a29.setNumberOfPersons(6);
        a29.setBasePrice(940);
        a29.setHasBalcony(true);
        a29.setAnimalsAllowed(true);
        a29.setInfantsAllowed(true);
        this.aRepository.save(a29);

        Apartment a30 = new Apartment();
        a30.setApartmentId(30L);
        a30.setResidentialBlockId(rb4.getResidentialBlockId());
        a30.setIsAvailable(true);
        a30.setName("FeWo-Nordsee-5");
        a30.setDescription("Sollte das nordische „Schietwetter“ doch mal zuschlagen, sind sie in dieser Wohnung bestens vorbereitet. Entspannen sie in der eigenen Sauna und genießen sie danach den Tag vor dem offenen Kamin. So hat „Schlecht-Wetter-Laune“ keine Chance! Diese 4 Zimmer Wohnung mit 2 Schlafzimmern (ein Doppelbett und einmal 2 Einzelbetten) bietet 4 Personen Platz. \n" +
                "Kochutensilien und Geschirr sind ausreichend vorhanden, ebenso wie 4 Platten Induktionsherd, Backofen, Mikrowelle, Kaffeevollautomat, Toaster, Wasserkocher und elektrische Saftpresse.  Auch eine Waschmaschine und ein Wäschetrockner stehen zur Verfügung. ");
        a30.setNumberOfRooms(4);
        a30.setSize(110.7);
        a30.setNumberOfPersons(4);
        a30.setBasePrice(680);
        a30.setHasBalcony(false);
        a30.setAnimalsAllowed(false);
        a30.setInfantsAllowed(false);
        this.aRepository.save(a30);

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
        f1.setFactor(1.0);
        this.fRepository.save(f1);

        Factor f2 = new Factor();
        f2.setFactorId(2L);
        f2.setFactor(2.0);
        this.fRepository.save(f2);

        Factor f3 = new Factor();
        f3.setFactorId(3L);
        f3.setFactor(3.0);
        this.fRepository.save(f3);

        Factor f4 = new Factor();
        f4.setFactorId(4L);
        f4.setFactor(4.0);
        this.fRepository.save(f4);

        Factor f5 = new Factor();
        f5.setFactorId(5L);
        f5.setFactor(5.0);
        this.fRepository.save(f5);

        Factor f6 = new Factor();
        f6.setFactorId(6L);
        f6.setFactor(6.0);
        this.fRepository.save(f6);

        Factor f7 = new Factor();
        f7.setFactorId(7L);
        f7.setFactor(7.0);
        this.fRepository.save(f7);

        Factor f8 = new Factor();
        f8.setFactorId(8L);
        f8.setFactor(8.0);
        this.fRepository.save(f8);

        Factor f9 = new Factor();
        f9.setFactorId(9L);
        f9.setFactor(9.0);
        this.fRepository.save(f9);

        Factor f10 = new Factor();
        f10.setFactorId(10L);
        f10.setFactor(10.0);
        this.fRepository.save(f10);

        Season s1 = new Season();

        for (int i = 1; i <= 53; i++) {
            s1.setCalenderWeek(i+0L);
            s1.setFactorId((int)(Math.random()*10L)+1L);
            this.sRepository.save(s1);
        }

		/*Customer c = new Customer();
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
		this.cRepository.save(c);*/

		Customer c1 = new Customer();
		c1.setContractNumber(123456789011L);
		c1.setLastName("Testico1");
		c1.setFirstName("Test1");
		c1.setEmail("Test1.Testico1@go.de");
		c1.setUsername("testi1");
		c1.setDateOfBirth(new Date(91, 0, 1));
		c1.setPassword(passwordEncoder.encode("test1"));
		c1.setTotalScore(400);
		this.cRepository.save(c1);

        Customer c2 = new Customer();
        c2.setContractNumber(123456789012L);
        c2.setLastName("Testico2");
        c2.setFirstName("Test2");
        c2.setEmail("Test2.Testico2@go.de");
        c2.setUsername("testi2");
        c2.setDateOfBirth(new Date(92, 1, 2));
        c2.setPassword(passwordEncoder.encode("test2"));
        c2.setTotalScore(500);
        this.cRepository.save(c2);

        Customer c3 = new Customer();
        c3.setContractNumber(123456789013L);
        c3.setLastName("Testico3");
        c3.setFirstName("Test3");
        c3.setEmail("Test3.Testico3@go.de");
        c3.setUsername("testi3");
        c3.setDateOfBirth(new Date(93, 2, 3));
        c3.setPassword(passwordEncoder.encode("test3"));
        c3.setTotalScore(600);
        this.cRepository.save(c3);


        Customer c4 = new Customer();
        c4.setContractNumber(123456789014L);
        c4.setLastName("Testico4");
        c4.setFirstName("Test4");
        c4.setEmail("Test4.Testico4@go.de");
        c4.setUsername("testi4");
        c4.setDateOfBirth(new Date(94, 3, 4));
        c4.setPassword(passwordEncoder.encode("test4"));
        c4.setTotalScore(700);
        this.cRepository.save(c4);

        Customer c5 = new Customer();
        c5.setContractNumber(123456789015L);
        c5.setLastName("Testico5");
        c5.setFirstName("Test5");
        c5.setEmail("Test5.Testico5@go.de");
        c5.setUsername("testi5");
        c5.setDateOfBirth(new Date(95, 4, 5));
        c5.setPassword(passwordEncoder.encode("test5"));
        c5.setTotalScore(800);
        this.cRepository.save(c5);

        Customer c6 = new Customer();
        c6.setContractNumber(123456789016L);
        c6.setLastName("Testico6");
        c6.setFirstName("Test6");
        c6.setEmail("Test6.Testico6@go.de");
        c6.setUsername("testi6");
        c6.setDateOfBirth(new Date(96, 5, 6));
        c6.setPassword(passwordEncoder.encode("test6"));
        c6.setTotalScore(300);
        this.cRepository.save(c6);

        Customer c7 = new Customer();
        c7.setContractNumber(123456789017L);
        c7.setLastName("Testico7");
        c7.setFirstName("Test7");
        c7.setEmail("Test7.Testico7@go.de");
        c7.setUsername("testi7");
        c7.setDateOfBirth(new Date(97, 6, 7));
        c7.setPassword(passwordEncoder.encode("test7"));
        c7.setTotalScore(200);
        this.cRepository.save(c7);

        Customer c8 = new Customer();
        c8.setContractNumber(123456789018L);
        c8.setLastName("Testico8");
        c8.setFirstName("Test8");
        c8.setEmail("Test8.Testico8@go.de");
        c8.setUsername("testi8");
        c8.setDateOfBirth(new Date(98, 7, 8));
        c8.setPassword(passwordEncoder.encode("test8"));
        c8.setTotalScore(800);
        this.cRepository.save(c8);

        Customer c9 = new Customer();
        c9.setContractNumber(123456789019L);
        c9.setLastName("Testico9");
        c9.setFirstName("Test9");
        c9.setEmail("Test9.Testico9@go.de");
        c9.setUsername("testi9");
        c9.setDateOfBirth(new Date(99, 8, 9));
        c9.setPassword(passwordEncoder.encode("test9"));
        c9.setTotalScore(1000);
        this.cRepository.save(c9);

        Rating r1 = new Rating();
        r1.setRatingId(1L);
        r1.setContractNumber(c1.getContractNumber());
        this.raRepository.save(r1);

        Rating r2 = new Rating();
        r2.setRatingId(2L);
        r2.setContractNumber(c2.getContractNumber());
        this.raRepository.save(r2);

        Rating r3 = new Rating();
        r3.setRatingId(3L);
        r3.setContractNumber(c3.getContractNumber());
        this.raRepository.save(r3);

        Rating r4 = new Rating();
        r4.setRatingId(4L);
        r4.setContractNumber(c4.getContractNumber());
        this.raRepository.save(r4);

        Rating r5 = new Rating();
        r5.setRatingId(5L);
        r5.setContractNumber(c5.getContractNumber());
        this.raRepository.save(r5);

        Rating r6 = new Rating();
        r6.setRatingId(6L);
        r6.setContractNumber(c6.getContractNumber());
        this.raRepository.save(r6);

        Rating r7 = new Rating();
        r7.setRatingId(7L);
        r7.setContractNumber(c7.getContractNumber());
        this.raRepository.save(r7);


        Rating r8 = new Rating();
        r8.setRatingId(8L);
        r8.setContractNumber(c7.getContractNumber());
        this.raRepository.save(r8);


        Rating r9 = new Rating();
        r9.setRatingId(9L);
        r9.setContractNumber(c9.getContractNumber());
        this.raRepository.save(r9);

        Long factorID1;
        Long factorID2;
        Integer price;
        Booking b1 = new Booking();
        b1.setContractNumber(123456789011L);
        b1.setApartmentId(1L);
        b1.setWeek1(37);
        b1.setWeek2(38);
        b1.setYear(2017);
        factorID1 = this.sRepository.findOne(b1.getWeek1()+0L).getFactorId();
        factorID2 = this.sRepository.findOne(b1.getWeek2()+0L).getFactorId();
        price = a1.getBasePrice();
        price = (int) ((((this.fRepository.findOne(factorID1).getFactor()/ 100)+1) * price) + (((this.fRepository.findOne(factorID2).getFactor()/ 100)+1) * price));
        b1.setPrice(price);
        b1.setAdditionalCharge(50.6);
        b1.setStatus("Wartend");
        b1.setLastModified(new Date(117, 4, 14));
        this.bRepository.save(b1);

        Booking b2 = new Booking();
        b2.setContractNumber(123456789012L);
        b2.setApartmentId(5L);
        b2.setWeek1(39);
        b2.setWeek2(40);
        b2.setYear(2017);
        b2.setAdditionalCharge(0.0);
        factorID1 = this.sRepository.findOne(b2.getWeek1()+0L).getFactorId();
        factorID2 = this.sRepository.findOne(b2.getWeek2()+0L).getFactorId();
        price = a5.getBasePrice();
        price = (int) ((((this.fRepository.findOne(factorID1).getFactor()/ 100)+1) * price) + (((this.fRepository.findOne(factorID2).getFactor()/ 100)+1) * price));
        b2.setPrice(price);
        b2.setStatus("Wartend");
        b2.setLastModified(new Date(117, 4, 13));
        this.bRepository.save(b2);

        Booking b3 = new Booking();
        b3.setContractNumber(123456789012L);
        b3.setApartmentId(3L);
        b3.setWeek1(23);
        b3.setWeek2(24);
        b3.setYear(2017);
        b3.setAdditionalCharge(0.0);
        factorID1 = this.sRepository.findOne(b3.getWeek1()+0L).getFactorId();
        factorID2 = this.sRepository.findOne(b3.getWeek2()+0L).getFactorId();
        price = a3.getBasePrice();
        price = (int) ((((this.fRepository.findOne(factorID1).getFactor()/ 100)+1) * price) + (((this.fRepository.findOne(factorID2).getFactor()/ 100)+1) * price));
        b3.setPrice(price);
        b3.setStatus("Bestätigt");
        b3.setLastModified(new Date(117, 4, 12));
        this.bRepository.save(b3);

        Booking b4 = new Booking();
        b4.setContractNumber(123456789013L);
        b4.setApartmentId(21L);
        b4.setWeek1(1);
        b4.setWeek2(2);
        b4.setYear(2018);
        b4.setAdditionalCharge(0.0);
        factorID1 = this.sRepository.findOne(b4.getWeek1()+0L).getFactorId();
        factorID2 = this.sRepository.findOne(b4.getWeek2()+0L).getFactorId();
        price = a21.getBasePrice();
        price = (int) ((((this.fRepository.findOne(factorID1).getFactor()/ 100)+1) * price) + (((this.fRepository.findOne(factorID2).getFactor()/ 100)+1) * price));
        b4.setPrice(price);
        b4.setStatus("Wartend");
        b4.setLastModified(new Date(117, 4, 11));
        this.bRepository.save(b4);

        Booking b5 = new Booking();
        b5.setContractNumber(123456789014L);
        b5.setApartmentId(21L);
        b5.setWeek1(1);
        b5.setWeek2(2);
        b5.setYear(2018);
        b5.setAdditionalCharge(0.0);
        factorID1 = this.sRepository.findOne(b5.getWeek1()+0L).getFactorId();
        factorID2 = this.sRepository.findOne(b5.getWeek2()+0L).getFactorId();
        price = a21.getBasePrice();
        price = (int) ((((this.fRepository.findOne(factorID1).getFactor()/ 100)+1) * price) + (((this.fRepository.findOne(factorID2).getFactor()/ 100)+1) * price));
        b5.setPrice(price);
        b5.setStatus("Wartend");
        b5.setLastModified(new Date(117, 4, 10));
        this.bRepository.save(b5);

        Image i1 = new Image();
        i1.setImageId(1L);
        i1.setApartmentId(a1.getApartmentId());
        i1.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment1/FeWoMeerEingang.jpeg"));
        this.iRepository.save(i1);

        Image i2 = new Image();
        i2.setImageId(2L);
        i2.setApartmentId(a1.getApartmentId());
        i2.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment1/FeWoMeerSchlaf3.jpeg"));
        this.iRepository.save(i2);

        Image i3 = new Image();
        i3.setImageId(3L);
        i3.setApartmentId(a1.getApartmentId());
        i3.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment1/FeWoMeerBalkon5.jpg"));
        this.iRepository.save(i3);

        Image i4 = new Image();
        i4.setImageId(4L);
        i4.setApartmentId(a2.getApartmentId());
        i4.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment2/FeWoMeerAussen2.jpeg"));
        this.iRepository.save(i4);

        Image i5 = new Image();
        i5.setImageId(5L);
        i5.setApartmentId(a2.getApartmentId());
        i5.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment2/FeWoMeerSchlaf5.jpeg"));
        this.iRepository.save(i5);

        Image i6 = new Image();
        i6.setImageId(6L);
        i6.setApartmentId(a2.getApartmentId());
        i6.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment2/FeWoMeerBalkon6.jpeg"));
        this.iRepository.save(i6);

        Image i7 = new Image();
        i7.setImageId(7L);
        i7.setApartmentId(a3.getApartmentId());
        i7.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment3/FeWoMeerWohn2.jpg"));
        this.iRepository.save(i7);

        Image i8 = new Image();
        i8.setImageId(8L);
        i8.setApartmentId(a3.getApartmentId());
        i8.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment3/FeWoMeerSchlaf4.jpeg"));
        this.iRepository.save(i8);

        Image i9 = new Image();
        i9.setImageId(9L);
        i9.setApartmentId(a3.getApartmentId());
        i9.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment3/FeWoMeerKueche3.jpeg"));
        this.iRepository.save(i9);

        Image i10 = new Image();
        i10.setImageId(10L);
        i10.setApartmentId(a4.getApartmentId());
        i10.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment4/FeWoMeerWohn5.jpeg"));
        this.iRepository.save(i10);

        Image i11 = new Image();
        i11.setImageId(11L);
        i11.setApartmentId(a4.getApartmentId());
        i11.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment4/FeWoMeerSchlaf2.jpg"));
        this.iRepository.save(i11);

        Image i12 = new Image();
        i12.setImageId(12L);
        i12.setApartmentId(a4.getApartmentId());
        i12.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment4/FeWoMeerPool2.jpg"));
        this.iRepository.save(i12);

        Image i13 = new Image();
        i13.setImageId(13L);
        i13.setApartmentId(a5.getApartmentId());
        i13.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment5/FeWoMeerEss.jpg"));
        this.iRepository.save(i13);

        Image i14 = new Image();
        i14.setImageId(14L);
        i14.setApartmentId(a5.getApartmentId());
        i14.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment5/FeWoMeerKueche7.jpg"));
        this.iRepository.save(i14);

        Image i15 = new Image();
        i15.setImageId(15L);
        i15.setApartmentId(a5.getApartmentId());
        i15.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment5/FeWoMeerBad.jpeg"));
        this.iRepository.save(i15);

        Image i16 = new Image();
        i16.setImageId(16L);
        i16.setApartmentId(a5.getApartmentId());
        i16.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment5/FeWoMeerBad.jpeg"));
        this.iRepository.save(i16);

        Image i17 = new Image();
        i17.setImageId(17L);
        i17.setApartmentId(a6.getApartmentId());
        i17.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment6/FeWoMeerWohn.jpg"));
        this.iRepository.save(i17);

        Image i18 = new Image();
        i18.setImageId(18L);
        i18.setApartmentId(a6.getApartmentId());
        i18.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment6/FeWoMeerSchlaf.jpeg"));
        this.iRepository.save(i18);

        Image i19 = new Image();
        i19.setImageId(19L);
        i19.setApartmentId(a6.getApartmentId());
        i19.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment6/FeWoMeerKueche5.jpeg"));
        this.iRepository.save(i19);

        Image i20 = new Image();
        i20.setImageId(20L);
        i20.setApartmentId(a7.getApartmentId());
        i20.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment7/FeWoMeerAussen.JPG"));
        this.iRepository.save(i20);

        Image i21 = new Image();
        i21.setImageId(21L);
        i21.setApartmentId(a7.getApartmentId());
        i21.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment7/FeWoMeerWohn4.jpg"));
        this.iRepository.save(i21);

        Image i22 = new Image();
        i22.setImageId(22L);
        i22.setApartmentId(a7.getApartmentId());
        i22.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment7/FeWoMeerKueche2.jpeg"));
        this.iRepository.save(i22);

        Image i23 = new Image();
        i23.setImageId(23L);
        i23.setApartmentId(a8.getApartmentId());
        i23.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment8/FeWoMeerEss3.jpg"));
        this.iRepository.save(i23);

        Image i24 = new Image();
        i24.setImageId(24L);
        i24.setApartmentId(a8.getApartmentId());
        i24.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment8/FeWoMeerBalkon1.jpeg"));
        this.iRepository.save(i24);

        Image i25 = new Image();
        i25.setImageId(25L);
        i25.setApartmentId(a8.getApartmentId());
        i25.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment8/FeWoMeerStrand2.jpeg"));
        this.iRepository.save(i25);

        Image i26 = new Image();
        i26.setImageId(26L);
        i26.setApartmentId(a9.getApartmentId());
        i26.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment9/FeWoMeerWohn3.jpeg"));
        this.iRepository.save(i26);

        Image i27 = new Image();
        i27.setImageId(27L);
        i27.setApartmentId(a9.getApartmentId());
        i27.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment9/FeWoMeerEss4.jpeg"));
        this.iRepository.save(i27);

        Image i28 = new Image();
        i28.setImageId(28L);
        i28.setApartmentId(a9.getApartmentId());
        i28.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment9/FeWoMeerGrill.jpeg"));
        this.iRepository.save(i28);

        Image i29 = new Image();
        i29.setImageId(29L);
        i29.setApartmentId(a10.getApartmentId());
        i29.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment10/FeWoMeerSchlaf_Wohn.jpeg"));
        this.iRepository.save(i29);

        Image i30 = new Image();
        i30.setImageId(30L);
        i30.setApartmentId(a10.getApartmentId());
        i30.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment10/FeWoMeerEss2.jpeg"));
        this.iRepository.save(i30);

        Image i31 = new Image();
        i31.setImageId(31L);
        i31.setApartmentId(a10.getApartmentId());
        i31.setImage(readImage("./src/img/apartments/mediterranean_sea/apartment10/FeWoMeerKueche.jpeg"));
        this.iRepository.save(i31);

        Image i32 = new Image();
        i32.setImageId(32L);
        i32.setApartmentId(a11.getApartmentId());
        i32.setImage(readImage("./src/img/apartments/mountain/apartment1/FeWoBergeWohnzimmer.jpeg"));
        this.iRepository.save(i32);

        Image i33 = new Image();
        i33.setImageId(33L);
        i33.setApartmentId(a11.getApartmentId());
        i33.setImage(readImage("./src/img/apartments/mountain/apartment1/FeWoBergeSchlafzimmer6.jpeg"));
        this.iRepository.save(i33);

        Image i34 = new Image();
        i34.setImageId(34L);
        i34.setApartmentId(a11.getApartmentId());
        i34.setImage(readImage("./src/img/apartments/mountain/apartment1/FeWoBergeKueche3.jpg"));
        this.iRepository.save(i34);

        Image i35 = new Image();
        i35.setImageId(35L);
        i35.setApartmentId(a12.getApartmentId());
        i35.setImage(readImage("./src/img/apartments/mountain/apartment2/FeWoBergeSchlafzimmer4.jpg"));
        this.iRepository.save(i35);

        Image i36 = new Image();
        i36.setImageId(36L);
        i36.setApartmentId(a12.getApartmentId());
        i36.setImage(readImage("./src/img/apartments/mountain/apartment2/FeWoBergeKueche2.jpg"));
        this.iRepository.save(i36);

        Image i37 = new Image();
        i37.setImageId(37L);
        i37.setApartmentId(a12.getApartmentId());
        i37.setImage(readImage("./src/img/apartments/mountain/apartment2/FeWoBergeBad.jpg"));
        this.iRepository.save(i37);

        Image i38 = new Image();
        i38.setImageId(38L);
        i38.setApartmentId(a13.getApartmentId());
        i38.setImage(readImage("./src/img/apartments/mountain/apartment3/FeWoBergeSchlafzimmer2.jpg"));
        this.iRepository.save(i38);

        Image i39 = new Image();
        i39.setImageId(39L);
        i39.setApartmentId(a13.getApartmentId());
        i39.setImage(readImage("./src/img/apartments/mountain/apartment3/FeWoBergeKueche.jpeg"));
        this.iRepository.save(i39);

        Image i40 = new Image();
        i40.setImageId(40L);
        i40.setApartmentId(a13.getApartmentId());
        i40.setImage(readImage("./src/img/apartments/mountain/apartment3/FeWoBergeBad3.jpeg"));
        this.iRepository.save(i40);

        Image i41 = new Image();
        i41.setImageId(41L);
        i41.setApartmentId(a14.getApartmentId());
        i41.setImage(readImage("./src/img/apartments/mountain/apartment4/FeWoBergeWohnbereich.jpeg"));
        this.iRepository.save(i41);

        Image i42 = new Image();
        i42.setImageId(42L);
        i42.setApartmentId(a14.getApartmentId());
        i42.setImage(readImage("./src/img/apartments/mountain/apartment4/FeWoBergeSchlafzimmer5.jpeg"));
        this.iRepository.save(i42);

        Image i43 = new Image();
        i43.setImageId(43L);
        i43.setApartmentId(a14.getApartmentId());
        i43.setImage(readImage("./src/img/apartments/mountain/apartment4/FeWoBergeBad2.jpeg"));
        this.iRepository.save(i43);

        Image i44 = new Image();
        i44.setImageId(44L);
        i44.setApartmentId(a15.getApartmentId());
        i44.setImage(readImage("./src/img/apartments/mountain/apartment5/FeWoBergeWohn_Schlafbereich.jpg"));
        this.iRepository.save(i44);

        Image i45 = new Image();
        i45.setImageId(45L);
        i45.setApartmentId(a15.getApartmentId());
        i45.setImage(readImage("./src/img/apartments/mountain/apartment5/FeWoBergeSchlafzimmer3.jpeg"));
        this.iRepository.save(i45);

        Image i46 = new Image();
        i46.setImageId(46L);
        i46.setApartmentId(a15.getApartmentId());
        i46.setImage(readImage("./src/img/apartments/mountain/apartment5/FeWoBergeBad4.jpeg"));
        this.iRepository.save(i46);

        Image i47 = new Image();
        i47.setImageId(47L);
        i47.setApartmentId(a21.getApartmentId());
        i47.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment1/FeWoSeeEss2.jpg"));
        this.iRepository.save(i47);

        Image i48 = new Image();
        i48.setImageId(48L);
        i48.setApartmentId(a21.getApartmentId());
        i48.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment1/FeWoSeeSchlaf.jpg"));
        this.iRepository.save(i48);

        Image i49 = new Image();
        i49.setImageId(49L);
        i49.setApartmentId(a21.getApartmentId());
        i49.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment1/FeWoSeeBad2.jpg"));
        this.iRepository.save(i49);

        Image i50 = new Image();
        i50.setImageId(50L);
        i50.setApartmentId(a22.getApartmentId());
        i50.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment2/FeWoSeeWohn6.jpeg"));
        this.iRepository.save(i50);

        Image i51 = new Image();
        i51.setImageId(51L);
        i51.setApartmentId(a22.getApartmentId());
        i51.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment2/FeWoSeeKueche4.jpeg"));
        this.iRepository.save(i51);

        Image i52 = new Image();
        i52.setImageId(52L);
        i52.setApartmentId(a22.getApartmentId());
        i52.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment2/FeWoSeeBad7.jpg"));
        this.iRepository.save(i52);

        Image i53 = new Image();
        i53.setImageId(53L);
        i53.setApartmentId(a23.getApartmentId());
        i53.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment3/FeWoSeeWohn4.jpg"));
        this.iRepository.save(i53);

        Image i54 = new Image();
        i54.setImageId(54L);
        i54.setApartmentId(a23.getApartmentId());
        i54.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment3/FeWoSeeKueche7.jpg"));
        this.iRepository.save(i54);

        Image i55 = new Image();
        i55.setImageId(55L);
        i55.setApartmentId(a23.getApartmentId());
        i55.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment3/FeWoSeeBad.jpeg"));
        this.iRepository.save(i55);

        Image i56 = new Image();
        i56.setImageId(56L);
        i56.setApartmentId(a24.getApartmentId());
        i56.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment4/FeWoSeeWohn2.jpeg"));
        this.iRepository.save(i56);

        Image i57 = new Image();
        i57.setImageId(57L);
        i57.setApartmentId(a24.getApartmentId());
        i57.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment4/FeWoSeeSchlaf4.jpeg"));
        this.iRepository.save(i57);

        Image i58 = new Image();
        i58.setImageId(58L);
        i58.setApartmentId(a24.getApartmentId());
        i58.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment4/FeWoSeeBad3.jpeg"));
        this.iRepository.save(i58);

        Image i59 = new Image();
        i59.setImageId(59L);
        i59.setApartmentId(a25.getApartmentId());
        i59.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment5/FeWoSeeEsszimmer.jpeg"));
        this.iRepository.save(i59);

        Image i60 = new Image();
        i60.setImageId(60L);
        i60.setApartmentId(a25.getApartmentId());
        i60.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment5/FeWoSeeSchlaf6.jpeg"));
        this.iRepository.save(i60);

        Image i61 = new Image();
        i61.setImageId(61L);
        i61.setApartmentId(a25.getApartmentId());
        i61.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment5/FeWoSeeDachterasse.jpeg"));
        this.iRepository.save(i61);

        Image i62 = new Image();
        i62.setImageId(62L);
        i62.setApartmentId(a26.getApartmentId());
        i62.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment6/FeWoSeeSchlaf7.jpg"));
        this.iRepository.save(i62);

        Image i63 = new Image();
        i63.setImageId(63L);
        i63.setApartmentId(a26.getApartmentId());
        i63.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment6/FeWoSeeKueche.jpeg"));
        this.iRepository.save(i63);

        Image i64 = new Image();
        i64.setImageId(64L);
        i64.setApartmentId(a26.getApartmentId());
        i64.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment6/FeWoSeeBad6.jpeg"));
        this.iRepository.save(i64);

        Image i65 = new Image();
        i65.setImageId(65L);
        i65.setApartmentId(a27.getApartmentId());
        i65.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment7/FeWoSeeWohn8.jpeg"));
        this.iRepository.save(i65);

        Image i66 = new Image();
        i66.setImageId(66L);
        i66.setApartmentId(a27.getApartmentId());
        i66.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment7/FeWoSeeEss3.jpeg"));
        this.iRepository.save(i66);

        Image i67 = new Image();
        i67.setImageId(67L);
        i67.setApartmentId(a27.getApartmentId());
        i67.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment7/FeWoSeeBad8.jpeg"));
        this.iRepository.save(i67);

        Image i68 = new Image();
        i68.setImageId(68L);
        i68.setApartmentId(a28.getApartmentId());
        i68.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment8/FeWoSeeWohn7.jpeg"));
        this.iRepository.save(i68);

        Image i69 = new Image();
        i69.setImageId(69L);
        i69.setApartmentId(a28.getApartmentId());
        i69.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment8/FeWoSeeKueche_Wohn.jpeg"));
        this.iRepository.save(i69);

        Image i70 = new Image();
        i70.setImageId(70L);
        i70.setApartmentId(a28.getApartmentId());
        i70.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment8/FeWoSeeSchlaf2.jpeg"));
        this.iRepository.save(i70);

        Image i71 = new Image();
        i71.setImageId(71L);
        i71.setApartmentId(a29.getApartmentId());
        i71.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment9/FeWoSeeSchlaf5.jpeg"));
        this.iRepository.save(i71);

        Image i72 = new Image();
        i72.setImageId(72L);
        i72.setApartmentId(a29.getApartmentId());
        i72.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment9/FeWoSeeKueche2.jpg"));
        this.iRepository.save(i72);

        Image i73 = new Image();
        i73.setImageId(73L);
        i73.setApartmentId(a29.getApartmentId());
        i73.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment9/FeWoSeeBad5.jpeg"));
        this.iRepository.save(i73);

        Image i74 = new Image();
        i74.setImageId(74L);
        i74.setApartmentId(a30.getApartmentId());
        i74.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment10/FeWoSeeWohn.jpeg"));
        this.iRepository.save(i74);

        Image i75 = new Image();
        i75.setImageId(75L);
        i75.setApartmentId(a30.getApartmentId());
        i75.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment10/FeWoSeeBad4.jpeg"));
        this.iRepository.save(i75);

        Image i76 = new Image();
        i76.setImageId(76L);
        i76.setApartmentId(a30.getApartmentId());
        i76.setImage(readImage("./src/img/apartments/north_baltic_sea/apartment10/FeWoSeeSauna.jpg"));
        this.iRepository.save(i76);


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