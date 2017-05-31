package edu.hsog.flat.backend.security;

import edu.hsog.flat.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    private String API_PATH = "/api/v1";
    private String LOGIN_URL = API_PATH + "/login";
    private String REGISER_URL = API_PATH + "/regiser";
    private String CUSTOMERS_URL = API_PATH + "/customers";

    @Autowired
    private JwtUserService jwtUserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers(LOGIN_URL).permitAll()
                .antMatchers(REGISER_URL).permitAll()
                .antMatchers(CUSTOMERS_URL).authenticated()
                // .anyRequest().authenticated()
                .and()
            .httpBasic()
                .and()
            .addFilterBefore(new JWTLoginFilter(LOGIN_URL, authenticationManager()),
                UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(new JWTAuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserService);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
            .ignoring()
                .antMatchers("/static/**");
    }
}
