package edu.hsog.flat.backend.security;

import edu.hsog.flat.backend.model.Customer;
import edu.hsog.flat.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JwtUserService implements UserDetailsService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(username);

        if (customer == null) {
            throw new UsernameNotFoundException("The user does not exist");
        }

        List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");

        System.out.println("===================================================================");
        System.out.println(customer);
        System.out.println(customer.getEmail());
        System.out.println(customer.getPassword());
        System.out.println(authorities);
        System.out.println("===================================================================");

        User user = new User(customer.getEmail(), customer.getPassword(), authorities);

        return user;
    }
}
