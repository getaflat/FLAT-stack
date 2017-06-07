package edu.hsog.flat.backend;

import edu.hsog.flat.backend.model.Apartment;
import edu.hsog.flat.backend.model.Booking;
import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.repository.ApartmentRepository;
import edu.hsog.flat.backend.repository.BookingRepository;
import edu.hsog.flat.backend.repository.CustomerRepository;
import edu.hsog.flat.backend.repository.ImageRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.List;
import static org.junit.Assert.*;
/**
 * TODO
 * findByAppartmentID -> unused
 * Created by kathi on 04.06.17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestImageRepository {

    @Autowired
    private ImageRepository iRep;

    @Autowired
    public void setImageRepository(ImageRepository iRep) {
        this.iRep = iRep;
    }

    @Test
    public void testImageFindByAppartmentID() {

    }
}
