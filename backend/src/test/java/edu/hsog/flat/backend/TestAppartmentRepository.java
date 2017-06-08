package edu.hsog.flat.backend;

import edu.hsog.flat.backend.model.Apartment;
import edu.hsog.flat.backend.repository.ApartmentRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
/**
 * findByName
 * findByResidentialBlockID
 * TODO findByApartmentID
 * Created by kathi on 04.06.17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestAppartmentRepository {
    @Autowired
    private ApartmentRepository aRepository;

    @Autowired
    public void setApartmentRepository(ApartmentRepository aRepository) {
        this.aRepository = aRepository;
    }

    @Test
    public void testFindAppartmentByName(){
        Apartment ap = new Apartment();
        ap.setName("holiday");
        ap.setApartmentId(42L);
        ap.setResidentialBlockId(1990L);
        ap.setIsAvailable(true);
        ap.setNumberOfRooms(3);
        ap.setNumberOfPersons(5);
        ap.setHasBalcony(false);
        ap.setAnimalsAllowed(true);
        ap.setInfantsAllowed(true);
        ap.setDescription("blablabla");
        aRepository.save(ap);

        Apartment temp = aRepository.findByName("holiday");
        Assert.assertEquals("holiday", temp.getName());
        aRepository.delete(ap);
    }

    @Test
    public void testFindAppartmentByResidentialBlockID(){
        Apartment ap = new Apartment();
        ap.setName("holiday");
        ap.setApartmentId(42L);
        ap.setResidentialBlockId(1990L);
        ap.setIsAvailable(true);
        ap.setNumberOfRooms(3);
        ap.setNumberOfPersons(5);
        ap.setHasBalcony(false);
        ap.setAnimalsAllowed(true);
        ap.setInfantsAllowed(true);
        ap.setDescription("blablabla");
        aRepository.save(ap);

        Apartment ap2 = new Apartment();
        ap2.setName("holiday2");
        ap2.setApartmentId(42L);
        ap2.setResidentialBlockId(2000L);
        ap2.setIsAvailable(true);
        ap2.setNumberOfRooms(3);
        ap2.setNumberOfPersons(5);
        ap2.setHasBalcony(false);
        ap2.setAnimalsAllowed(true);
        ap2.setInfantsAllowed(true);
        ap2.setDescription("blablabla");
        aRepository.save(ap2);

        Apartment ap3 = new Apartment();
        ap3.setName("holiday3");
        ap3.setApartmentId(42L);
        ap3.setResidentialBlockId(2000L);
        ap3.setIsAvailable(true);
        ap3.setNumberOfRooms(3);
        ap3.setNumberOfPersons(5);
        ap3.setHasBalcony(false);
        ap3.setAnimalsAllowed(true);
        ap3.setInfantsAllowed(true);
        ap3.setDescription("blablabla");
        aRepository.save(ap3);

        List<Apartment> temp = aRepository.findByResidentialBlockId(1990L);

        for (Apartment a: temp ) {
            long id = a.getResidentialBlockId();
            Assert.assertEquals( 1990L, id);
        }
        aRepository.delete(ap);
    }
}
