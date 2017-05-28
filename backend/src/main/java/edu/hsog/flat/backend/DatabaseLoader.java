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
	    rb1.setName("Komplex-Mittelmeer-1");
	    rb1.setDetails("Lorem Ipsum");
        rb1.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mediterranean_sea/residential_block1/Costa_Brava.JPG"));
        rb1.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mediterranean_sea/residential_block1/dorf.jpeg"));
        this.rbRepository.save(rb1);

        ResidentialBlock rb2 = new ResidentialBlock();
        rb2.setResidentialBlockId(2L);
        rb2.setName("Komplex-Mittelmeer-2");
        rb2.setDetails("Lorem Ipsum");
        rb2.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mediterranean_sea/residential_block2/les_gorges_du_tarn.jpg"));
        rb2.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mediterranean_sea/residential_block2/Strand_Brandung.jpg"));
        this.rbRepository.save(rb2);

        ResidentialBlock rb3 = new ResidentialBlock();
        rb3.setResidentialBlockId(3L);
        rb3.setName("Komplex-Berge-1");
        rb3.setDetails("Lorem Ipsum");
        rb3.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mountain/residential_block/bergsee.jpg"));
        rb3.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/mountain/residential_block/FerienwohnungBegeAussenSchnee.jpeg"));
        this.rbRepository.save(rb3);

        ResidentialBlock rb4 = new ResidentialBlock();
        rb4.setResidentialBlockId(4L);
        rb4.setName("Komplex-Nord-Ostsee-1");
        rb4.setDetails("Lorem Ipsum");
        rb4.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/north_baltic_sea/residential_block1/FeWoSeeAussen.jpg"));
        rb4.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/north_baltic_sea/residential_block1/FeWoSeeHafen.jpg"));
        this.rbRepository.save(rb4);

        ResidentialBlock rb5 = new ResidentialBlock();
        rb5.setResidentialBlockId(5L);
        rb5.setName("Komplex-Nord-Ostsee-2");
        rb5.setDetails("Lorem Ipsum");
        rb5.setImage1(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/north_baltic_sea/residential_block2/FeWoSeeStrand.jpg"));
        rb5.setImage2(this.readImage("/Users/tobin/Documents/Z_HS-Offenburg/AI4_SoSe17/Projekt1-Programme/FLAT-stack/backend/src/img/residential_blocks/north_baltic_sea/residential_block2/FeWoSeeAussen3.jpeg"));
        this.rbRepository.save(rb5);


	    Apartment a1 = new Apartment();
	    a1.setApartmentId(1L);
        a1.setResidentialBlockId(1L);
	    a1.setIsAvailable(true);
	    a1.setName("FeWo-Mittelmeer-1");
	    a1.setNumberOfRooms(4);
	    a1.setSize(103.5);
	    a1.setNumberOfPersons(3);
	    a1.setBasePrice(300);
	    a1.setHasBalcony(true);
	    a1.setAnimalsAllowed(false);
	    a1.setInfantsAllowed(false);
	    this.aRepository.save(a1);

        Apartment a2 = new Apartment();
        a2.setApartmentId(2L);
        a2.setResidentialBlockId(1L);
        a2.setIsAvailable(true);
        a2.setName("FeWo-Mittelmeer-2");
        a2.setNumberOfRooms(5);
        a2.setSize(153.5);
        a2.setNumberOfPersons(4);
        a2.setBasePrice(500);
        a2.setHasBalcony(true);
        a2.setAnimalsAllowed(true);
        a2.setInfantsAllowed(true);
        this.aRepository.save(a2);

        Apartment a3 = new Apartment();
        a3.setApartmentId(3L);
        a3.setResidentialBlockId(1L);
        a3.setIsAvailable(true);
        a3.setName("FeWo-Mittelmeer-3");
        a3.setNumberOfRooms(3);
        a3.setSize(90.3);
        a3.setNumberOfPersons(2);
        a3.setBasePrice(260);
        a3.setHasBalcony(false);
        a3.setAnimalsAllowed(true);
        a3.setInfantsAllowed(true);
        this.aRepository.save(a3);

        Apartment a4 = new Apartment();
        a4.setApartmentId(4L);
        a4.setResidentialBlockId(1L);
        a4.setIsAvailable(false);
        a4.setName("FeWo-Mittelmeer-4");
        a4.setNumberOfRooms(2);
        a4.setSize(63.2);
        a4.setNumberOfPersons(2);
        a4.setBasePrice(200);
        a4.setHasBalcony(true);
        a4.setAnimalsAllowed(true);
        a4.setInfantsAllowed(false);
        this.aRepository.save(a4);

        Apartment a5 = new Apartment();
        a5.setApartmentId(5L);
        a5.setResidentialBlockId(1L);
        a5.setIsAvailable(false);
        a5.setName("FeWo-Mittelmeer-5");
        a5.setNumberOfRooms(1);
        a5.setSize(46.6);
        a5.setNumberOfPersons(1);
        a5.setBasePrice(160);
        a5.setHasBalcony(false);
        a5.setAnimalsAllowed(false);
        a5.setInfantsAllowed(false);
        this.aRepository.save(a5);

        Apartment a6 = new Apartment();
        a6.setApartmentId(6L);
        a6.setResidentialBlockId(2L);
        a6.setIsAvailable(true);
        a6.setName("FeWo-Mittelmeer-6");
        a6.setNumberOfRooms(1);
        a6.setSize(46.6);
        a6.setNumberOfPersons(1);
        a6.setBasePrice(180);
        a6.setHasBalcony(true);
        a6.setAnimalsAllowed(false);
        a6.setInfantsAllowed(false);
        this.aRepository.save(a6);

        Apartment a7 = new Apartment();
        a7.setApartmentId(7L);
        a7.setResidentialBlockId(2L);
        a7.setIsAvailable(false);
        a7.setName("FeWo-Mittelmeer-7");
        a7.setNumberOfRooms(2);
        a7.setSize(80.6);
        a7.setNumberOfPersons(1);
        a7.setBasePrice(300);
        a7.setHasBalcony(true);
        a7.setAnimalsAllowed(true);
        a7.setInfantsAllowed(true);
        this.aRepository.save(a7);

        Apartment a8 = new Apartment();
        a8.setApartmentId(8L);
        a8.setResidentialBlockId(2L);
        a8.setIsAvailable(true);
        a8.setName("FeWo-Mittelmeer-8");
        a8.setNumberOfRooms(6);
        a8.setSize(200.0);
        a8.setNumberOfPersons(5);
        a8.setBasePrice(900);
        a8.setHasBalcony(true);
        a8.setAnimalsAllowed(true);
        a8.setInfantsAllowed(true);
        this.aRepository.save(a8);

        Apartment a9 = new Apartment();
        a9.setApartmentId(9L);
        a9.setResidentialBlockId(2L);
        a9.setIsAvailable(true);
        a9.setName("FeWo-Mittelmeer-9");
        a9.setNumberOfRooms(6);
        a9.setSize(200.0);
        a9.setNumberOfPersons(5);
        a9.setBasePrice(820);
        a9.setHasBalcony(true);
        a9.setAnimalsAllowed(false);
        a9.setInfantsAllowed(false);
        this.aRepository.save(a9);

        Apartment a10 = new Apartment();
        a10.setApartmentId(10L);
        a10.setResidentialBlockId(2L);
        a10.setIsAvailable(true);
        a10.setName("FeWo-Mittelmeer-10");
        a10.setNumberOfRooms(4);
        a10.setSize(128.8);
        a10.setNumberOfPersons(4);
        a10.setBasePrice(620);
        a10.setHasBalcony(true);
        a10.setAnimalsAllowed(false);
        a10.setInfantsAllowed(false);
        this.aRepository.save(a10);

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
            s1.setFactorId((int)Math.random()*5L);
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