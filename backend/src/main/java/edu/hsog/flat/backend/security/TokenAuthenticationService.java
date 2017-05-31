package edu.hsog.flat.backend.security;

import io.jsonwebtoken.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;

public class TokenAuthenticationService {
    static final long EXPIRATION_TIME = 864_000_000; // 10 days
    static final String SECRET = "DanielFischer";
    static final String TOKEN_PREFIX = "Bearer";
    static final String HEADER_STRING = "Authorization";

    static void addAuthentication(HttpServletResponse res, String username) {
        String JWT = Jwts.builder()
            .setSubject(username)
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(SignatureAlgorithm.HS512, SECRET)
            .compact();

        res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + JWT);
    }

    static Authentication getAuthentication(HttpServletRequest req) {
        String token = req.getHeader(HEADER_STRING);

        if (token == null) {
            return null;
        }

        try {
            String user = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();

            return user != null ?
                    new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()) :
                    null;
        } catch (UnsupportedJwtException | MalformedJwtException | IllegalArgumentException | SignatureException exception) {
            throw new BadCredentialsException("Invalid JWT token: ", exception);
        } catch (ExpiredJwtException expiredException) {
            throw new ExpiredJwtException(expiredException.getHeader(), expiredException.getClaims(), expiredException.getMessage());
        }
    }
}
