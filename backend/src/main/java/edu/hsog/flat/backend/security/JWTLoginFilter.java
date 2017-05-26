package edu.hsog.flat.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

/**
 * Created by hauss on 15.05.2017.
 */
public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {
    /* @Autowired
    BCryptPasswordEncoder passwordEncoder; */

    @Autowired
    CustomerRepository customerRepository;

    ObjectMapper mapper;

    public JWTLoginFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
        this.mapper = new ObjectMapper();
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        AccountCredentials credentials = new ObjectMapper()
            .readValue(request.getInputStream(), AccountCredentials.class);

        System.out.println("=================================================================");
        System.out.println(credentials.getUsername() + " " + credentials.getPassword());
        System.out.println("=================================================================");

        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        credentials.getUsername(),
                        credentials.getPassword(),
                        Collections.emptyList()
                )
        );
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) throws IOException, ServletException {
        TokenAuthenticationService.addAuthentication(res, auth.getName());

        Customer customer = customerRepository.findOne(123456789013L);
        String user = mapper.writeValueAsString(customer);

        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        res.getWriter().write(user);
    }
}
