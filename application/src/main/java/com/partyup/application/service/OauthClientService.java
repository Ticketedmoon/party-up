package com.partyup.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class OauthClientService {

    private static final String SHARED_CONTEXT = "SHARED_CONTEXT";
    private static final String BASE_API_URL = "https://id.twitch.tv/oauth2/token";
    private static final String API_URL = BASE_API_URL + "?client_id=%s&client_secret=%s&grant_type=%s";
    private static final String DEFAULT_GRANT_TYPE = "client_credentials";

    @Value("${oauth.client.id}")
    private String oAuthClientId;

    @Value("${oauth.client.secret}")
    private String oAuthClientSecret;

    private final RestTemplate restTemplate;

    public void generateAccessTokenForContext() {
        String accessToken = retrieveAccessToken();
        Authentication tokenAuth = new PreAuthenticatedAuthenticationToken(SHARED_CONTEXT, accessToken);
        SecurityContextHolder.getContext().setAuthentication(tokenAuth);
    }

    private String retrieveAccessToken() {
        String url = String.format(API_URL, oAuthClientId, oAuthClientSecret, DEFAULT_GRANT_TYPE);
        ResponseEntity<String> response = restTemplate.postForEntity(url, null, String.class);
        return response.getBody();
    }

}
