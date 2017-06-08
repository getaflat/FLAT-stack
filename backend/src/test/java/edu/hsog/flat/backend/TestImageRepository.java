package edu.hsog.flat.backend;

import edu.hsog.flat.backend.repository.ImageRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
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
