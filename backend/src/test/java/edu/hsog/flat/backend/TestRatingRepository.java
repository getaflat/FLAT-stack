package edu.hsog.flat.backend;

import edu.hsog.flat.backend.model.Rating;
import edu.hsog.flat.backend.repository.RatingRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
/**
 * findByContractNumber
 * TODO
 * postRating -> unused
 * Created by kathi on 04.06.17.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestRatingRepository {
    @Autowired
    private RatingRepository ratRep;

    @Autowired
    public void setRatingRepository(RatingRepository ratRep) {
        this.ratRep = ratRep;
    }
    @Test
    public void testRatingFindByContractNumber(){

        Rating r = new Rating();
        //r.setRatingId(7L);
        r.setContractNumber(1990L);
        ratRep.save(r);

        Rating temp = ratRep.findByContractNumber(1990L);
        long myNo = temp.getContractNumber();
        Assert.assertEquals(1990, myNo );

        ratRep.delete(r);
        }

}
