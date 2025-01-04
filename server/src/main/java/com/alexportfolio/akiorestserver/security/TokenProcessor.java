package com.alexportfolio.akiorestserver.security;

import com.alexportfolio.akiorestserver.repository.entities.Authority;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TokenProcessor {
    @Value("${jwt.private-key:#{null}}")
    private String PRIVATE_KEY;
    SecretKey privateKey = Jwts.SIG.HS256.key().build();
    @Value("${jwt.ttl:86400}")
    private int TOKEN_EXP_SEC = 86400;

    @PostConstruct
    void init(){
        if(PRIVATE_KEY!=null && PRIVATE_KEY.length()>=32)
            privateKey = Keys.hmacShaKeyFor(PRIVATE_KEY.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(Authentication authObj) {
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.toInstant().plusSeconds(TOKEN_EXP_SEC).toEpochMilli());
        Integer accessLevel = authObj.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .mapToInt(authStr-> Authority.valueOf(authStr).getAccessLevel()).max().orElseGet(()->1);
        String authorities = authObj.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
        return Jwts.builder()
                        .subject(authObj.getName())
                        .claim("access_level",accessLevel)
                        .claim("authorities", authorities)
                        .signWith(privateKey)
                        .issuedAt(currentDate)
                        .expiration(expirationDate)
                        .compact();
    }

    public Authentication getAuthObjFromToken(String token)   {
        try {
            // extracting payload from the token
             var payload = Jwts.parser()
                                .verifyWith(privateKey)
                                .build()
                                .parseSignedClaims(token)
                                .getPayload();
             // converting payload to map
            Map<String, String> map = payload.entrySet()
                    .stream()
                    .filter(e->(e.getValue() instanceof String))
                    .collect(
                            Collectors.toMap(e->(String)e.getKey(), e->(String)e.getValue())
                    );
            var authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(map.get("authorities"));
            return new AuthenticationObj(map.get("sub"),true, authorities);
        } catch (JwtException e){
            return null;
        }
    }

}
